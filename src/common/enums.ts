// ============================================================================
// Application Enums (SQL Server does not support Prisma native enums)
// ============================================================================

export const BudgetStatus = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  LEVEL1_APPROVED: 'LEVEL1_APPROVED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;
export type BudgetStatus = (typeof BudgetStatus)[keyof typeof BudgetStatus];

export const PlanningStatus = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  LEVEL1_APPROVED: 'LEVEL1_APPROVED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;
export type PlanningStatus = (typeof PlanningStatus)[keyof typeof PlanningStatus];

export const ProposalStatus = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  LEVEL1_APPROVED: 'LEVEL1_APPROVED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;
export type ProposalStatus = (typeof ProposalStatus)[keyof typeof ProposalStatus];

export const ApprovalAction = {
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;
export type ApprovalAction = (typeof ApprovalAction)[keyof typeof ApprovalAction];
