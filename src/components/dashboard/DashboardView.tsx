import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  monthlyFinancialChartData,
  expenseBreakdownData,
  receivableAgingData,
  customersData,
  suppliersData,
} from '../../data/mockData';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building,
  CreditCard,
  PieChart as PieIcon,
  Users,
  ShoppingBag,
  Package,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  FileSpreadsheet,
  Printer,
  Sparkles,
  RefreshCw,
  Zap,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart as RePieChart,
  Pie,
  Cell,
} from 'recharts';

export const DashboardView: React.FC = () => {
  const {
    selectedCompany,
    selectedFY,
    addToast,
    setActiveView,
    financialData,
    isSyncing,
    justSynced,
    syncProgressPercent,
    syncStageMessage,
    recentDeltaSales,
    recentDeltaPurchase,
    recentDeltaBank,
    triggerSyncNow,
  } = useApp();

  const kpiCards = [
    {
      title: 'Total Sales (YTD)',
      value: `₹ ${financialData.totalSales.toLocaleString('en-IN')}`,
      change: '+18.4%',
      isPositive: true,
      icon: TrendingUp,
      color: 'from-blue-600 to-indigo-600',
      badge: justSynced ? `+₹ ${(recentDeltaSales / 100000).toFixed(1)}L Tally Inflow` : null,
    },
    {
      title: 'Total Purchase',
      value: `₹ ${financialData.totalPurchase.toLocaleString('en-IN')}`,
      change: '+12.1%',
      isPositive: true,
      icon: ShoppingBag,
      color: 'from-purple-600 to-indigo-600',
      badge: justSynced ? `+₹ ${(recentDeltaPurchase / 100000).toFixed(1)}L Tally Ingested` : null,
    },
    {
      title: 'Cash Balance',
      value: `₹ ${financialData.cashBalance.toLocaleString('en-IN')}`,
      change: '+5.2%',
      isPositive: true,
      icon: DollarSign,
      color: 'from-emerald-600 to-teal-600',
    },
    {
      title: 'Bank Balance',
      value: `₹ ${financialData.bankBalance.toLocaleString('en-IN')}`,
      change: '+22.1%',
      isPositive: true,
      icon: Building,
      color: 'from-cyan-600 to-blue-600',
      badge: justSynced ? `+₹ ${(recentDeltaBank / 100000).toFixed(1)}L Bank Inflow` : null,
    },
    {
      title: 'Net Profit',
      value: `₹ ${financialData.netProfit.toLocaleString('en-IN')}`,
      change: '+24.5%',
      isPositive: true,
      icon: Activity,
      color: 'from-emerald-600 to-green-600',
      badge: justSynced ? `+₹ 14.2L Margin Gain` : null,
    },
    {
      title: 'Receivables (Due)',
      value: `₹ ${financialData.receivable.toLocaleString('en-IN')}`,
      change: '-4.1%',
      isPositive: true,
      icon: CreditCard,
      color: 'from-amber-600 to-yellow-600',
    },
    {
      title: 'Payables (Due)',
      value: `₹ ${financialData.payable.toLocaleString('en-IN')}`,
      change: '+2.8%',
      isPositive: false,
      icon: CreditCard,
      color: 'from-rose-600 to-pink-600',
    },
    {
      title: 'Total Expenses',
      value: `₹ ${financialData.expenses.toLocaleString('en-IN')}`,
      change: '+9.3%',
      isPositive: false,
      icon: PieIcon,
      color: 'from-indigo-600 to-purple-600',
    },
    {
      title: 'Working Capital',
      value: `₹ ${financialData.workingCapital.toLocaleString('en-IN')}`,
      change: '+15.8%',
      isPositive: true,
      icon: Sparkles,
      color: 'from-teal-600 to-emerald-600',
    },
    {
      title: 'Inventory Stock Value',
      value: `₹ ${financialData.inventoryValue.toLocaleString('en-IN')}`,
      change: '+8.0%',
      isPositive: true,
      icon: Package,
      color: 'from-blue-600 to-cyan-600',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Live Sync Progress / Values Ingestion Bar */}
      {isSyncing && (
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-2 border-blue-400/80 p-4 rounded-2xl shadow-2xl animate-pulse text-white space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
              <span>{syncStageMessage}</span>
            </div>
            <span className="font-mono text-cyan-300 font-extrabold text-sm">{syncProgressPercent}%</span>
          </div>
          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-700">
            <div
              className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${syncProgressPercent}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Just Synced Banner */}
      {justSynced && !isSyncing && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-2 border-emerald-500/60 p-4 rounded-2xl shadow-2xl flex items-center justify-between text-emerald-300 animate-bounce-short">
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-xs font-bold text-white">Tally Value Changes Live Update</h2>
              <p className="text-[11px] text-emerald-300">
                +73 Vouchers Synced from Tally Prime! Total Sales updated to <span className="font-mono font-bold text-white">₹ {(financialData.totalSales/100000).toFixed(1)}L</span>, Bank Balance updated to <span className="font-mono font-bold text-white">₹ {(financialData.bankBalance/100000).toFixed(1)}L</span>.
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-500/20 px-3 py-1 rounded-full text-emerald-200 font-extrabold uppercase">
            Live Tally Ingestion Active
          </span>
        </div>
      )}

      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-400">
            <span>{selectedCompany}</span>
            <span>•</span>
            <span className="text-slate-400">{selectedFY}</span>
            <span>•</span>
            <span className="text-emerald-400 font-mono font-bold">{financialData.totalVouchersCount} Vouchers Synced</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-1">
            Financial MIS Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time financial telemetry synced live from Tally Prime Windows Agent.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={triggerSyncNow}
            disabled={isSyncing}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/30 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Sync Values from Tally</span>
          </button>
          <button
            onClick={() => addToast('Exporting Dashboard Summary PDF...', 'info')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => addToast('Exporting Financial Metrics Excel sheet...', 'info')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* 10 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          const isHighlighted = justSynced && kpi.badge;

          return (
            <div
              key={idx}
              className={`bg-slate-900/90 border p-4 rounded-xl shadow-lg transition-all group relative overflow-hidden ${
                isHighlighted
                  ? 'border-emerald-400 ring-2 ring-emerald-500/50 bg-slate-900 scale-105'
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide truncate">
                  {kpi.title}
                </span>
                <div className={`p-2 rounded-lg bg-gradient-to-tr ${kpi.color} text-white shadow-md`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="mt-3">
                <div className={`text-lg font-extrabold tracking-tight transition-colors ${isHighlighted ? 'text-emerald-300' : 'text-white'}`}>
                  {kpi.value}
                </div>

                {kpi.badge ? (
                  <div className="mt-1 text-[10px] font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full w-fit animate-pulse">
                    {kpi.badge}
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 mt-1 text-[11px]">
                    {kpi.isPositive ? (
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5 text-rose-400" />
                    )}
                    <span className={kpi.isPositive ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                      {kpi.change}
                    </span>
                    <span className="text-slate-500 font-normal">vs last month</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1: Sales vs Purchase Trend & Expense Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Sales & Purchases Comparison Bar Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">Monthly Sales vs Purchases</h2>
              <p className="text-xs text-slate-400">Comparing gross turnover against procurement costs (Updated from Tally)</p>
            </div>
            <button
              onClick={() => setActiveView('sales-register')}
              className="text-xs text-blue-400 hover:underline font-semibold"
            >
              View Sales Register &rarr;
            </button>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyFinancialChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis
                  stroke="#64748b"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(val) => `₹${val / 100000}L`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  formatter={(value: any) => [`₹ ${Number(value).toLocaleString()}`, '']}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="sales" name="Gross Sales" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="purchase" name="Gross Purchase" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Pie Chart */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white">Expense Distribution</h2>
              <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400">YTD</span>
            </div>
            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={expenseBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {expenseBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                    formatter={(value: any) => [`₹ ${Number(value).toLocaleString()}`, '']}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-2 mt-2">
            {expenseBreakdownData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-300 font-medium">{item.name}</span>
                </div>
                <span className="text-slate-200 font-bold">₹ {(item.value / 100000).toFixed(1)}L</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
