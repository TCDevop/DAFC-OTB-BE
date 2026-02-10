import { PrismaService } from '../../prisma/prisma.service';
interface AlertInput {
    budgetId: string;
    alertType: string;
    severity: string;
    title: string;
    message: string;
    metricValue: number;
    threshold: number;
    category?: string;
}
export declare class BudgetAlertsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    checkAllBudgets(): Promise<void>;
    analyzeBudget(budget: any): Promise<AlertInput[]>;
    getAlerts(options?: {
        budgetId?: string;
        unreadOnly?: boolean;
    }): Promise<({
        budget: {
            groupBrand: {
                name: string;
            };
            budgetCode: string;
        };
    } & {
        category: string | null;
        id: string;
        createdAt: Date;
        title: string;
        budgetId: string;
        alertType: string;
        severity: string;
        message: string;
        metricValue: import("src/generated/prisma/runtime/library").Decimal;
        threshold: import("src/generated/prisma/runtime/library").Decimal;
        isRead: boolean;
        isDismissed: boolean;
    })[]>;
    markAsRead(alertId: string): Promise<{
        category: string | null;
        id: string;
        createdAt: Date;
        title: string;
        budgetId: string;
        alertType: string;
        severity: string;
        message: string;
        metricValue: import("src/generated/prisma/runtime/library").Decimal;
        threshold: import("src/generated/prisma/runtime/library").Decimal;
        isRead: boolean;
        isDismissed: boolean;
    }>;
    dismissAlert(alertId: string): Promise<{
        category: string | null;
        id: string;
        createdAt: Date;
        title: string;
        budgetId: string;
        alertType: string;
        severity: string;
        message: string;
        metricValue: import("src/generated/prisma/runtime/library").Decimal;
        threshold: import("src/generated/prisma/runtime/library").Decimal;
        isRead: boolean;
        isDismissed: boolean;
    }>;
    private calculateCommitted;
    private calculatePlanned;
    private calculateSpendingPace;
    private checkCategoryBalance;
    private getSeasonEndDate;
    private saveAlerts;
    private takeSnapshot;
    private fmt;
}
export {};
