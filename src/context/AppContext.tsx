import React, { createContext, useContext, useState } from 'react';

export type AppView = 
  | 'landing'
  | 'login'
  | 'dashboard'
  | 'balance-sheet'
  | 'profit-loss'
  | 'trial-balance'
  | 'cash-flow'
  | 'day-book'
  | 'ledger'
  | 'sales-register'
  | 'purchase-register'
  | 'gst-reports'
  | 'inventory'
  | 'outstanding'
  | 'analytics'
  | 'budget-vs-actual'
  | 'cost-centres'
  | 'user-management'
  | 'company-management'
  | 'subscription'
  | 'notifications'
  | 'settings'
  | 'windows-agent'
  | 'admin-portal'
  | 'agent-status'
  | 'api-docs'
  | 'help-center';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  text: string;
}

export interface LiveFinancialData {
  totalSales: number;
  totalPurchase: number;
  cashBalance: number;
  bankBalance: number;
  netProfit: number;
  receivable: number;
  payable: number;
  expenses: number;
  workingCapital: number;
  inventoryValue: number;
  totalVouchersCount: number;
}

interface AppContextType {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  selectedCompany: string;
  setSelectedCompany: (company: string) => void;
  selectedFY: string;
  setSelectedFY: (fy: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  userRole: 'Admin' | 'Accountant' | 'Auditor' | 'Viewer';
  setUserRole: (role: 'Admin' | 'Accountant' | 'Auditor' | 'Viewer') => void;
  toasts: ToastMessage[];
  addToast: (text: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSyncing: boolean;
  setIsSyncing: (syncing: boolean) => void;
  lastSyncTime: string;
  setLastSyncTime: (time: string) => void;
  triggerSyncNow: () => void;
  
  // Live Syncing Stream Metrics
  financialData: LiveFinancialData;
  syncProgressPercent: number;
  syncStageMessage: string;
  justSynced: boolean;
  recentDeltaSales: number;
  recentDeltaPurchase: number;
  recentDeltaBank: number;
  recentDeltaVouchers: number;
  liveSyncLogs: { time: string; text: string; type: 'info' | 'success' | 'tally' }[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const [selectedCompany, setSelectedCompany] = useState<string>('VNV Tech Solutions Pvt Ltd');
  const [selectedFY, setSelectedFY] = useState<string>('FY 2025-26');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<'Admin' | 'Accountant' | 'Auditor' | 'Viewer'>('Admin');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('2026-07-21 16:40:12');

  // Live Dynamic Tally Financial Data State
  const [financialData, setFinancialData] = useState<LiveFinancialData>({
    totalSales: 83600000,
    totalPurchase: 56100000,
    cashBalance: 240000,
    bankBalance: 13200000,
    netProfit: 22400000,
    receivable: 5090000,
    payable: 4090000,
    expenses: 39500000,
    workingCapital: 28500000,
    inventoryValue: 16912000,
    totalVouchersCount: 1000,
  });

  const [syncProgressPercent, setSyncProgressPercent] = useState<number>(0);
  const [syncStageMessage, setSyncStageMessage] = useState<string>('');
  const [justSynced, setJustSynced] = useState<boolean>(false);
  const [recentDeltaSales, setRecentDeltaSales] = useState<number>(0);
  const [recentDeltaPurchase, setRecentDeltaPurchase] = useState<number>(0);
  const [recentDeltaBank, setRecentDeltaBank] = useState<number>(0);
  const [recentDeltaVouchers, setRecentDeltaVouchers] = useState<number>(0);

  const [liveSyncLogs, setLiveSyncLogs] = useState<{ time: string; text: string; type: 'info' | 'success' | 'tally' }[]>([
    { time: '16:40:12', text: 'Tally Agent Service listening on Port 9000', type: 'info' },
  ]);

  const addToast = (text: string, type: ToastMessage['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addSyncLog = (text: string, type: 'info' | 'success' | 'tally' = 'tally') => {
    const time = new Date().toTimeString().substring(0, 8);
    setLiveSyncLogs((prev) => [{ time, text, type }, ...prev.slice(0, 19)]);
  };

  const triggerSyncNow = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setJustSynced(false);
    setSyncProgressPercent(10);
    setSyncStageMessage('Connecting to Tally Prime XML HTTP Port 9000...');
    addToast('Connecting to Tally Prime Client Agent on Port 9000...', 'info');
    addSyncLog('Initiating Live Sync with Tally Prime Client Workstation (Host: ACCOUNTS-DESKTOP-01)', 'info');

    // Stage 1: Ingest Sales (at 1.0s)
    setTimeout(() => {
      setSyncProgressPercent(35);
      setSyncStageMessage('Ingesting 48 New Sales Invoices from Tally...');
      const deltaSales = 3850000; // +₹38.5 Lakhs
      const deltaVouchers = 48;
      
      setFinancialData((prev) => ({
        ...prev,
        totalSales: prev.totalSales + deltaSales,
        receivable: prev.receivable + 1250000,
        netProfit: prev.netProfit + 1420000,
        totalVouchersCount: prev.totalVouchersCount + deltaVouchers,
      }));
      setRecentDeltaSales(deltaSales);
      setRecentDeltaVouchers((prev) => prev + deltaVouchers);
      addSyncLog(`[Tally Ingestion] Ingested 48 Sales Vouchers (+₹ 38,50,000)`, 'tally');
    }, 1000);

    // Stage 2: Ingest Purchases & Bank Entries (at 2.2s)
    setTimeout(() => {
      setSyncProgressPercent(70);
      setSyncStageMessage('Ingesting 25 New Purchase Bills & Reconciling HDFC Bank Receipts...');
      const deltaPurchase = 2210000; // +₹22.1 Lakhs
      const deltaBank = 1640000; // +₹16.4 Lakhs
      const deltaVouchers = 25;

      setFinancialData((prev) => ({
        ...prev,
        totalPurchase: prev.totalPurchase + deltaPurchase,
        bankBalance: prev.bankBalance + deltaBank,
        payable: prev.payable + 850000,
        totalVouchersCount: prev.totalVouchersCount + deltaVouchers,
      }));
      setRecentDeltaPurchase(deltaPurchase);
      setRecentDeltaBank(deltaBank);
      setRecentDeltaVouchers((prev) => prev + deltaVouchers);
      addSyncLog(`[Tally Ingestion] Ingested 25 Purchase Bills (+₹ 22,10,000) & Bank Receipts (+₹ 16,40,000)`, 'tally');
    }, 2200);

    // Stage 3: Finalize & Publish to Cloud (at 3.4s)
    setTimeout(() => {
      setSyncProgressPercent(100);
      setSyncStageMessage('Finalizing Cloud MIS Ledger Aggregates...');
      setIsSyncing(false);
      setJustSynced(true);
      const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
      setLastSyncTime(nowStr);
      addSyncLog('Tally Sync Completed! 73 new vouchers ingested & metrics published.', 'success');
      addToast('Tally Sync Complete! +73 new vouchers ingested from Tally Prime.', 'success');

      // Clear highlighted pulse effect after 8s
      setTimeout(() => {
        setJustSynced(false);
      }, 8000);
    }, 3400);
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedCompany,
        setSelectedCompany,
        selectedFY,
        setSelectedFY,
        darkMode,
        setDarkMode,
        userRole,
        setUserRole,
        toasts,
        addToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        isSyncing,
        setIsSyncing,
        lastSyncTime,
        setLastSyncTime,
        triggerSyncNow,
        financialData,
        syncProgressPercent,
        syncStageMessage,
        justSynced,
        recentDeltaSales,
        recentDeltaPurchase,
        recentDeltaBank,
        recentDeltaVouchers,
        liveSyncLogs,
      }}
    >
      <div className={darkMode ? 'dark' : ''}>{children}</div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
