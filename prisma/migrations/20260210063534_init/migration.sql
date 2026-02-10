-- CreateEnum
CREATE TYPE "BudgetStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'LEVEL1_APPROVED', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PlanningStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'LEVEL1_APPROVED', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ProposalStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'LEVEL1_APPROVED', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ApprovalAction" AS ENUM ('APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "store_access" TEXT[],
    "brand_access" TEXT[],
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "permissions" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_brands" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "color_config" JSONB,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "group_brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collections" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "genders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "sub_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sku_catalog" (
    "id" TEXT NOT NULL,
    "sku_code" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_type" TEXT NOT NULL,
    "theme" TEXT,
    "color" TEXT,
    "composition" TEXT,
    "srp" DECIMAL(18,2) NOT NULL,
    "brand_id" TEXT,
    "season_group_id" TEXT,
    "image_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "sku_catalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budgets" (
    "id" TEXT NOT NULL,
    "budget_code" TEXT NOT NULL,
    "group_brand_id" TEXT NOT NULL,
    "season_group_id" TEXT NOT NULL,
    "season_type" TEXT NOT NULL,
    "fiscal_year" INTEGER NOT NULL,
    "total_budget" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "status" "BudgetStatus" NOT NULL DEFAULT 'DRAFT',
    "comment" TEXT,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_details" (
    "id" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "budget_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,

    CONSTRAINT "budget_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planning_versions" (
    "id" TEXT NOT NULL,
    "planning_code" TEXT NOT NULL,
    "budget_detail_id" TEXT NOT NULL,
    "version_number" INTEGER NOT NULL,
    "version_name" TEXT,
    "status" "PlanningStatus" NOT NULL DEFAULT 'DRAFT',
    "is_final" BOOLEAN NOT NULL DEFAULT false,
    "snapshot_data" JSONB,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "planning_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planning_details" (
    "id" TEXT NOT NULL,
    "planning_version_id" TEXT NOT NULL,
    "dimension_type" TEXT NOT NULL,
    "collection_id" TEXT,
    "gender_id" TEXT,
    "category_id" TEXT,
    "sub_category_id" TEXT,
    "last_season_sales" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "last_season_pct" DECIMAL(8,4) NOT NULL DEFAULT 0,
    "system_buy_pct" DECIMAL(8,4) NOT NULL DEFAULT 0,
    "user_buy_pct" DECIMAL(8,4) NOT NULL DEFAULT 0,
    "otb_value" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "variance_pct" DECIMAL(8,4) NOT NULL DEFAULT 0,
    "user_comment" TEXT,

    CONSTRAINT "planning_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proposals" (
    "id" TEXT NOT NULL,
    "ticket_name" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,
    "planning_version_id" TEXT,
    "status" "ProposalStatus" NOT NULL DEFAULT 'DRAFT',
    "total_sku_count" INTEGER NOT NULL DEFAULT 0,
    "total_order_qty" INTEGER NOT NULL DEFAULT 0,
    "total_value" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "proposals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proposal_products" (
    "id" TEXT NOT NULL,
    "proposal_id" TEXT NOT NULL,
    "sku_id" TEXT NOT NULL,
    "sku_code" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "collection" TEXT,
    "gender" TEXT,
    "category" TEXT,
    "sub_category" TEXT,
    "theme" TEXT,
    "color" TEXT,
    "composition" TEXT,
    "unit_cost" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "srp" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "order_qty" INTEGER NOT NULL DEFAULT 0,
    "total_value" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "customer_target" TEXT,
    "image_url" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "proposal_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_allocations" (
    "id" TEXT NOT NULL,
    "proposal_product_id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "product_allocations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "approvals" (
    "id" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "decider_id" TEXT NOT NULL,
    "action" "ApprovalAction" NOT NULL,
    "comment" TEXT,
    "decided_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "approvals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "changes" JSONB,
    "ip_address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_history" (
    "id" TEXT NOT NULL,
    "sku_code" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "size_code" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "quantity_sold" INTEGER NOT NULL DEFAULT 0,
    "quantity_bought" INTEGER NOT NULL DEFAULT 0,
    "sell_through_pct" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sales_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "size_curve_recommendations" (
    "id" TEXT NOT NULL,
    "sku_id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "size_code" TEXT NOT NULL,
    "recommended_pct" DECIMAL(5,2) NOT NULL,
    "confidence" DECIMAL(3,2) NOT NULL,
    "based_on_seasons" INTEGER NOT NULL,
    "reasoning" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "size_curve_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_alerts" (
    "id" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,
    "alert_type" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "metric_value" DECIMAL(18,2) NOT NULL,
    "threshold" DECIMAL(18,2) NOT NULL,
    "category" TEXT,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "is_dismissed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "budget_alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_snapshots" (
    "id" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,
    "snapshot_date" DATE NOT NULL,
    "total_committed" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "total_planned" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "utilization_pct" DECIMAL(5,2) NOT NULL DEFAULT 0,

    CONSTRAINT "budget_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allocation_history" (
    "id" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,
    "season_group" TEXT NOT NULL,
    "season_type" TEXT NOT NULL,
    "fiscal_year" INTEGER NOT NULL,
    "dimension_type" TEXT NOT NULL,
    "dimension_value" TEXT NOT NULL,
    "allocated_pct" DECIMAL(5,2) NOT NULL,
    "allocated_amount" DECIMAL(18,2) NOT NULL,
    "actual_sales" DECIMAL(18,2),
    "sell_through_pct" DECIMAL(5,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "allocation_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allocation_recommendations" (
    "id" TEXT NOT NULL,
    "budget_detail_id" TEXT NOT NULL,
    "dimension_type" TEXT NOT NULL,
    "dimension_value" TEXT NOT NULL,
    "recommended_pct" DECIMAL(5,2) NOT NULL,
    "recommended_amt" DECIMAL(18,2) NOT NULL,
    "confidence" DECIMAL(3,2) NOT NULL,
    "reasoning" TEXT,
    "based_on_seasons" INTEGER NOT NULL,
    "factors" JSONB,
    "is_applied" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "allocation_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "risk_assessments" (
    "id" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "overall_score" DECIMAL(3,1) NOT NULL,
    "risk_level" TEXT NOT NULL,
    "budget_alignment_score" DECIMAL(3,1) NOT NULL,
    "sku_diversity_score" DECIMAL(3,1) NOT NULL,
    "size_curve_score" DECIMAL(3,1) NOT NULL,
    "vendor_concentration_score" DECIMAL(3,1) NOT NULL,
    "category_balance_score" DECIMAL(3,1) NOT NULL,
    "margin_impact_score" DECIMAL(3,1) NOT NULL,
    "factors" JSONB,
    "warnings" JSONB,
    "recommendation" TEXT,
    "calculated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "calculated_by" TEXT,
    "is_stale" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "risk_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "risk_thresholds" (
    "id" TEXT NOT NULL,
    "factor_name" TEXT NOT NULL,
    "weight" DECIMAL(3,2) NOT NULL,
    "low_threshold" DECIMAL(3,1) NOT NULL,
    "high_threshold" DECIMAL(3,1) NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "risk_thresholds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sku_performance" (
    "id" TEXT NOT NULL,
    "sku_id" TEXT NOT NULL,
    "sku_code" TEXT NOT NULL,
    "season_group" TEXT NOT NULL,
    "fiscal_year" INTEGER NOT NULL,
    "store_id" TEXT,
    "quantity_bought" INTEGER NOT NULL,
    "quantity_sold" INTEGER NOT NULL,
    "sell_through_pct" DECIMAL(5,2) NOT NULL,
    "avg_selling_price" DECIMAL(18,2) NOT NULL,
    "total_revenue" DECIMAL(18,2) NOT NULL,
    "gross_margin_pct" DECIMAL(5,2) NOT NULL,
    "markdown_pct" DECIMAL(5,2) NOT NULL,
    "weeks_to_sell_thru" INTEGER,
    "performance_score" INTEGER NOT NULL,
    "velocity_score" INTEGER NOT NULL,
    "margin_score" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sku_performance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attribute_trends" (
    "id" TEXT NOT NULL,
    "attribute_type" TEXT NOT NULL,
    "attribute_value" TEXT NOT NULL,
    "category" TEXT,
    "season_group" TEXT NOT NULL,
    "fiscal_year" INTEGER NOT NULL,
    "total_skus" INTEGER NOT NULL,
    "avg_sell_through" DECIMAL(5,2) NOT NULL,
    "avg_margin" DECIMAL(5,2) NOT NULL,
    "trend_score" INTEGER NOT NULL,
    "yoy_growth" DECIMAL(5,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attribute_trends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sku_recommendations" (
    "id" TEXT NOT NULL,
    "budget_detail_id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sub_category" TEXT,
    "sku_id" TEXT NOT NULL,
    "sku_code" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "recommended_qty" INTEGER NOT NULL,
    "recommended_value" DECIMAL(18,2) NOT NULL,
    "confidence" DECIMAL(3,2) NOT NULL,
    "performance_score" INTEGER NOT NULL,
    "trend_score" INTEGER NOT NULL,
    "assortment_score" INTEGER NOT NULL,
    "price_score" INTEGER NOT NULL,
    "overall_score" INTEGER NOT NULL,
    "risk_level" TEXT NOT NULL,
    "reasoning" TEXT,
    "is_selected" BOOLEAN NOT NULL DEFAULT false,
    "is_rejected" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sku_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "approval_workflow_steps" (
    "id" TEXT NOT NULL,
    "brand_id" TEXT NOT NULL,
    "step_number" INTEGER NOT NULL,
    "role_name" TEXT NOT NULL,
    "role_code" TEXT,
    "user_id" TEXT,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "approval_workflow_steps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "group_brands_code_key" ON "group_brands"("code");

-- CreateIndex
CREATE UNIQUE INDEX "stores_code_key" ON "stores"("code");

-- CreateIndex
CREATE UNIQUE INDEX "collections_name_key" ON "collections"("name");

-- CreateIndex
CREATE UNIQUE INDEX "genders_name_key" ON "genders"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sku_catalog_sku_code_key" ON "sku_catalog"("sku_code");

-- CreateIndex
CREATE UNIQUE INDEX "budgets_budget_code_key" ON "budgets"("budget_code");

-- CreateIndex
CREATE INDEX "budgets_fiscal_year_idx" ON "budgets"("fiscal_year");

-- CreateIndex
CREATE INDEX "budgets_status_idx" ON "budgets"("status");

-- CreateIndex
CREATE UNIQUE INDEX "budgets_group_brand_id_season_group_id_season_type_fiscal_y_key" ON "budgets"("group_brand_id", "season_group_id", "season_type", "fiscal_year");

-- CreateIndex
CREATE UNIQUE INDEX "budget_details_budget_id_store_id_key" ON "budget_details"("budget_id", "store_id");

-- CreateIndex
CREATE UNIQUE INDEX "planning_versions_planning_code_key" ON "planning_versions"("planning_code");

-- CreateIndex
CREATE UNIQUE INDEX "planning_versions_budget_detail_id_version_number_key" ON "planning_versions"("budget_detail_id", "version_number");

-- CreateIndex
CREATE UNIQUE INDEX "product_allocations_proposal_product_id_store_id_key" ON "product_allocations"("proposal_product_id", "store_id");

-- CreateIndex
CREATE INDEX "approvals_entity_type_entity_id_idx" ON "approvals"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_entity_id_idx" ON "audit_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "audit_logs_user_id_idx" ON "audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs"("created_at");

-- CreateIndex
CREATE INDEX "sales_history_sku_code_store_id_season_idx" ON "sales_history"("sku_code", "store_id", "season");

-- CreateIndex
CREATE INDEX "size_curve_recommendations_category_store_id_idx" ON "size_curve_recommendations"("category", "store_id");

-- CreateIndex
CREATE UNIQUE INDEX "size_curve_recommendations_sku_id_store_id_size_code_key" ON "size_curve_recommendations"("sku_id", "store_id", "size_code");

-- CreateIndex
CREATE INDEX "budget_alerts_budget_id_is_read_created_at_idx" ON "budget_alerts"("budget_id", "is_read", "created_at" DESC);

-- CreateIndex
CREATE INDEX "budget_snapshots_budget_id_snapshot_date_idx" ON "budget_snapshots"("budget_id", "snapshot_date" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "budget_snapshots_budget_id_snapshot_date_key" ON "budget_snapshots"("budget_id", "snapshot_date");

-- CreateIndex
CREATE INDEX "allocation_history_season_group_season_type_dimension_type_idx" ON "allocation_history"("season_group", "season_type", "dimension_type");

-- CreateIndex
CREATE INDEX "allocation_history_dimension_type_dimension_value_idx" ON "allocation_history"("dimension_type", "dimension_value");

-- CreateIndex
CREATE UNIQUE INDEX "allocation_recommendations_budget_detail_id_dimension_type__key" ON "allocation_recommendations"("budget_detail_id", "dimension_type", "dimension_value");

-- CreateIndex
CREATE INDEX "risk_assessments_entity_type_risk_level_idx" ON "risk_assessments"("entity_type", "risk_level");

-- CreateIndex
CREATE INDEX "risk_assessments_overall_score_idx" ON "risk_assessments"("overall_score");

-- CreateIndex
CREATE UNIQUE INDEX "risk_assessments_entity_type_entity_id_key" ON "risk_assessments"("entity_type", "entity_id");

-- CreateIndex
CREATE UNIQUE INDEX "risk_thresholds_factor_name_key" ON "risk_thresholds"("factor_name");

-- CreateIndex
CREATE INDEX "sku_performance_sku_code_idx" ON "sku_performance"("sku_code");

-- CreateIndex
CREATE INDEX "sku_performance_performance_score_idx" ON "sku_performance"("performance_score");

-- CreateIndex
CREATE UNIQUE INDEX "sku_performance_sku_id_season_group_fiscal_year_store_id_key" ON "sku_performance"("sku_id", "season_group", "fiscal_year", "store_id");

-- CreateIndex
CREATE INDEX "attribute_trends_trend_score_idx" ON "attribute_trends"("trend_score");

-- CreateIndex
CREATE UNIQUE INDEX "attribute_trends_attribute_type_attribute_value_category_se_key" ON "attribute_trends"("attribute_type", "attribute_value", "category", "season_group", "fiscal_year");

-- CreateIndex
CREATE INDEX "sku_recommendations_budget_detail_id_category_idx" ON "sku_recommendations"("budget_detail_id", "category");

-- CreateIndex
CREATE INDEX "sku_recommendations_overall_score_idx" ON "sku_recommendations"("overall_score");

-- CreateIndex
CREATE INDEX "approval_workflow_steps_brand_id_idx" ON "approval_workflow_steps"("brand_id");

-- CreateIndex
CREATE UNIQUE INDEX "approval_workflow_steps_brand_id_step_number_key" ON "approval_workflow_steps"("brand_id", "step_number");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "genders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sku_catalog" ADD CONSTRAINT "sku_catalog_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "group_brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_group_brand_id_fkey" FOREIGN KEY ("group_brand_id") REFERENCES "group_brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_details" ADD CONSTRAINT "budget_details_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_details" ADD CONSTRAINT "budget_details_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planning_versions" ADD CONSTRAINT "planning_versions_budget_detail_id_fkey" FOREIGN KEY ("budget_detail_id") REFERENCES "budget_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planning_versions" ADD CONSTRAINT "planning_versions_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planning_details" ADD CONSTRAINT "planning_details_planning_version_id_fkey" FOREIGN KEY ("planning_version_id") REFERENCES "planning_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planning_details" ADD CONSTRAINT "planning_details_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planning_details" ADD CONSTRAINT "planning_details_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "genders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planning_details" ADD CONSTRAINT "planning_details_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planning_details" ADD CONSTRAINT "planning_details_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "sub_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_planning_version_id_fkey" FOREIGN KEY ("planning_version_id") REFERENCES "planning_versions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposal_products" ADD CONSTRAINT "proposal_products_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "proposals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposal_products" ADD CONSTRAINT "proposal_products_sku_id_fkey" FOREIGN KEY ("sku_id") REFERENCES "sku_catalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_allocations" ADD CONSTRAINT "product_allocations_proposal_product_id_fkey" FOREIGN KEY ("proposal_product_id") REFERENCES "proposal_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_allocations" ADD CONSTRAINT "product_allocations_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "approvals" ADD CONSTRAINT "approvals_decider_id_fkey" FOREIGN KEY ("decider_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_history" ADD CONSTRAINT "sales_history_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "size_curve_recommendations" ADD CONSTRAINT "size_curve_recommendations_sku_id_fkey" FOREIGN KEY ("sku_id") REFERENCES "sku_catalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "size_curve_recommendations" ADD CONSTRAINT "size_curve_recommendations_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_alerts" ADD CONSTRAINT "budget_alerts_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_snapshots" ADD CONSTRAINT "budget_snapshots_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allocation_recommendations" ADD CONSTRAINT "allocation_recommendations_budget_detail_id_fkey" FOREIGN KEY ("budget_detail_id") REFERENCES "budget_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sku_performance" ADD CONSTRAINT "sku_performance_sku_id_fkey" FOREIGN KEY ("sku_id") REFERENCES "sku_catalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sku_performance" ADD CONSTRAINT "sku_performance_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sku_recommendations" ADD CONSTRAINT "sku_recommendations_budget_detail_id_fkey" FOREIGN KEY ("budget_detail_id") REFERENCES "budget_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sku_recommendations" ADD CONSTRAINT "sku_recommendations_sku_id_fkey" FOREIGN KEY ("sku_id") REFERENCES "sku_catalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "approval_workflow_steps" ADD CONSTRAINT "approval_workflow_steps_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "group_brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "approval_workflow_steps" ADD CONSTRAINT "approval_workflow_steps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
