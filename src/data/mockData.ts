export interface Customer {
  id: string;
  name: string;
  code: string;
  gstin: string;
  state: string;
  creditLimit: number;
  balance: number;
  email: string;
  phone: string;
  category: string;
}

export interface Supplier {
  id: string;
  name: string;
  code: string;
  gstin: string;
  state: string;
  balance: number;
  email: string;
  phone: string;
  paymentTerms: string;
}

export interface Voucher {
  id: string;
  voucherNo: string;
  type: 'Sales' | 'Purchase' | 'Payment' | 'Receipt' | 'Journal';
  date: string;
  partyName: string;
  partyGstin?: string;
  taxableAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalAmount: number;
  status: 'Cleared' | 'Pending' | 'Overdue';
  company: string;
  financialYear: string;
}

export interface LedgerItem {
  id: string;
  name: string;
  group: 'Current Assets' | 'Fixed Assets' | 'Capital Account' | 'Current Liabilities' | 'Direct Income' | 'Indirect Income' | 'Direct Expenses' | 'Indirect Expenses' | 'Bank Accounts' | 'Cash-in-hand';
  openingBalance: number;
  debitAmount: number;
  creditAmount: number;
  closingBalance: number;
  badge?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  hsn: string;
  unit: string;
  openingStock: number;
  inward: number;
  outward: number;
  closingStock: number;
  valuationRate: number;
  totalValue: number;
  godown: string;
  batchNo: string;
  expiryDate: string;
}

export interface GSTSummaryItem {
  month: string;
  taxableSales: number;
  salesIGST: number;
  salesCGST: number;
  salesSGST: number;
  taxablePurchase: number;
  purchaseIGST: number;
  purchaseCGST: number;
  purchaseSGST: number;
  netTaxPayable: number;
}

// Customers Data
export const customersData: Customer[] = [
  { id: 'CUST-001', name: 'Apex Global Tech Solutions', code: 'CUST-APX', gstin: '27AAACA108311Z9', state: 'Maharashtra', creditLimit: 1500000, balance: 425000, email: 'accounts@apexglobal.com', phone: '+91 98200 12345', category: 'Enterprise' },
  { id: 'CUST-002', name: 'Pinnacle Enterprise Systems', code: 'CUST-PIN', gstin: '29BBBCA220111Z4', state: 'Karnataka', creditLimit: 2000000, balance: 680000, email: 'finance@pinnacle.in', phone: '+91 98450 67890', category: 'Enterprise' },
  { id: 'CUST-003', name: 'Zenith Retail & Logistics', code: 'CUST-ZEN', gstin: '07CCCCA331111Z2', state: 'Delhi', creditLimit: 1000000, balance: 195000, email: 'billing@zenithretail.com', phone: '+91 98110 54321', category: 'Retail Chain' },
  { id: 'CUST-004', name: 'Nexus Healthcare Services', code: 'CUST-NEX', gstin: '33DDDDA441111Z8', state: 'Tamil Nadu', creditLimit: 2500000, balance: 890000, email: 'payables@nexushealth.org', phone: '+91 98410 98765', category: 'Healthcare' },
  { id: 'CUST-005', name: 'Horizon International Traders', code: 'CUST-HOR', gstin: '24EEEEA551111Z6', state: 'Gujarat', creditLimit: 1800000, balance: 310000, email: 'import@horizontraders.com', phone: '+91 98250 11223', category: 'Export/Import' },
  { id: 'CUST-006', name: 'Orion Logistics & Supply Chain', code: 'CUST-ORI', gstin: '27FFFFA661111Z3', state: 'Maharashtra', creditLimit: 1200000, balance: 540000, email: 'accounts@orionlogistics.in', phone: '+91 98201 33445', category: 'Logistics' },
  { id: 'CUST-007', name: 'Acme Heavy Metal Industries', code: 'CUST-ACM', gstin: '06GGGGA771111Z1', state: 'Haryana', creditLimit: 3000000, balance: 1120000, email: 'finance@acmeind.com', phone: '+91 98120 55667', category: 'Manufacturing' },
  { id: 'CUST-008', name: 'CyberTech Cloud Solutions', code: 'CUST-CYB', gstin: '36HHHHA881111Z7', state: 'Telangana', creditLimit: 1500000, balance: 275000, email: 'billing@cybertech.cloud', phone: '+91 98490 77889', category: 'IT Services' },
  { id: 'CUST-009', name: 'Stellar Commodity Exports', code: 'CUST-STE', gstin: '19IIIIA991111Z5', state: 'West Bengal', creditLimit: 2200000, balance: 630000, email: 'accounts@stellarexports.com', phone: '+91 98300 99001', category: 'Exports' },
  { id: 'CUST-010', name: 'Beacon E-Commerce Ventures', code: 'CUST-BEA', gstin: '27JJJJA001111Z0', state: 'Maharashtra', creditLimit: 800000, balance: 145000, email: 'pay@beaconecom.in', phone: '+91 98202 44556', category: 'E-Commerce' },
];

// Suppliers Data
export const suppliersData: Supplier[] = [
  { id: 'SUPP-001', name: 'Metro Raw Materials Pvt Ltd', code: 'SUPP-MET', gstin: '27AAACM110011Z1', state: 'Maharashtra', balance: 580000, email: 'sales@metroraw.com', phone: '+91 98211 00112', paymentTerms: '30 Days' },
  { id: 'SUPP-002', name: 'Paramount Hardware Supplies', code: 'SUPP-PAR', gstin: '29BBBMP220011Z9', state: 'Karnataka', balance: 340000, email: 'orders@paramounthardware.com', phone: '+91 98451 22334', paymentTerms: '15 Days' },
  { id: 'SUPP-003', name: 'TechWare Electronic Components', code: 'SUPP-TEC', gstin: '36CCCMT330011Z7', state: 'Telangana', balance: 790000, email: 'invoices@techware.co', phone: '+91 98491 44556', paymentTerms: '45 Days' },
  { id: 'SUPP-004', name: 'Premier Office Stationery & Furniture', code: 'SUPP-PRE', gstin: '07DDGMP440011Z5', state: 'Delhi', balance: 125000, email: 'support@premieroffice.in', phone: '+91 98111 66778', paymentTerms: '30 Days' },
  { id: 'SUPP-005', name: 'Global Freight & Forwarding Services', code: 'SUPP-GLO', gstin: '27EEEMG550011Z3', state: 'Maharashtra', balance: 410000, email: 'billing@globalfreight.com', phone: '+91 98203 88990', paymentTerms: '15 Days' },
  { id: 'SUPP-006', name: 'Alpha Industrial Energy & Utilities', code: 'SUPP-ALP', gstin: '24FFFMA660011Z1', state: 'Gujarat', balance: 290000, email: 'billing@alphaenergy.in', phone: '+91 98251 00112', paymentTerms: '30 Days' },
  { id: 'SUPP-007', name: 'Matrix Packaging Solutions', code: 'SUPP-MAT', gstin: '33GGGMP770011Z8', state: 'Tamil Nadu', balance: 215000, email: 'sales@matrixpack.com', phone: '+91 98411 22334', paymentTerms: '30 Days' },
  { id: 'SUPP-008', name: 'Swift Distributors & Logistics', code: 'SUPP-SWI', gstin: '06HHHMS880011Z6', state: 'Haryana', balance: 460000, email: 'accounts@swiftdistributors.com', phone: '+91 98121 44556', paymentTerms: '30 Days' },
  { id: 'SUPP-009', name: 'Quantum Tech Components', code: 'SUPP-QUA', gstin: '27IIIMQ990011Z4', state: 'Maharashtra', balance: 880000, email: 'payables@quantumcomponents.com', phone: '+91 98204 66778', paymentTerms: '60 Days' },
  { id: 'SUPP-010', name: 'United Paper Mills & Containers', code: 'SUPP-UNI', gstin: '19JJJMU000011Z2', state: 'West Bengal', balance: 175000, email: 'orders@unitedpapermills.in', phone: '+91 98301 88990', paymentTerms: '30 Days' },
];

// Helper to generate 500 sales & 500 purchase vouchers deterministically
export const generateVouchers = (): Voucher[] => {
  const vouchers: Voucher[] = [];
  const startYear = 2025;

  // Generate Sales (500)
  for (let i = 1; i <= 500; i++) {
    const cust = customersData[i % customersData.length];
    const month = (i % 12) + 1;
    const day = ((i * 7) % 28) + 1;
    const monthStr = month < 10 ? `0${month}` : `${month}`;
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    const year = month > 3 ? startYear : startYear + 1;
    const dateStr = `${year}-${monthStr}-${dayStr}`;
    
    const taxable = Math.round((15000 + (i * 3241) % 185000) * 100) / 100;
    const isSameState = cust.state === 'Maharashtra';
    const cgst = isSameState ? Math.round(taxable * 0.09 * 100) / 100 : 0;
    const sgst = isSameState ? Math.round(taxable * 0.09 * 100) / 100 : 0;
    const igst = !isSameState ? Math.round(taxable * 0.18 * 100) / 100 : 0;
    const total = Math.round((taxable + cgst + sgst + igst) * 100) / 100;
    
    const fy = month > 3 ? `2025-26` : `2024-25`;
    const status = i % 4 === 0 ? 'Overdue' : i % 3 === 0 ? 'Pending' : 'Cleared';

    vouchers.push({
      id: `VOUCH-SALES-${i}`,
      voucherNo: `INV/2025-26/${1000 + i}`,
      type: 'Sales',
      date: dateStr,
      partyName: cust.name,
      partyGstin: cust.gstin,
      taxableAmount: taxable,
      cgst,
      sgst,
      igst,
      totalAmount: total,
      status,
      company: i % 5 === 0 ? 'VNV Global Inc' : 'VNV Tech Solutions Pvt Ltd',
      financialYear: fy,
    });
  }

  // Generate Purchases (500)
  for (let i = 1; i <= 500; i++) {
    const supp = suppliersData[i % suppliersData.length];
    const month = (i % 12) + 1;
    const day = ((i * 5) % 28) + 1;
    const monthStr = month < 10 ? `0${month}` : `${month}`;
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    const year = month > 3 ? startYear : startYear + 1;
    const dateStr = `${year}-${monthStr}-${dayStr}`;

    const taxable = Math.round((12000 + (i * 2873) % 145000) * 100) / 100;
    const isSameState = supp.state === 'Maharashtra';
    const cgst = isSameState ? Math.round(taxable * 0.09 * 100) / 100 : 0;
    const sgst = isSameState ? Math.round(taxable * 0.09 * 100) / 100 : 0;
    const igst = !isSameState ? Math.round(taxable * 0.18 * 100) / 100 : 0;
    const total = Math.round((taxable + cgst + sgst + igst) * 100) / 100;

    const fy = month > 3 ? `2025-26` : `2024-25`;
    const status = i % 5 === 0 ? 'Overdue' : i % 4 === 0 ? 'Pending' : 'Cleared';

    vouchers.push({
      id: `VOUCH-PURCH-${i}`,
      voucherNo: `PUR/${supp.code}/${2000 + i}`,
      type: 'Purchase',
      date: dateStr,
      partyName: supp.name,
      partyGstin: supp.gstin,
      taxableAmount: taxable,
      cgst,
      sgst,
      igst,
      totalAmount: total,
      status,
      company: i % 5 === 0 ? 'VNV Global Inc' : 'VNV Tech Solutions Pvt Ltd',
      financialYear: fy,
    });
  }

  return vouchers;
};

export const vouchersList = generateVouchers();

// 100 Ledgers List (Sample preview)
export const ledgersData: LedgerItem[] = [
  { id: 'LEDG-001', name: 'HDFC Bank Enterprise AC (39810)', group: 'Bank Accounts', openingBalance: 4500000, debitAmount: 28400000, creditAmount: 24100000, closingBalance: 8800000 },
  { id: 'LEDG-002', name: 'ICICI Bank Operating AC (88410)', group: 'Bank Accounts', openingBalance: 2100000, debitAmount: 14200000, creditAmount: 11900000, closingBalance: 4400000 },
  { id: 'LEDG-003', name: 'Petty Cash - Head Office', group: 'Cash-in-hand', openingBalance: 150000, debitAmount: 850000, creditAmount: 760000, closingBalance: 240000 },
  { id: 'LEDG-004', name: 'Plant & Heavy Machinery', group: 'Fixed Assets', openingBalance: 18500000, debitAmount: 2400000, creditAmount: 900000, closingBalance: 20000000 },
  { id: 'LEDG-005', name: 'Office Computers & Servers', group: 'Fixed Assets', openingBalance: 6500000, debitAmount: 1800000, creditAmount: 400000, closingBalance: 7900000 },
  { id: 'LEDG-006', name: 'Finished Software Goods Inventory', group: 'Current Assets', openingBalance: 8400000, debitAmount: 19500000, creditAmount: 17200000, closingBalance: 10700000 },
  { id: 'LEDG-007', name: 'Shareholders Equity Capital', group: 'Capital Account', openingBalance: 25000000, debitAmount: 0, creditAmount: 5000000, closingBalance: 30000000 },
  { id: 'LEDG-008', name: 'Axis Bank Term Loan AC', group: 'Current Liabilities', openingBalance: 12000000, debitAmount: 3500000, creditAmount: 0, closingBalance: 8500000 },
  { id: 'LEDG-009', name: 'Software License Revenue (SaaS)', group: 'Direct Income', openingBalance: 0, debitAmount: 0, creditAmount: 48900000, closingBalance: 48900000 },
  { id: 'LEDG-010', name: 'Implementation & Consulting Income', group: 'Direct Income', openingBalance: 0, debitAmount: 0, creditAmount: 12400000, closingBalance: 12400000 },
  { id: 'LEDG-011', name: 'Cloud Infrastructure & AWS Expenses', group: 'Direct Expenses', openingBalance: 0, debitAmount: 8400000, creditAmount: 0, closingBalance: 8400000 },
  { id: 'LEDG-012', name: 'Software Engineers Salaries & Wages', group: 'Indirect Expenses', openingBalance: 0, debitAmount: 21500000, creditAmount: 0, closingBalance: 21500000 },
  { id: 'LEDG-013', name: 'Office Rent & Facilities Expense', group: 'Indirect Expenses', openingBalance: 0, debitAmount: 3600000, creditAmount: 0, closingBalance: 3600000 },
  { id: 'LEDG-014', name: 'Marketing & Digital Ads Expense', group: 'Indirect Expenses', openingBalance: 0, debitAmount: 4200000, creditAmount: 0, closingBalance: 4200000 },
  { id: 'LEDG-015', name: 'GST Input Tax Credit (CGST/SGST/IGST)', group: 'Current Assets', openingBalance: 1200000, debitAmount: 4800000, creditAmount: 4100000, closingBalance: 1900000 },
];

// Generate extra ledgers to total 100 items
for (let i = 16; i <= 100; i++) {
  const groups: LedgerItem['group'][] = ['Current Assets', 'Fixed Assets', 'Current Liabilities', 'Direct Income', 'Indirect Expenses'];
  const group = groups[i % groups.length];
  const op = (i * 45000) % 500000;
  const dr = (i * 123000) % 2000000;
  const cr = (i * 98000) % 2000000;
  const cl = op + dr - cr;
  ledgersData.push({
    id: `LEDG-${i < 100 ? (i < 10 ? '00' + i : '0' + i) : i}`,
    name: `Ledger Sub-Account #${i} (${group})`,
    group,
    openingBalance: op,
    debitAmount: dr,
    creditAmount: cr,
    closingBalance: Math.abs(cl),
  });
}

// Inventory Items
export const inventoryData: InventoryItem[] = [
  { id: 'SKU-001', name: 'Dell PowerEdge R750 Cloud Server', sku: 'SRV-DELL-R750', hsn: '84715000', unit: 'Pcs', openingStock: 15, inward: 40, outward: 32, closingStock: 23, valuationRate: 285000, totalValue: 6555000, godown: 'Mumbai Central Godown', batchNo: 'B2025-08', expiryDate: '2028-12-31' },
  { id: 'SKU-002', name: 'Cisco Catalyst 9300 48-Port Switch', sku: 'NET-CISCO-9300', hsn: '85176290', unit: 'Pcs', openingStock: 30, inward: 60, outward: 55, closingStock: 35, valuationRate: 98000, totalValue: 3430000, godown: 'Bengaluru Tech Hub', batchNo: 'B2025-04', expiryDate: 'N/A' },
  { id: 'SKU-003', name: 'VNV Tally Gateway Connector Dongle', sku: 'HARD-VNV-GW', hsn: '84718000', unit: 'Units', openingStock: 120, inward: 500, outward: 410, closingStock: 210, valuationRate: 4500, totalValue: 945000, godown: 'Mumbai Central Godown', batchNo: 'VNV-2025-01', expiryDate: '2030-01-01' },
  { id: 'SKU-004', name: 'HP ZBook Studio Workstation Laptop', sku: 'LAP-HP-ZBOOK', hsn: '84713010', unit: 'Pcs', openingStock: 25, inward: 45, outward: 52, closingStock: 18, valuationRate: 145000, totalValue: 2610000, godown: 'Gurugram North Warehouse', batchNo: 'HP-B990', expiryDate: '2027-06-30' },
  { id: 'SKU-005', name: 'APC Smart-UPS RT 10000VA 230V', sku: 'PWR-APC-10K', hsn: '85044090', unit: 'Units', openingStock: 10, inward: 20, outward: 18, closingStock: 12, valuationRate: 180000, totalValue: 2160000, godown: 'Bengaluru Tech Hub', batchNo: 'APC-2025-X', expiryDate: '2029-05-15' },
  { id: 'SKU-006', name: 'Samsung 34" Curved UltraWide Monitor', sku: 'MON-SAM-34', hsn: '85285200', unit: 'Pcs', openingStock: 40, inward: 80, outward: 74, closingStock: 46, valuationRate: 42000, totalValue: 1932000, godown: 'Mumbai Central Godown', batchNo: 'SAM-M88', expiryDate: 'N/A' },
];

// Monthly Sales & Purchase Aggregates for Charts
export const monthlyFinancialChartData = [
  { month: 'Apr 25', sales: 4200000, purchase: 3100000, cashflow: 1100000, profit: 950000 },
  { month: 'May 25', sales: 4800000, purchase: 3400000, cashflow: 1400000, profit: 1120000 },
  { month: 'Jun 25', sales: 5100000, purchase: 3800000, cashflow: 1300000, profit: 1050000 },
  { month: 'Jul 25', sales: 5900000, purchase: 4100000, cashflow: 1800000, profit: 1420000 },
  { month: 'Aug 25', sales: 6400000, purchase: 4500000, cashflow: 1900000, profit: 1580000 },
  { month: 'Sep 25', sales: 6100000, purchase: 4200000, cashflow: 1900000, profit: 1490000 },
  { month: 'Oct 25', sales: 7200000, purchase: 4900000, cashflow: 2300000, profit: 1850000 },
  { month: 'Nov 25', sales: 6900000, purchase: 4600000, cashflow: 2300000, profit: 1780000 },
  { month: 'Dec 25', sales: 8100000, purchase: 5200000, cashflow: 2900000, profit: 2310000 },
  { month: 'Jan 26', sales: 7800000, purchase: 5100000, cashflow: 2700000, profit: 2150000 },
  { month: 'Feb 26', sales: 8400000, purchase: 5500000, cashflow: 2900000, profit: 2400000 },
  { month: 'Mar 26', sales: 9500000, purchase: 6100000, cashflow: 3400000, profit: 2850000 },
];

export const expenseBreakdownData = [
  { name: 'Engineering & R&D', value: 21500000, color: '#3B82F6' },
  { name: 'Cloud Infrastructure & Server', value: 8400000, color: '#10B981' },
  { name: 'Sales & Marketing', value: 4200000, color: '#F59E0B' },
  { name: 'Office Rent & Administrative', value: 3600000, color: '#8B5CF6' },
  { name: 'Legal & Professional', value: 1800000, color: '#EC4899' },
];

export const receivableAgingData = [
  { range: '0-30 Days', amount: 2450000, percentage: 48 },
  { range: '31-60 Days', amount: 1420000, percentage: 28 },
  { range: '61-90 Days', amount: 810000, percentage: 16 },
  { range: '90+ Days', amount: 410000, percentage: 8 },
];

export const payableAgingData = [
  { range: '0-30 Days', amount: 1850000, percentage: 45 },
  { range: '31-60 Days', amount: 1200000, percentage: 29 },
  { range: '61-90 Days', amount: 680000, percentage: 17 },
  { range: '90+ Days', amount: 360000, percentage: 9 },
];

export const aiFinancialInsights = [
  {
    type: 'positive',
    title: 'Outstanding Collection Velocity Improved',
    description: 'Receivables aging under 30 days increased by 14% this month, driven by automated WhatsApp reminder dispatches to Apex Global & Pinnacle Solutions.',
    impact: 'High',
  },
  {
    type: 'warning',
    title: 'Cloud Infrastructure Expense Variance Alert',
    description: 'AWS / Cloud hosting costs spiked 18% above budgeted variance. Review unused staging environments or elastic compute instances.',
    impact: 'Medium',
  },
  {
    type: 'info',
    title: 'GST Input Tax Credit Reconciliation Ready',
    description: 'Matched GSTR-2B vs Purchase Register with 98.4% accuracy. Unclaimed ITC of ₹1,42,500 available for current month return filing.',
    impact: 'Medium',
  },
  {
    type: 'positive',
    title: 'Working Capital Health Ratio',
    description: 'Current Ratio stands strong at 2.45 with Net Cash Reserves of ₹1.32 Cr. Ideal liquidity window to procure annual server inventory stock.',
    impact: 'High',
  },
];
