"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BudgetAlertsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetAlertsService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../prisma/prisma.service");
let BudgetAlertsService = BudgetAlertsService_1 = class BudgetAlertsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(BudgetAlertsService_1.name);
    }
    async checkAllBudgets() {
        this.logger.log('Running scheduled budget alert check...');
        const activeBudgets = await this.prisma.budget.findMany({
            where: { status: { in: ['APPROVED', 'LEVEL1_APPROVED'] } },
            include: {
                details: true,
                proposals: {
                    where: { status: { not: 'REJECTED' } },
                    include: { products: true },
                },
            },
        });
        let totalAlerts = 0;
        for (const budget of activeBudgets) {
            const alerts = await this.analyzeBudget(budget);
            totalAlerts += alerts.length;
        }
        this.logger.log(`Budget check complete: ${totalAlerts} new alert(s) across ${activeBudgets.length} budget(s)`);
    }
    async analyzeBudget(budget) {
        const alerts = [];
        const totalBudget = Number(budget.totalBudget);
        if (totalBudget <= 0)
            return alerts;
        const committed = this.calculateCommitted(budget.proposals);
        const planned = this.calculatePlanned(budget.proposals);
        const utilizationPct = (committed / totalBudget) * 100;
        if (committed > totalBudget) {
            alerts.push({
                budgetId: budget.id,
                alertType: 'over_budget',
                severity: 'critical',
                title: 'Budget Exceeded',
                message: `Committed amount (${this.fmt(committed)}) exceeds budget (${this.fmt(totalBudget)}) by ${this.fmt(committed - totalBudget)}`,
                metricValue: committed,
                threshold: totalBudget,
            });
        }
        else if (utilizationPct >= 90) {
            alerts.push({
                budgetId: budget.id,
                alertType: 'over_budget',
                severity: 'warning',
                title: 'Budget Nearly Exhausted',
                message: `${utilizationPct.toFixed(1)}% of budget committed. Only ${this.fmt(totalBudget - committed)} remaining.`,
                metricValue: utilizationPct,
                threshold: 90,
            });
        }
        const seasonEnd = this.getSeasonEndDate(budget);
        const daysRemaining = Math.ceil((seasonEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        if (daysRemaining <= 14 && daysRemaining > 0 && utilizationPct < 50) {
            alerts.push({
                budgetId: budget.id,
                alertType: 'under_utilized',
                severity: 'info',
                title: 'Budget Under-utilized',
                message: `Only ${utilizationPct.toFixed(1)}% utilized with ${daysRemaining} days remaining. Consider adding more SKUs or reallocating.`,
                metricValue: utilizationPct,
                threshold: 50,
            });
        }
        const pace = await this.calculateSpendingPace(budget.id, totalBudget);
        if (pace.projectedTotal > totalBudget * 1.1) {
            alerts.push({
                budgetId: budget.id,
                alertType: 'pace_warning',
                severity: 'warning',
                title: 'Spending Pace Alert',
                message: `At current pace, projected spend is ${this.fmt(pace.projectedTotal)} (${((pace.projectedTotal / totalBudget) * 100).toFixed(0)}% of budget). May be exhausted in ${pace.daysUntilExhausted} days.`,
                metricValue: pace.projectedTotal,
                threshold: totalBudget,
            });
        }
        const catAlerts = this.checkCategoryBalance(budget);
        alerts.push(...catAlerts);
        await this.saveAlerts(alerts);
        await this.takeSnapshot(budget.id, committed, planned, utilizationPct);
        return alerts;
    }
    async getAlerts(options) {
        const where = { isDismissed: false };
        if (options?.budgetId)
            where.budgetId = options.budgetId;
        if (options?.unreadOnly)
            where.isRead = false;
        return this.prisma.budgetAlert.findMany({
            where,
            orderBy: [{ createdAt: 'desc' }],
            include: {
                budget: {
                    select: {
                        budgetCode: true,
                        groupBrand: { select: { name: true } },
                    },
                },
            },
            take: 20,
        });
    }
    async markAsRead(alertId) {
        return this.prisma.budgetAlert.update({
            where: { id: alertId },
            data: { isRead: true },
        });
    }
    async dismissAlert(alertId) {
        return this.prisma.budgetAlert.update({
            where: { id: alertId },
            data: { isDismissed: true },
        });
    }
    calculateCommitted(proposals) {
        return proposals
            .filter((p) => p.status === 'APPROVED')
            .reduce((sum, p) => sum + Number(p.totalValue), 0);
    }
    calculatePlanned(proposals) {
        return proposals
            .filter((p) => ['DRAFT', 'SUBMITTED', 'LEVEL1_APPROVED'].includes(p.status))
            .reduce((sum, p) => sum + Number(p.totalValue), 0);
    }
    async calculateSpendingPace(budgetId, totalBudget) {
        const snapshots = await this.prisma.budgetSnapshot.findMany({
            where: { budgetId },
            orderBy: { snapshotDate: 'desc' },
            take: 7,
        });
        if (snapshots.length < 2) {
            return { projectedTotal: 0, daysUntilExhausted: 999 };
        }
        const newest = snapshots[0];
        const oldest = snapshots[snapshots.length - 1];
        const daysDiff = Math.max(1, Math.ceil((new Date(newest.snapshotDate).getTime() -
            new Date(oldest.snapshotDate).getTime()) /
            (1000 * 60 * 60 * 24)));
        const spentDiff = Number(newest.totalCommitted) - Number(oldest.totalCommitted);
        const dailyRate = spentDiff / daysDiff;
        const remaining = totalBudget - Number(newest.totalCommitted);
        const daysUntilExhausted = dailyRate > 0 ? Math.ceil(remaining / dailyRate) : 999;
        const projectedTotal = Number(newest.totalCommitted) + dailyRate * 30;
        return { projectedTotal, daysUntilExhausted };
    }
    checkCategoryBalance(budget) {
        const alerts = [];
        const categorySpend = new Map();
        for (const proposal of budget.proposals || []) {
            for (const product of proposal.products || []) {
                const cat = product.category || 'Unknown';
                categorySpend.set(cat, (categorySpend.get(cat) || 0) + Number(product.totalValue));
            }
        }
        const totalSpend = Array.from(categorySpend.values()).reduce((a, b) => a + b, 0);
        if (totalSpend === 0)
            return alerts;
        for (const [category, spend] of categorySpend) {
            const pct = (spend / totalSpend) * 100;
            if (pct > 60) {
                alerts.push({
                    budgetId: budget.id,
                    alertType: 'category_imbalance',
                    severity: 'warning',
                    title: 'Category Imbalance',
                    message: `${category} accounts for ${pct.toFixed(0)}% of total spend. Consider diversifying.`,
                    metricValue: pct,
                    threshold: 60,
                    category,
                });
            }
        }
        return alerts;
    }
    getSeasonEndDate(budget) {
        const year = budget.fiscalYear || new Date().getFullYear();
        if (budget.seasonGroupId === 'SS') {
            return budget.seasonType === 'pre'
                ? new Date(year, 2, 31)
                : new Date(year, 5, 30);
        }
        return budget.seasonType === 'pre'
            ? new Date(year, 8, 30)
            : new Date(year, 11, 31);
    }
    async saveAlerts(alerts) {
        for (const alert of alerts) {
            const existing = await this.prisma.budgetAlert.findFirst({
                where: {
                    budgetId: alert.budgetId,
                    alertType: alert.alertType,
                    category: alert.category ?? undefined,
                    createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
                },
            });
            if (!existing) {
                await this.prisma.budgetAlert.create({ data: alert });
            }
        }
    }
    async takeSnapshot(budgetId, committed, planned, utilization) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        await this.prisma.budgetSnapshot.upsert({
            where: {
                budgetId_snapshotDate: { budgetId, snapshotDate: today },
            },
            update: {
                totalCommitted: committed,
                totalPlanned: planned,
                utilizationPct: utilization,
            },
            create: {
                budgetId,
                snapshotDate: today,
                totalCommitted: committed,
                totalPlanned: planned,
                utilizationPct: utilization,
            },
        });
    }
    fmt(value) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0,
        }).format(value);
    }
};
exports.BudgetAlertsService = BudgetAlertsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BudgetAlertsService.prototype, "checkAllBudgets", null);
exports.BudgetAlertsService = BudgetAlertsService = BudgetAlertsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BudgetAlertsService);
//# sourceMappingURL=budget-alerts.service.js.map