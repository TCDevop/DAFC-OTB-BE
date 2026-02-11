
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable',
  Snapshot: 'Snapshot'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name',
  passwordHash: 'passwordHash',
  roleId: 'roleId',
  storeAccess: 'storeAccess',
  brandAccess: 'brandAccess',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  permissions: 'permissions'
};

exports.Prisma.GroupBrandScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  groupId: 'groupId',
  colorConfig: 'colorConfig',
  isActive: 'isActive',
  sortOrder: 'sortOrder'
};

exports.Prisma.StoreScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  region: 'region',
  isActive: 'isActive'
};

exports.Prisma.CollectionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  isActive: 'isActive'
};

exports.Prisma.GenderScalarFieldEnum = {
  id: 'id',
  name: 'name',
  isActive: 'isActive'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  genderId: 'genderId',
  isActive: 'isActive'
};

exports.Prisma.SubCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  categoryId: 'categoryId',
  isActive: 'isActive'
};

exports.Prisma.SkuCatalogScalarFieldEnum = {
  id: 'id',
  skuCode: 'skuCode',
  productName: 'productName',
  productType: 'productType',
  theme: 'theme',
  color: 'color',
  composition: 'composition',
  srp: 'srp',
  brandId: 'brandId',
  seasonGroupId: 'seasonGroupId',
  imageUrl: 'imageUrl',
  isActive: 'isActive'
};

exports.Prisma.BudgetScalarFieldEnum = {
  id: 'id',
  budgetCode: 'budgetCode',
  groupBrandId: 'groupBrandId',
  seasonGroupId: 'seasonGroupId',
  seasonType: 'seasonType',
  fiscalYear: 'fiscalYear',
  totalBudget: 'totalBudget',
  status: 'status',
  comment: 'comment',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BudgetDetailScalarFieldEnum = {
  id: 'id',
  budgetId: 'budgetId',
  storeId: 'storeId',
  budgetAmount: 'budgetAmount'
};

exports.Prisma.PlanningVersionScalarFieldEnum = {
  id: 'id',
  planningCode: 'planningCode',
  budgetDetailId: 'budgetDetailId',
  versionNumber: 'versionNumber',
  versionName: 'versionName',
  status: 'status',
  isFinal: 'isFinal',
  snapshotData: 'snapshotData',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PlanningDetailScalarFieldEnum = {
  id: 'id',
  planningVersionId: 'planningVersionId',
  dimensionType: 'dimensionType',
  collectionId: 'collectionId',
  genderId: 'genderId',
  categoryId: 'categoryId',
  subCategoryId: 'subCategoryId',
  lastSeasonSales: 'lastSeasonSales',
  lastSeasonPct: 'lastSeasonPct',
  systemBuyPct: 'systemBuyPct',
  userBuyPct: 'userBuyPct',
  otbValue: 'otbValue',
  variancePct: 'variancePct',
  userComment: 'userComment'
};

exports.Prisma.ProposalScalarFieldEnum = {
  id: 'id',
  ticketName: 'ticketName',
  budgetId: 'budgetId',
  planningVersionId: 'planningVersionId',
  status: 'status',
  totalSkuCount: 'totalSkuCount',
  totalOrderQty: 'totalOrderQty',
  totalValue: 'totalValue',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProposalProductScalarFieldEnum = {
  id: 'id',
  proposalId: 'proposalId',
  skuId: 'skuId',
  skuCode: 'skuCode',
  productName: 'productName',
  collection: 'collection',
  gender: 'gender',
  category: 'category',
  subCategory: 'subCategory',
  theme: 'theme',
  color: 'color',
  composition: 'composition',
  unitCost: 'unitCost',
  srp: 'srp',
  orderQty: 'orderQty',
  totalValue: 'totalValue',
  customerTarget: 'customerTarget',
  imageUrl: 'imageUrl',
  sortOrder: 'sortOrder'
};

exports.Prisma.ProductAllocationScalarFieldEnum = {
  id: 'id',
  proposalProductId: 'proposalProductId',
  storeId: 'storeId',
  quantity: 'quantity'
};

exports.Prisma.ApprovalScalarFieldEnum = {
  id: 'id',
  entityType: 'entityType',
  entityId: 'entityId',
  level: 'level',
  deciderId: 'deciderId',
  action: 'action',
  comment: 'comment',
  decidedAt: 'decidedAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  entityType: 'entityType',
  entityId: 'entityId',
  action: 'action',
  changes: 'changes',
  ipAddress: 'ipAddress',
  createdAt: 'createdAt'
};

exports.Prisma.SalesHistoryScalarFieldEnum = {
  id: 'id',
  skuCode: 'skuCode',
  storeId: 'storeId',
  sizeCode: 'sizeCode',
  season: 'season',
  quantitySold: 'quantitySold',
  quantityBought: 'quantityBought',
  sellThroughPct: 'sellThroughPct',
  createdAt: 'createdAt'
};

exports.Prisma.SizeCurveRecommendationScalarFieldEnum = {
  id: 'id',
  skuId: 'skuId',
  storeId: 'storeId',
  category: 'category',
  sizeCode: 'sizeCode',
  recommendedPct: 'recommendedPct',
  confidence: 'confidence',
  basedOnSeasons: 'basedOnSeasons',
  reasoning: 'reasoning',
  createdAt: 'createdAt'
};

exports.Prisma.BudgetAlertScalarFieldEnum = {
  id: 'id',
  budgetId: 'budgetId',
  alertType: 'alertType',
  severity: 'severity',
  title: 'title',
  message: 'message',
  metricValue: 'metricValue',
  threshold: 'threshold',
  category: 'category',
  isRead: 'isRead',
  isDismissed: 'isDismissed',
  createdAt: 'createdAt'
};

exports.Prisma.BudgetSnapshotScalarFieldEnum = {
  id: 'id',
  budgetId: 'budgetId',
  snapshotDate: 'snapshotDate',
  totalCommitted: 'totalCommitted',
  totalPlanned: 'totalPlanned',
  utilizationPct: 'utilizationPct'
};

exports.Prisma.AllocationHistoryScalarFieldEnum = {
  id: 'id',
  budgetId: 'budgetId',
  seasonGroup: 'seasonGroup',
  seasonType: 'seasonType',
  fiscalYear: 'fiscalYear',
  dimensionType: 'dimensionType',
  dimensionValue: 'dimensionValue',
  allocatedPct: 'allocatedPct',
  allocatedAmount: 'allocatedAmount',
  actualSales: 'actualSales',
  sellThroughPct: 'sellThroughPct',
  createdAt: 'createdAt'
};

exports.Prisma.AllocationRecommendationScalarFieldEnum = {
  id: 'id',
  budgetDetailId: 'budgetDetailId',
  dimensionType: 'dimensionType',
  dimensionValue: 'dimensionValue',
  recommendedPct: 'recommendedPct',
  recommendedAmt: 'recommendedAmt',
  confidence: 'confidence',
  reasoning: 'reasoning',
  basedOnSeasons: 'basedOnSeasons',
  factors: 'factors',
  isApplied: 'isApplied',
  createdAt: 'createdAt'
};

exports.Prisma.RiskAssessmentScalarFieldEnum = {
  id: 'id',
  entityType: 'entityType',
  entityId: 'entityId',
  overallScore: 'overallScore',
  riskLevel: 'riskLevel',
  budgetAlignmentScore: 'budgetAlignmentScore',
  skuDiversityScore: 'skuDiversityScore',
  sizeCurveScore: 'sizeCurveScore',
  vendorConcentrationScore: 'vendorConcentrationScore',
  categoryBalanceScore: 'categoryBalanceScore',
  marginImpactScore: 'marginImpactScore',
  factors: 'factors',
  warnings: 'warnings',
  recommendation: 'recommendation',
  calculatedAt: 'calculatedAt',
  calculatedBy: 'calculatedBy',
  isStale: 'isStale'
};

exports.Prisma.RiskThresholdScalarFieldEnum = {
  id: 'id',
  factorName: 'factorName',
  weight: 'weight',
  lowThreshold: 'lowThreshold',
  highThreshold: 'highThreshold',
  description: 'description',
  isActive: 'isActive'
};

exports.Prisma.SkuPerformanceScalarFieldEnum = {
  id: 'id',
  skuId: 'skuId',
  skuCode: 'skuCode',
  seasonGroup: 'seasonGroup',
  fiscalYear: 'fiscalYear',
  storeId: 'storeId',
  quantityBought: 'quantityBought',
  quantitySold: 'quantitySold',
  sellThroughPct: 'sellThroughPct',
  avgSellingPrice: 'avgSellingPrice',
  totalRevenue: 'totalRevenue',
  grossMarginPct: 'grossMarginPct',
  markdownPct: 'markdownPct',
  weeksToSellThru: 'weeksToSellThru',
  performanceScore: 'performanceScore',
  velocityScore: 'velocityScore',
  marginScore: 'marginScore',
  createdAt: 'createdAt'
};

exports.Prisma.AttributeTrendScalarFieldEnum = {
  id: 'id',
  attributeType: 'attributeType',
  attributeValue: 'attributeValue',
  category: 'category',
  seasonGroup: 'seasonGroup',
  fiscalYear: 'fiscalYear',
  totalSkus: 'totalSkus',
  avgSellThrough: 'avgSellThrough',
  avgMargin: 'avgMargin',
  trendScore: 'trendScore',
  yoyGrowth: 'yoyGrowth',
  createdAt: 'createdAt'
};

exports.Prisma.SkuRecommendationScalarFieldEnum = {
  id: 'id',
  budgetDetailId: 'budgetDetailId',
  category: 'category',
  subCategory: 'subCategory',
  skuId: 'skuId',
  skuCode: 'skuCode',
  productName: 'productName',
  recommendedQty: 'recommendedQty',
  recommendedValue: 'recommendedValue',
  confidence: 'confidence',
  performanceScore: 'performanceScore',
  trendScore: 'trendScore',
  assortmentScore: 'assortmentScore',
  priceScore: 'priceScore',
  overallScore: 'overallScore',
  riskLevel: 'riskLevel',
  reasoning: 'reasoning',
  isSelected: 'isSelected',
  isRejected: 'isRejected',
  createdAt: 'createdAt'
};

exports.Prisma.ApprovalWorkflowStepScalarFieldEnum = {
  id: 'id',
  brandId: 'brandId',
  stepNumber: 'stepNumber',
  roleName: 'roleName',
  roleCode: 'roleCode',
  userId: 'userId',
  description: 'description',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  Role: 'Role',
  GroupBrand: 'GroupBrand',
  Store: 'Store',
  Collection: 'Collection',
  Gender: 'Gender',
  Category: 'Category',
  SubCategory: 'SubCategory',
  SkuCatalog: 'SkuCatalog',
  Budget: 'Budget',
  BudgetDetail: 'BudgetDetail',
  PlanningVersion: 'PlanningVersion',
  PlanningDetail: 'PlanningDetail',
  Proposal: 'Proposal',
  ProposalProduct: 'ProposalProduct',
  ProductAllocation: 'ProductAllocation',
  Approval: 'Approval',
  AuditLog: 'AuditLog',
  SalesHistory: 'SalesHistory',
  SizeCurveRecommendation: 'SizeCurveRecommendation',
  BudgetAlert: 'BudgetAlert',
  BudgetSnapshot: 'BudgetSnapshot',
  AllocationHistory: 'AllocationHistory',
  AllocationRecommendation: 'AllocationRecommendation',
  RiskAssessment: 'RiskAssessment',
  RiskThreshold: 'RiskThreshold',
  SkuPerformance: 'SkuPerformance',
  AttributeTrend: 'AttributeTrend',
  SkuRecommendation: 'SkuRecommendation',
  ApprovalWorkflowStep: 'ApprovalWorkflowStep'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
