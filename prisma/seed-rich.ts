// ============================================================================
// DAFC OTB Planning — Rich Data Seed
// Populates ALL tables with realistic luxury fashion retail data
// Run: npx ts-node prisma/seed-rich.ts
// ============================================================================

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// ─── Helpers ──────────────────────────────────────────────────────────────────

function d(n: number): Prisma.Decimal {
  return new Prisma.Decimal(n);
}

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randDec(min: number, max: number, decimals = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('');
  console.log('==========================================================');
  console.log('  DAFC OTB — Rich Data Seeder');
  console.log('  Populating all tables with luxury fashion retail data');
  console.log('==========================================================');
  console.log('');

  // ─── 0. READ EXISTING IDS ──────────────────────────────────────────────

  console.log('📖 Reading existing records...');

  const storeREX = await prisma.store.findUniqueOrThrow({ where: { storeCode: 'REX' } });
  const storeTTP = await prisma.store.findUniqueOrThrow({ where: { storeCode: 'TTP' } });

  // Note: Brand table is singular now in logic, linked to GroupBrand.
  // We'll fetch Brands directly.
  const brandFER = await prisma.brand.findUniqueOrThrow({ where: { brandCode: 'FER' } });
  const brandBUR = await prisma.brand.findUniqueOrThrow({ where: { brandCode: 'BUR' } });
  const brandGUC = await prisma.brand.findUniqueOrThrow({ where: { brandCode: 'GUC' } });
  const brandPRA = await prisma.brand.findUniqueOrThrow({ where: { brandCode: 'PRA' } });

  const collCarryOver = await prisma.collection.findUniqueOrThrow({ where: { collectionName: 'Carry Over' } });
  const collSeasonal = await prisma.collection.findUniqueOrThrow({ where: { collectionName: 'Seasonal' } });
  const genderF = await prisma.gender.findUniqueOrThrow({ where: { genderName: 'Female' } });
  const genderM = await prisma.gender.findUniqueOrThrow({ where: { genderName: 'Male' } });

  // Season Groups
  const sgSS = await prisma.seasonGroup.findUniqueOrThrow({ where: { seasonGroupName: 'SS' } });
  const sgFW = await prisma.seasonGroup.findUniqueOrThrow({ where: { seasonGroupName: 'FW' } });

  // Seasons
  const sSSPre = await prisma.season.findUnique({ where: { seasonName: 'SS Pre' } });
  const sSSMain = await prisma.season.findUnique({ where: { seasonName: 'SS Main' } });
  const sFWPre = await prisma.season.findUnique({ where: { seasonName: 'FW Pre' } });
  const sFWMain = await prisma.season.findUnique({ where: { seasonName: 'FW Main' } });

  // Categories & SubCategories
  // We fetch by name as IDs are not fixed in seed.ts
  const getSub = async (name: string) => prisma.subCategory.findFirstOrThrow({ where: { subCategoryName: name } });

  const subW_outerwear = await getSub('W Outerwear');
  const subW_tops = await getSub('W Tops');
  const subW_dresses = await getSub('W Dresses');
  const subW_bags = await getSub('W Bags');
  const subW_slg = await getSub('W SLG');
  const subW_shoes = await getSub("Women's Shoes");
  const subM_outerwear = await getSub('M Outerwear');
  const subM_tops = await getSub('M Tops');
  const subM_bags = await getSub('M Bags');
  const subM_slg = await getSub('M SLG');

  const userMerch = await prisma.user.findUniqueOrThrow({ where: { userEmail: 'merch@dafc.com' } });
  const userBuyer = await prisma.user.findUniqueOrThrow({ where: { userEmail: 'buyer@dafc.com' } });
  const userManager = await prisma.user.findUniqueOrThrow({ where: { userEmail: 'manager@dafc.com' } });
  const userFinance = await prisma.user.findUniqueOrThrow({ where: { userEmail: 'finance@dafc.com' } });

  console.log('  ✅ All existing records loaded\n');

  // ─── 0b. CLEAN TABLES ────────────────────────────────────────────────
  console.log('🧹 Cleaning tables...');
  await prisma.ticketApprovalLog.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.sKUAllocate.deleteMany();
  await prisma.proposalSizing.deleteMany();
  await prisma.sKUProposal.deleteMany();
  await prisma.sKUProposalHeader.deleteMany();
  await prisma.planningCategory.deleteMany();
  await prisma.planningGender.deleteMany();
  await prisma.planningCollection.deleteMany();
  await prisma.planningHeader.deleteMany();
  await prisma.budgetAllocate.deleteMany();
  await prisma.allocateHeader.deleteMany();
  await prisma.budget.deleteMany(); // Cascades? We doing manual delete order
  await prisma.approvalWorkflowLevel.deleteMany();
  await prisma.approvalWorkflow.deleteMany();
  console.log('  ✅ Cleaned\n');

  // ======================================================================
  // 1. ADDITIONAL PRODUCTS
  // ======================================================================
  console.log('🏷️  Creating additional Product entries...');

  const newSkus = [
    // ── FERRAGAMO WOMEN'S RTW ──
    { skuCode: 'FER-W-OW-001', productName: 'GANCINI BELTED COAT', subCategoryId: subW_outerwear.subCategoryId, theme: 'SEPTEMBER (09)', color: 'CAMEL', composition: '80% WOOL 20% CASHMERE', srp: 89000000, brandId: brandFER.brandId },
    { skuCode: 'FER-W-OW-002', productName: 'DOUBLE-BREASTED TRENCH', subCategoryId: subW_outerwear.subCategoryId, theme: 'OCTOBER (10)', color: 'HONEY', composition: '100% COTTON', srp: 75000000, brandId: brandFER.brandId },
    { skuCode: 'FER-W-OW-003', productName: 'CAPE PONCHO CASHMERE', subCategoryId: subW_outerwear.subCategoryId, theme: 'NOVEMBER (11)', color: 'IVORY', composition: '80% WOOL 20% CASHMERE', srp: 95000000, brandId: brandFER.brandId },
    { skuCode: 'FER-W-TP-001', productName: 'SILK BOW BLOUSE', subCategoryId: subW_tops.subCategoryId, theme: 'AUGUST (08)', color: 'DUSTY PINK', composition: '100% SILK', srp: 32000000, brandId: brandFER.brandId },
    { skuCode: 'FER-W-TP-002', productName: 'GANCINI KNIT TOP', subCategoryId: subW_tops.subCategoryId, theme: 'SEPTEMBER (09)', color: 'BLACK', composition: '80% WOOL 20% CASHMERE', srp: 28500000, brandId: brandFER.brandId },
    { skuCode: 'FER-W-TP-003', productName: 'PRINTED POPLIN SHIRT', subCategoryId: subW_tops.subCategoryId, theme: 'OCTOBER (10)', color: 'FOREST GREEN', composition: '100% COTTON', srp: 24000000, brandId: brandFER.brandId },
    { skuCode: 'FER-W-DR-001', productName: 'WRAP DRESS CREPE', subCategoryId: subW_dresses.subCategoryId, theme: 'SEPTEMBER (09)', color: 'WINE RED', composition: '100% SILK', srp: 52000000, brandId: brandFER.brandId },
    { skuCode: 'FER-W-DR-002', productName: 'MIDI DRESS PLISSE', subCategoryId: subW_dresses.subCategoryId, theme: 'OCTOBER (10)', color: 'EMERALD', composition: '100% POLYAMIDE', srp: 48000000, brandId: brandFER.brandId },
    { skuCode: 'FER-W-DR-003', productName: 'COCKTAIL DRESS SATIN', subCategoryId: subW_dresses.subCategoryId, theme: 'NOVEMBER (11)', color: 'BURGUNDY', composition: '100% SILK', srp: 65000000, brandId: brandFER.brandId },
    // ── FERRAGAMO WOMEN'S BAGS ──
    { skuCode: 'FER-W-BG-001', productName: 'VARA BOW TOTE', subCategoryId: subW_bags.subCategoryId, theme: 'AUGUST (08)', color: 'BLACK', composition: '100% LEATHER', srp: 85000000, brandId: brandFER.brandId },
    { skuCode: 'FER-W-BG-002', productName: 'TRIFOLIO CROSSBODY', subCategoryId: subW_bags.subCategoryId, theme: 'SEPTEMBER (09)', color: 'DUSTY PINK', composition: '100% LEATHER', srp: 62000000, brandId: brandFER.brandId },
    { skuCode: 'FER-W-BG-003', productName: 'GANCINI CLUTCH', subCategoryId: subW_bags.subCategoryId, theme: 'OCTOBER (10)', color: 'WINE RED', composition: '100% LEATHER', srp: 45000000, brandId: brandFER.brandId },
    { skuCode: 'FER-W-BG-004', productName: 'STUDIO TOP HANDLE', subCategoryId: subW_bags.subCategoryId, theme: 'NOVEMBER (11)', color: 'HONEY', composition: '100% LEATHER', srp: 98000000, brandId: brandFER.brandId },
    { skuCode: 'FER-W-BG-005', productName: 'WANDA MINI BAG', subCategoryId: subW_bags.subCategoryId, theme: 'DECEMBER (12)', color: 'IVORY', composition: 'CANVAS/LEATHER', srp: 42000000, brandId: brandFER.brandId },
  ];

  for (const sku of newSkus) {
    await prisma.product.upsert({
      where: { skuCode: sku.skuCode },
      update: {},
      create: sku,
    });
  }
  console.log(`  ✅ ${newSkus.length} additional Products created\n`);

  const allProducts = await prisma.product.findMany();
  const skuMap = new Map(allProducts.map(s => [s.skuCode, s]));

  // ======================================================================
  // 2. BUDGETS
  // ======================================================================
  console.log('💰 Creating budgets...');

  // Note: New schema "Budget" is generic, "BudgetAllocate" is specific.
  // We'll create Budgets to represent the "Master Budget" for a brand/year.

  const budgetDefs = [
    { name: 'FER SS 2026', brandId: brandFER.brandId, year: 2026, amount: 20_000_000_000 },
    { name: 'BUR FW 2026', brandId: brandBUR.brandId, year: 2026, amount: 15_000_000_000 },
    { name: 'GUC SS 2026', brandId: brandGUC.brandId, year: 2026, amount: 30_000_000_000 },
    { name: 'PRA FW 2026', brandId: brandPRA.brandId, year: 2026, amount: 18_000_000_000 },
  ];

  const createdBudgets: any[] = [];

  for (const bd of budgetDefs) {
    const budget = await prisma.budget.create({
      data: {
        budgetName: bd.name,
        brandId: bd.brandId,
        fiscalYear: bd.year,
        budgetAmount: d(bd.amount),
        budgetStatus: 'APPROVED',
        createdBy: userMerch.userId
      }
    });
    createdBudgets.push(budget);

    // Create AllocateHeader (Version 1)
    const allocHeader = await prisma.allocateHeader.create({
      data: {
        budgetId: budget.budgetId,
        version: 1,
        createdBy: userMerch.userId
      }
    });

    // Distribute to Stores/Seasons
    // REX gets 60%, TTP 40%
    // For FER SS: SS Pre (40%), SS Main (60%)
    // This is simplified distribution
    const seasonsForBudget = bd.name.includes('SS')
      ? [sSSPre, sSSMain].filter(Boolean) as typeof sSSPre[]
      : [sFWPre, sFWMain].filter(Boolean) as typeof sFWPre[];

    for (const season of seasonsForBudget) {
      if (!season) continue;
      const seasonTotal = bd.amount * (season.seasonName.includes('Main') ? 0.6 : 0.4);

      // REX
      await prisma.budgetAllocate.create({
        data: {
          allocateHeaderId: allocHeader.allocateHeaderId,
          storeId: storeREX.storeId,
          seasonGroupId: season.seasonGroupId,
          seasonId: season.seasonId,
          budgetAmount: d(seasonTotal * 0.6)
        }
      });
      // TTP
      await prisma.budgetAllocate.create({
        data: {
          allocateHeaderId: allocHeader.allocateHeaderId,
          storeId: storeTTP.storeId,
          seasonGroupId: season.seasonGroupId,
          seasonId: season.seasonId,
          budgetAmount: d(seasonTotal * 0.4)
        }
      });
    }
  }
  console.log(`  ✅ ${createdBudgets.length} budgets created`);

  // ======================================================================
  // 3. PLANNING HEADERS & DETAILS
  // ======================================================================
  console.log('📊 Creating planning headers...');

  // Create one Planning Header for userMerch
  const planHeader = await prisma.planningHeader.create({
    data: {
      version: 1,
      createdBy: userMerch.userId
    }
  });

  // Example Planning Detail for REX / SS / Female
  // (Simplified as logic is complex without specific context)
  await prisma.planningCollection.create({
    data: {
      planningHeaderId: planHeader.planningHeaderId,
      storeId: storeREX.storeId,
      collectionId: collSeasonal.collectionId,
      actualBuyPct: d(60),
      proposedBuyPct: d(65),
      otbProposedAmount: d(5_000_000_000)
    }
  });

  await prisma.planningGender.create({
    data: {
      planningHeaderId: planHeader.planningHeaderId,
      storeId: storeREX.storeId,
      genderId: genderF.genderId,
      actualBuyPct: d(70),
      proposedBuyPct: d(70),
      otbProposedAmount: d(4_000_000_000)
    }
  });
  console.log('  ✅ Planning data created');

  // ======================================================================
  // 4. SKU PROPOSALS
  // ======================================================================
  console.log('📋 Creating SKU proposals...');

  // Create a Proposal Header
  const proposalHeader = await prisma.sKUProposalHeader.create({
    data: {
      version: 1,
      createdBy: userBuyer.userId
    }
  });

  // Create SKUs in this proposal (using FER items)
  const ferSkus = newSkus.slice(0, 5); // Take first 5 new FER items

  for (const item of ferSkus) {
    // Find actual product ID
    const product = skuMap.get(item.skuCode);
    if (!product) continue;

    const prop = await prisma.sKUProposal.create({
      data: {
        skuProposalHeaderId: proposalHeader.skuProposalHeaderId,
        productId: product.productId,
        customerTarget: 'VIP',
        unitCost: d(Number(product.srp) * 0.4), // approx cost
        srp: product.srp,
      }
    });

    // Allocate to stores
    await prisma.sKUAllocate.create({
      data: {
        skuProposalId: prop.skuProposalId,
        storeId: storeREX.storeId,
        quantity: d(10)
      }
    });
    await prisma.sKUAllocate.create({
      data: {
        skuProposalId: prop.skuProposalId,
        storeId: storeTTP.storeId,
        quantity: d(5)
      }
    });
  }
  console.log(`  ✅ SKU Proposals created`);

  // ======================================================================
  // 5. APPROVAL WORKFLOWS
  // ======================================================================
  console.log('✅ Creating approval workflows...');

  const ferGroupBrand = await prisma.groupBrand.findUnique({ where: { groupBrandCode: 'FER' } });

  if (ferGroupBrand) {
    const workflow = await prisma.approvalWorkflow.create({
      data: {
        groupBrandId: ferGroupBrand.groupBrandId,
        workflowName: 'Standard Brand Approval'
      }
    });

    await prisma.approvalWorkflowLevel.create({
      data: {
        approvalWorkflowId: workflow.approvalWorkflowId,
        levelOrder: 1,
        levelName: 'Merchandise Manager Check',
        approverUserId: userManager.userId,
        isRequired: true
      }
    });

    await prisma.approvalWorkflowLevel.create({
      data: {
        approvalWorkflowId: workflow.approvalWorkflowId,
        levelOrder: 2,
        levelName: 'Finance Director Final',
        approverUserId: userFinance.userId,
        isRequired: true
      }
    });
  }
  console.log('  ✅ Workflows created');

  console.log('\n🎉 Rich Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Rich seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
