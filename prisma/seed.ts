// ============================================================================
// Database Seed — Replaces all hardcoded constants.js data
// Run: npx prisma db seed   or   npm run prisma:seed
// ============================================================================

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ─── ROLES ────────────────────────────────────────────────────────────
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { roleName: 'admin' },
      update: {},
      create: {
        roleName: 'admin',
        description: 'System Administrator',
        permissions: JSON.stringify(['*']),
      },
    }),
    prisma.role.upsert({
      where: { roleName: 'buyer' },
      update: {},
      create: {
        roleName: 'buyer',
        description: 'Buyer — creates proposals, manages SKU selection',
        permissions: JSON.stringify([
          'budget:read',
          'planning:read',
          'proposal:read', 'proposal:write', 'proposal:submit',
          'master:read',
        ]),
      },
    }),
    prisma.role.upsert({
      where: { roleName: 'merchandiser' },
      update: {},
      create: {
        roleName: 'merchandiser',
        description: 'Merchandiser — creates budgets and planning',
        permissions: JSON.stringify([
          'budget:read', 'budget:write', 'budget:submit',
          'planning:read', 'planning:write', 'planning:submit',
          'proposal:read',
          'master:read',
        ]),
      },
    }),
    prisma.role.upsert({
      where: { roleName: 'merch_manager' },
      update: {},
      create: {
        roleName: 'merch_manager',
        description: 'Merchandising Manager — Level 1 Approver',
        permissions: JSON.stringify([
          'budget:read', 'budget:write', 'budget:submit', 'budget:approve_l1',
          'planning:read', 'planning:write', 'planning:approve_l1',
          'proposal:read', 'proposal:approve_l1',
          'master:read',
        ]),
      },
    }),
    prisma.role.upsert({
      where: { roleName: 'finance_director' },
      update: {},
      create: {
        roleName: 'finance_director',
        description: 'Finance Director — Level 2 Approver',
        permissions: JSON.stringify([
          'budget:read', 'budget:approve_l2',
          'planning:read', 'planning:approve_l2',
          'proposal:read', 'proposal:approve_l2',
          'master:read',
        ]),
      },
    }),
  ]);

  const adminRole = roles[0];
  const buyerRole = roles[1];
  const merchRole = roles[2];
  const merchMgrRole = roles[3];
  const finDirRole = roles[4];

  console.log(`  ✅ ${roles.length} roles created`);

  // ─── STORES ───────────────────────────────────────────────────────────
  const stores = await Promise.all([
    prisma.store.upsert({
      where: { storeCode: 'REX' },
      update: {},
      create: { storeCode: 'REX', storeName: 'REX', region: 'HCMC' },
    }),
    prisma.store.upsert({
      where: { storeCode: 'TTP' },
      update: {},
      create: { storeCode: 'TTP', storeName: 'TTP', region: 'HCMC' },
    }),
  ]);
  console.log(`  ✅ ${stores.length} stores created`);

  // ─── GROUP BRANDS ─────────────────────────────────────────────────────
  const brands = await Promise.all([
    prisma.groupBrand.upsert({
      where: { groupBrandCode: 'FER' },
      update: {},
      create: {
        groupBrandCode: 'FER', groupBrandName: 'Ferragamo',
      },
    }),
    prisma.groupBrand.upsert({
      where: { groupBrandCode: 'BUR' },
      update: {},
      create: {
        groupBrandCode: 'BUR', groupBrandName: 'Burberry',
      },
    }),
    prisma.groupBrand.upsert({
      where: { groupBrandCode: 'GUC' },
      update: {},
      create: {
        groupBrandCode: 'GUC', groupBrandName: 'Gucci',
      },
    }),
    prisma.groupBrand.upsert({
      where: { groupBrandCode: 'PRA' },
      update: {},
      create: {
        groupBrandCode: 'PRA', groupBrandName: 'Prada',
      },
    }),
  ]);
  
  // Create Child Brands (1-to-1 mapping for simplicity in seed)
  for (const gb of brands) {
     await prisma.brand.upsert({
        where: { brandCode: gb.groupBrandCode }, // Using same code for simplicity
        update: {},
        create: {
            brandCode: gb.groupBrandCode,
            brandName: gb.groupBrandName,
            groupBrandId: gb.groupBrandId
        }
     })
  }

  const allBrands = await prisma.brand.findMany();
  console.log(`  ✅ ${brands.length} group brands and ${allBrands.length} brands created`);

  // ─── COLLECTIONS ──────────────────────────────────────────────────────
  const collections = await Promise.all([
    prisma.collection.upsert({ where: { collectionName: 'Carry Over' }, update: {}, create: { collectionName: 'Carry Over' } }),
    prisma.collection.upsert({ where: { collectionName: 'Seasonal' }, update: {}, create: { collectionName: 'Seasonal' } }),
  ]);
  console.log(`  ✅ ${collections.length} collections created`);

  // ─── SEASON GROUPS ────────────────────────────────────────────────────
  const seasonGroups = await Promise.all([
      prisma.seasonGroup.upsert({ where: { seasonGroupName: 'SS' }, update: {}, create: { seasonGroupName: 'SS' } }),
      prisma.seasonGroup.upsert({ where: { seasonGroupName: 'FW' }, update: {}, create: { seasonGroupName: 'FW' } }),
  ]);

  // ─── SEASONS ──────────────────────────────────────────────────────────
  // Linking seasons to season groups
  const ssGroup = seasonGroups.find(sg => sg.seasonGroupName === 'SS');
  const fwGroup = seasonGroups.find(sg => sg.seasonGroupName === 'FW');
  
  if (ssGroup && fwGroup) {
      await prisma.season.upsert({ where: { seasonName: 'SS Pre' }, update: {}, create: { seasonName: 'SS Pre', seasonGroupId: ssGroup.seasonGroupId } });
      await prisma.season.upsert({ where: { seasonName: 'SS Main' }, update: {}, create: { seasonName: 'SS Main', seasonGroupId: ssGroup.seasonGroupId } });
      await prisma.season.upsert({ where: { seasonName: 'FW Pre' }, update: {}, create: { seasonName: 'FW Pre', seasonGroupId: fwGroup.seasonGroupId } });
      await prisma.season.upsert({ where: { seasonName: 'FW Main' }, update: {}, create: { seasonName: 'FW Main', seasonGroupId: fwGroup.seasonGroupId } });
      console.log(`  ✅ 4 seasons created`);
  }

  // ─── GENDERS ──────────────────────────────────────────────────────────
  const genders = await Promise.all([
    prisma.gender.upsert({ where: { genderName: 'Female' }, update: {}, create: { genderName: 'Female' } }),
    prisma.gender.upsert({ where: { genderName: 'Male' }, update: {}, create: { genderName: 'Male' } }),
  ]);
  const [female, male] = genders;
  console.log(`  ✅ ${genders.length} genders created`);

  // ─── CATEGORIES + SUB-CATEGORIES ──────────────────────────────────────
  // Female categories
  // Note: We don't have explicit IDs in new schema for categories automatically, but we can look them up by Name or just create them.
  // Using upsert with name as unique key isn't possible because name isn't unique in schema (genderId composite?) 
  // Actually schema says Category name is NOT unique globally, but `categoryName` is just String.
  // Wait, schema says `categoryName String @map("name")` but no `@unique`.
  // So upserting by name might be tricky unless I rely on valid ID or findFirst.
  // For seeding, I'll use findFirst to check existence or just create if empty.
  // To keep it idempotent, I will try to find first.

  const ensureCategory = async (name: string, genderId: string) => {
      const existing = await prisma.category.findFirst({ where: { categoryName: name, genderId } });
      if (existing) return existing;
      return prisma.category.create({ data: { categoryName: name, genderId } });
  }

  const womenRtw = await ensureCategory("WOMEN'S RTW", female.genderId);
  const womenHardAcc = await ensureCategory('WOMEN HARD ACCESSORIES', female.genderId);
  const womenOthers = await ensureCategory('OTHERS', female.genderId);

  // Male categories
  const menRtw = await ensureCategory("MEN'S RTW", male.genderId);
  const menAcc = await ensureCategory('MEN ACCESSORIES', male.genderId);

  // Sub-categories
  const ensureSubCategory = async (name: string, categoryId: string) => {
      const existing = await prisma.subCategory.findFirst({ where: { subCategoryName: name, categoryId } });
      if (existing) return existing;
      return prisma.subCategory.create({ data: { subCategoryName: name, categoryId } });
  }

  const subCategories = await Promise.all([
    // Women RTW
    ensureSubCategory('W Outerwear', womenRtw.categoryId),
    ensureSubCategory('W Tailoring', womenRtw.categoryId),
    ensureSubCategory('W Dresses', womenRtw.categoryId),
    ensureSubCategory('W Tops', womenRtw.categoryId),
    ensureSubCategory('W Body', womenRtw.categoryId),
    ensureSubCategory('W Bottoms', womenRtw.categoryId),
    // Women Hard Accessories
    ensureSubCategory('W Bags', womenHardAcc.categoryId),
    ensureSubCategory('W SLG', womenHardAcc.categoryId),
    // Women Others
    ensureSubCategory("Women's Shoes", womenOthers.categoryId),
    // Men RTW
    ensureSubCategory('M Outerwear', menRtw.categoryId),
    ensureSubCategory('M Tops', menRtw.categoryId),
    ensureSubCategory('M Bottoms', menRtw.categoryId),
    // Men Accessories
    ensureSubCategory('M Bags', menAcc.categoryId),
    ensureSubCategory('M SLG', menAcc.categoryId),
  ]);
  console.log(`  ✅ 5 categories + ${subCategories.length} sub-categories created`);

  // ─── PRODUCTS ────────────────────────────────────────────────────────
  // We need to map the old "productType" to subCategoryID.
  // This is a bit manual.
  
  const subCatMap = new Map<string, string>(); // name -> id
  (await prisma.subCategory.findMany()).forEach(sc => subCatMap.set(sc.subCategoryName, sc.subCategoryId));
  
  // Helper to find subCat ID from old "productType" string
  const getSubCatId = (type: string): string => {
       const map: Record<string, string> = {
          'W OUTERWEAR': 'W Outerwear',
          'W TOPS': 'W Tops',
          'W DRESSES': 'W Dresses',
          'W BAGS': 'W Bags',
          'W SLG': 'W SLG',
          'W SHOES': "Women's Shoes",
          'M OUTERWEAR': 'M Outerwear',
          'M TOPS': 'M Tops',
          'M BAGS': 'M Bags',
          'M SLG': 'M SLG'
       };
       const name = map[type];
       if (!name) return '';
       return subCatMap.get(name) || '';
  }

  const skus = [
    { skuCode: '8116333', productName: 'FITZROVIA DK SHT', productType: 'W OUTERWEAR', theme: 'AUGUST (08)', color: 'WINE RED', composition: '100% COTTON', srp: 87900000 },
    { skuCode: '8113543', productName: 'FLORISTON S', productType: 'W OUTERWEAR', theme: 'AUGUST (08)', color: 'MAHOGANY', composition: '100% POLYAMIDE (NYLON)', srp: 65900000 },
    { skuCode: '8115960', productName: 'OLDHAM CHK', productType: 'W OUTERWEAR', theme: 'AUGUST (08)', color: 'POPPY IP CHECK', composition: '100% COTTON', srp: 71900000 },
    { skuCode: '8116500', productName: 'KENSINGTON TRENCH', productType: 'W OUTERWEAR', theme: 'SEPTEMBER (09)', color: 'HONEY', composition: '100% COTTON', srp: 95000000 },
    { skuCode: '8116501', productName: 'CHELSEA COAT', productType: 'W OUTERWEAR', theme: 'SEPTEMBER (09)', color: 'BLACK', composition: '80% WOOL 20% CASHMERE', srp: 120000000 },
    { skuCode: '8114202', productName: 'GILLIAN WCHK', productType: 'W TOPS', theme: 'SEPTEMBER (09)', color: 'TRUFFLE IP CHECK', composition: '70% WOOL 30% CASHMERE', srp: 49900000 },
    { skuCode: '8115254', productName: 'GEORGETTE WCHK', productType: 'W TOPS', theme: 'SEPTEMBER (09)', color: 'TRUFFLE IP CHECK', composition: '70% WOOL 30% CASHMERE', srp: 58900000 },
    { skuCode: '8115640', productName: 'SCARLETT EKD', productType: 'W TOPS', theme: 'SEPTEMBER (09)', color: 'CAMEL', composition: '70% WOOL 30% CASHMERE', srp: 44900000 },
    { skuCode: '8115700', productName: 'VICTORIA BLOUSE', productType: 'W TOPS', theme: 'OCTOBER (10)', color: 'IVORY', composition: '100% SILK', srp: 38000000 },
    { skuCode: '8115701', productName: 'EMMA SHIRT', productType: 'W TOPS', theme: 'OCTOBER (10)', color: 'WHITE', composition: '100% COTTON', srp: 28000000 },
    { skuCode: '9201001', productName: 'HERITAGE TOTE', productType: 'M BAGS', theme: 'OCTOBER (10)', color: 'BLACK', composition: '100% LEATHER', srp: 65000000 },
    { skuCode: '9201002', productName: 'MESSENGER BAG', productType: 'M BAGS', theme: 'OCTOBER (10)', color: 'TAN', composition: '100% LEATHER', srp: 55000000 },
    { skuCode: '9201003', productName: 'BACKPACK CLASSIC', productType: 'M BAGS', theme: 'NOVEMBER (11)', color: 'NAVY', composition: '100% NYLON', srp: 42000000 },
    { skuCode: '9101001', productName: 'LOLA BAG', productType: 'W BAGS', theme: 'AUGUST (08)', color: 'BURGUNDY', composition: '100% LEATHER', srp: 78000000 },
    { skuCode: '9101002', productName: 'TB BAG SMALL', productType: 'W BAGS', theme: 'SEPTEMBER (09)', color: 'BLACK', composition: '100% LEATHER', srp: 95000000 },
  ];

  let productsCreated = 0;
  for (const sku of skus) {
    const subCatId = getSubCatId(sku.productType);
    if (!subCatId) {
        console.warn(`Skipping SKU ${sku.skuCode} - unknown subcat ${sku.productType}`);
        continue;
    }
    await prisma.product.upsert({
      where: { skuCode: sku.skuCode },
      update: {},
      create: {
          skuCode: sku.skuCode,
          productName: sku.productName,
          subCategoryId: subCatId,
          theme: sku.theme,
          color: sku.color,
          composition: sku.composition,
          srp: sku.srp,
          // Assign random brand from our list for now since we didn't specify in array
          brandId: allBrands.length > 0 ? allBrands[0].brandId : undefined 
      },
    });
    productsCreated++;
  }
  console.log(`  ✅ ${productsCreated} Products created`);

  // ─── DEFAULT USERS ────────────────────────────────────────────────────
  const password = await bcrypt.hash('dafc@2026', 12);
  const storeIds = JSON.stringify(stores.map(s => s.storeId));
  const brandIds = JSON.stringify(allBrands.map(b => b.brandId));

  const users = await Promise.all([
    prisma.user.upsert({
      where: { userEmail: 'admin@dafc.com' },
      update: {},
      create: {
        userEmail: 'admin@dafc.com', userName: 'System Admin',
        passwordHash: password, roleId: adminRole.roleId,
        storeAccess: storeIds, brandAccess: brandIds,
      },
    }),
    prisma.user.upsert({
      where: { userEmail: 'buyer@dafc.com' },
      update: {},
      create: {
        userEmail: 'buyer@dafc.com', userName: 'Nguyen Van Buyer',
        passwordHash: password, roleId: buyerRole.roleId,
        storeAccess: storeIds, brandAccess: brandIds,
      },
    }),
    prisma.user.upsert({
      where: { userEmail: 'merch@dafc.com' },
      update: {},
      create: {
        userEmail: 'merch@dafc.com', userName: 'Tran Thi Merch',
        passwordHash: password, roleId: merchRole.roleId,
        storeAccess: storeIds, brandAccess: brandIds,
      },
    }),
    prisma.user.upsert({
      where: { userEmail: 'manager@dafc.com' },
      update: {},
      create: {
        userEmail: 'manager@dafc.com', userName: 'Le Van Manager',
        passwordHash: password, roleId: merchMgrRole.roleId,
        storeAccess: storeIds, brandAccess: brandIds,
      },
    }),
    prisma.user.upsert({
      where: { userEmail: 'finance@dafc.com' },
      update: {},
      create: {
        userEmail: 'finance@dafc.com', userName: 'Pham Director',
        passwordHash: password, roleId: finDirRole.roleId,
        storeAccess: storeIds, brandAccess: brandIds,
      },
    }),
  ]);
  console.log(`  ✅ ${users.length} users created (password: dafc@2026)`);

  console.log('\n🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
