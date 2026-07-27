import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { BalanceSheetView } from './components/reports/BalanceSheetView';
import { ProfitLossView } from './components/reports/ProfitLossView';
import { TrialBalanceView } from './components/reports/TrialBalanceView';
import { CashFlowView } from './components/reports/CashFlowView';
import { LedgerView } from './components/reports/LedgerView';
import { SalesPurchaseRegisterView } from './components/reports/SalesPurchaseRegisterView';
import { GSTReportsView } from './components/gst/GSTReportsView';
import { InventoryView } from './components/inventory/InventoryView';
import { OutstandingView } from './components/outstanding/OutstandingView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { BudgetVsActualView } from './components/reports/BudgetVsActualView';
import { UserManagementView } from './components/management/UserManagementView';
import { CompanyManagementView } from './components/management/CompanyManagementView';
import { SubscriptionView } from './components/subscription/SubscriptionView';
import { NotificationsView } from './components/notifications/NotificationsView';
import { SettingsView } from './components/settings/SettingsView';
import { WindowsAgentView } from './components/agent/WindowsAgentView';
import { AdminPortalView } from './components/admin/AdminPortalView';
import { AgentStatusView } from './components/admin/AgentStatusView';
import { ApiDocsView } from './components/docs/ApiDocsView';
import { HelpCenterView } from './components/support/HelpCenterView';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, toasts, removeToast } = useApp();

  if (activeView === 'landing') {
    return <LandingPage />;
  }

  if (activeView === 'login') {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-slate-950">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'balance-sheet' && <BalanceSheetView />}
          {activeView === 'profit-loss' && <ProfitLossView />}
          {activeView === 'trial-balance' && <TrialBalanceView />}
          {activeView === 'cash-flow' && <CashFlowView />}
          {activeView === 'ledger' && <LedgerView />}
          {(activeView === 'sales-register' || activeView === 'purchase-register' || activeView === 'day-book') && <SalesPurchaseRegisterView />}
          {activeView === 'gst-reports' && <GSTReportsView />}
          {activeView === 'inventory' && <InventoryView />}
          {activeView === 'outstanding' && <OutstandingView />}
          {activeView === 'analytics' && <AnalyticsView />}
          {activeView === 'budget-vs-actual' && <BudgetVsActualView />}
          {activeView === 'cost-centres' && <BudgetVsActualView />}
          {activeView === 'user-management' && <UserManagementView />}
          {activeView === 'company-management' && <CompanyManagementView />}
          {activeView === 'subscription' && <SubscriptionView />}
          {activeView === 'notifications' && <NotificationsView />}
          {activeView === 'settings' && <SettingsView />}
          {activeView === 'windows-agent' && <WindowsAgentView />}
          {activeView === 'admin-portal' && <AdminPortalView />}
          {activeView === 'agent-status' && <AgentStatusView />}
          {activeView === 'api-docs' && <ApiDocsView />}
          {activeView === 'help-center' && <HelpCenterView />}
        </main>
      </div>

      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 space-y-2 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-3 rounded-xl shadow-2xl border flex items-center justify-between space-x-3 text-xs font-semibold backdrop-blur-xl transition-all animate-bounce-short ${
              toast.type === 'success'
                ? 'bg-slate-900/90 border-emerald-500/50 text-emerald-300'
                : toast.type === 'error'
                ? 'bg-slate-900/90 border-rose-500/50 text-rose-300'
                : toast.type === 'warning'
                ? 'bg-slate-900/90 border-amber-500/50 text-amber-300'
                : 'bg-slate-900/90 border-blue-500/50 text-blue-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
              {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
              {toast.type === 'error' && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
              <span>{toast.text}</span>
            </div>
            <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
