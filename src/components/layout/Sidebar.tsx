import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import {
  LayoutDashboard,
  TrendingUp,
  Scale,
  PieChart,
  FileSpreadsheet,
  ArrowLeftRight,
  BookOpen,
  Receipt,
  ShoppingBag,
  Package,
  FileCheck2,
  Clock,
  Users,
  Building,
  CreditCard,
  Bell,
  Settings,
  Monitor,
  Shield,
  Activity,
  Code2,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(true);
  const [operationsOpen, setOperationsOpen] = useState(true);
  const [adminOpen, setAdminOpen] = useState(true);

  const navItemClass = (view: AppView) =>
    `flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
      activeView === view
        ? 'bg-blue-600/90 text-white shadow-md shadow-blue-500/20 font-semibold'
        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
    }`;

  return (
    <aside
      className={`bg-slate-900 border-r border-slate-800 text-slate-200 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Sidebar Header Toggle */}
      <div className="p-3 border-b border-slate-800 flex items-center justify-between">
        {!collapsed && (
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Navigation Menu
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white ml-auto transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-4">
        {/* Core Dashboard Group */}
        <div>
          {!collapsed && (
            <div className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Core Overview
            </div>
          )}
          <div className="space-y-1 mt-1">
            <button onClick={() => setActiveView('dashboard')} className={navItemClass('dashboard')}>
              <LayoutDashboard className="w-4 h-4 text-blue-400 shrink-0" />
              {!collapsed && <span>Financial Dashboard</span>}
            </button>
            <button onClick={() => setActiveView('analytics')} className={navItemClass('analytics')}>
              <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
              {!collapsed && (
                <div className="flex items-center justify-between w-full">
                  <span>Analytics & AI</span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                    AI
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Financial Reports Suite */}
        <div>
          {!collapsed ? (
            <button
              onClick={() => setReportsOpen(!reportsOpen)}
              className="w-full flex items-center justify-between px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider hover:text-slate-300"
            >
              <span>Financial Reports</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${reportsOpen ? '' : '-rotate-90'}`} />
            </button>
          ) : (
            <div className="border-t border-slate-800 my-2"></div>
          )}

          {(reportsOpen || collapsed) && (
            <div className="space-y-1 mt-1">
              <button onClick={() => setActiveView('balance-sheet')} className={navItemClass('balance-sheet')}>
                <Scale className="w-4 h-4 text-indigo-400 shrink-0" />
                {!collapsed && <span>Balance Sheet</span>}
              </button>

              <button onClick={() => setActiveView('profit-loss')} className={navItemClass('profit-loss')}>
                <PieChart className="w-4 h-4 text-purple-400 shrink-0" />
                {!collapsed && <span>Profit & Loss</span>}
              </button>

              <button onClick={() => setActiveView('trial-balance')} className={navItemClass('trial-balance')}>
                <FileSpreadsheet className="w-4 h-4 text-amber-400 shrink-0" />
                {!collapsed && <span>Trial Balance</span>}
              </button>

              <button onClick={() => setActiveView('cash-flow')} className={navItemClass('cash-flow')}>
                <ArrowLeftRight className="w-4 h-4 text-cyan-400 shrink-0" />
                {!collapsed && <span>Cash Flow</span>}
              </button>

              <button onClick={() => setActiveView('ledger')} className={navItemClass('ledger')}>
                <BookOpen className="w-4 h-4 text-rose-400 shrink-0" />
                {!collapsed && <span>Ledgers & Daybook</span>}
              </button>

              <button onClick={() => setActiveView('sales-register')} className={navItemClass('sales-register')}>
                <Receipt className="w-4 h-4 text-teal-400 shrink-0" />
                {!collapsed && <span>Sales Register</span>}
              </button>

              <button onClick={() => setActiveView('purchase-register')} className={navItemClass('purchase-register')}>
                <ShoppingBag className="w-4 h-4 text-orange-400 shrink-0" />
                {!collapsed && <span>Purchase Register</span>}
              </button>

              <button onClick={() => setActiveView('budget-vs-actual')} className={navItemClass('budget-vs-actual')}>
                <Sparkles className="w-4 h-4 text-violet-400 shrink-0" />
                {!collapsed && <span>Budget vs Actual</span>}
              </button>
            </div>
          )}
        </div>

        {/* Operations & Tax */}
        <div>
          {!collapsed ? (
            <button
              onClick={() => setOperationsOpen(!operationsOpen)}
              className="w-full flex items-center justify-between px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider hover:text-slate-300"
            >
              <span>Operations & GST</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${operationsOpen ? '' : '-rotate-90'}`} />
            </button>
          ) : (
            <div className="border-t border-slate-800 my-2"></div>
          )}

          {(operationsOpen || collapsed) && (
            <div className="space-y-1 mt-1">
              <button onClick={() => setActiveView('inventory')} className={navItemClass('inventory')}>
                <Package className="w-4 h-4 text-emerald-400 shrink-0" />
                {!collapsed && <span>Inventory & Stock</span>}
              </button>

              <button onClick={() => setActiveView('gst-reports')} className={navItemClass('gst-reports')}>
                <FileCheck2 className="w-4 h-4 text-blue-400 shrink-0" />
                {!collapsed && <span>GST Compliance</span>}
              </button>

              <button onClick={() => setActiveView('outstanding')} className={navItemClass('outstanding')}>
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                {!collapsed && <span>Outstanding Aging</span>}
              </button>
            </div>
          )}
        </div>

        {/* System & Management */}
        <div>
          {!collapsed ? (
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              className="w-full flex items-center justify-between px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider hover:text-slate-300"
            >
              <span>Administration</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${adminOpen ? '' : '-rotate-90'}`} />
            </button>
          ) : (
            <div className="border-t border-slate-800 my-2"></div>
          )}

          {(adminOpen || collapsed) && (
            <div className="space-y-1 mt-1">
              <button onClick={() => setActiveView('user-management')} className={navItemClass('user-management')}>
                <Users className="w-4 h-4 text-indigo-400 shrink-0" />
                {!collapsed && <span>Users & Roles</span>}
              </button>

              <button onClick={() => setActiveView('company-management')} className={navItemClass('company-management')}>
                <Building className="w-4 h-4 text-cyan-400 shrink-0" />
                {!collapsed && <span>Company Manager</span>}
              </button>

              <button onClick={() => setActiveView('subscription')} className={navItemClass('subscription')}>
                <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
                {!collapsed && <span>Subscription Plan</span>}
              </button>

              <button onClick={() => setActiveView('notifications')} className={navItemClass('notifications')}>
                <Bell className="w-4 h-4 text-yellow-400 shrink-0" />
                {!collapsed && <span>Notification Dispatch</span>}
              </button>

              <button onClick={() => setActiveView('settings')} className={navItemClass('settings')}>
                <Settings className="w-4 h-4 text-slate-400 shrink-0" />
                {!collapsed && <span>System Settings</span>}
              </button>
            </div>
          )}
        </div>

        {/* Windows Sync Desktop EXE App Section */}
        <div className="pt-2 border-t border-slate-800">
          {!collapsed && (
            <div className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Tally Client & Cloud Admin
            </div>
          )}
          <div className="space-y-1 mt-1">
            <button
              onClick={() => setActiveView('windows-agent')}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600/30 to-indigo-600/30 hover:from-blue-600/50 hover:to-indigo-600/50 text-blue-300 border border-blue-500/30 transition-all"
            >
              <Monitor className="w-4 h-4 text-blue-400 shrink-0" />
              {!collapsed && <span>Windows Desktop Agent</span>}
            </button>

            <button onClick={() => setActiveView('admin-portal')} className={navItemClass('admin-portal')}>
              <Shield className="w-4 h-4 text-purple-400 shrink-0" />
              {!collapsed && <span>Cloud Admin Portal</span>}
            </button>

            <button onClick={() => setActiveView('agent-status')} className={navItemClass('agent-status')}>
              <Activity className="w-4 h-4 text-green-400 shrink-0" />
              {!collapsed && <span>Agent Telemetries</span>}
            </button>

            <button onClick={() => setActiveView('api-docs')} className={navItemClass('api-docs')}>
              <Code2 className="w-4 h-4 text-amber-400 shrink-0" />
              {!collapsed && <span>API Documentation</span>}
            </button>

            <button onClick={() => setActiveView('help-center')} className={navItemClass('help-center')}>
              <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
              {!collapsed && <span>Help Center & KB</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Footer Windows Agent Quick Status Card */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 m-2 rounded-xl text-slate-300">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-semibold text-slate-200">Tally Agent v3.4.1</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Host: ACCOUNTS-PC01</p>
          <button
            onClick={() => setActiveView('windows-agent')}
            className="w-full mt-2 py-1 text-[10px] bg-slate-800 hover:bg-slate-700 text-blue-400 font-medium rounded transition-colors"
          >
            Launch Agent UI &rarr;
          </button>
        </div>
      )}
    </aside>
  );
};
