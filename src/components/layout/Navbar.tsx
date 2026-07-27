import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import {
  Building2,
  Calendar,
  RefreshCw,
  Sun,
  Moon,
  Bell,
  User,
  Monitor,
  ShieldAlert,
  Globe,
  FileCode,
  HelpCircle,
  LogOut,
  ChevronDown,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
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
    isSyncing,
    triggerSyncNow,
    lastSyncTime,
    addToast,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showModeMenu, setShowModeMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'Tally Sync Success', desc: '500 Sales vouchers synced from Host PC-01', time: '10 mins ago', type: 'success' },
    { id: 2, title: 'GSTR-3B Variance Alert', desc: 'Output CGST differs by ₹4,200 in March 2026', time: '1 hour ago', type: 'warning' },
    { id: 3, title: 'WhatsApp Reminder Delivered', desc: 'Payment reminder sent to Apex Global', time: '3 hours ago', type: 'info' },
  ];

  const viewsList: { id: AppView; label: string; icon: any; color: string }[] = [
    { id: 'dashboard', label: 'Financial MIS Portal', icon: Sparkles, color: 'text-blue-500' },
    { id: 'windows-agent', label: 'Windows Sync Agent', icon: Monitor, color: 'text-emerald-500' },
    { id: 'admin-portal', label: 'Admin Portal', icon: ShieldAlert, color: 'text-purple-500' },
    { id: 'landing', label: 'Landing Page', icon: Globe, color: 'text-indigo-500' },
    { id: 'api-docs', label: 'API Documentation', icon: FileCode, color: 'text-amber-500' },
    { id: 'help-center', label: 'Help Center', icon: HelpCircle, color: 'text-cyan-500' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 px-4 py-2.5 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Brand & Global View Switcher */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveView('landing')}
            className="flex items-center space-x-2.5 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-tr from-blue-400 to-cyan-300 text-lg">
                VNV
              </div>
            </div>
            <div className="text-left hidden sm:block">
              <div className="font-bold text-base tracking-tight leading-none text-white group-hover:text-blue-400 transition-colors">
                VNV Financial MIS
              </div>
              <div className="text-[10px] text-slate-400 font-medium tracking-wide">ENTERPRISE TALLY AGENT SaaS</div>
            </div>
          </button>

          {/* Quick Workspace View Switcher Button */}
          <div className="relative">
            <button
              onClick={() => setShowModeMenu(!showModeMenu)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-xs font-semibold text-slate-200 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>
                {viewsList.find((v) => v.id === activeView)?.label || 'Financial MIS Portal'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showModeMenu && (
              <div className="absolute left-0 mt-2 w-56 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl z-50 py-1.5 backdrop-blur-xl">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch App View
                </div>
                {viewsList.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveView(item.id);
                        setShowModeMenu(false);
                      }}
                      className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs text-left hover:bg-slate-800 transition-colors ${
                        activeView === item.id ? 'bg-slate-800 font-semibold text-blue-400' : 'text-slate-300'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Center Control Badges: Company & FY Switcher */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Company Switcher */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <select
              value={selectedCompany}
              onChange={(e) => {
                setSelectedCompany(e.target.value);
                addToast(`Switched active company to ${e.target.value}`, 'info');
              }}
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="VNV Tech Solutions Pvt Ltd" className="bg-slate-900 text-slate-200">
                VNV Tech Solutions Pvt Ltd
              </option>
              <option value="VNV Global Inc" className="bg-slate-900 text-slate-200">
                VNV Global Inc
              </option>
              <option value="VNV Enterprises" className="bg-slate-900 text-slate-200">
                VNV Enterprises
              </option>
            </select>
          </div>

          {/* Financial Year Switcher */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <select
              value={selectedFY}
              onChange={(e) => {
                setSelectedFY(e.target.value);
                addToast(`Financial Year changed to ${e.target.value}`, 'info');
              }}
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="FY 2025-26" className="bg-slate-900 text-slate-200">
                FY 2025-26 (Current)
              </option>
              <option value="FY 2024-25" className="bg-slate-900 text-slate-200">
                FY 2024-25
              </option>
              <option value="FY 2023-24" className="bg-slate-900 text-slate-200">
                FY 2023-24
              </option>
            </select>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-2.5">
          {/* Tally Sync Now Button */}
          <button
            onClick={triggerSyncNow}
            disabled={isSyncing}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all shadow-sm ${
              isSyncing
                ? 'bg-blue-600/50 text-blue-200 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/25'
            }`}
            title={`Last Synced: ${lastSyncTime}`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-cyan-300' : ''}`} />
            <span>{isSyncing ? 'Syncing Tally...' : 'Sync Now'}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white transition-colors"
            title="Toggle Light / Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
          </button>

          {/* Notifications Center Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white relative transition-colors"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-slate-900"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl z-50 p-3 backdrop-blur-xl">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-200">System Notifications</span>
                  <span className="text-[10px] text-blue-400 hover:underline cursor-pointer">Mark all read</span>
                </div>
                <div className="divide-y divide-slate-800 max-h-64 overflow-y-auto mt-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="py-2 px-1 hover:bg-slate-800/50 rounded-lg transition-colors">
                      <div className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-slate-200">{n.title}</p>
                          <p className="text-[11px] text-slate-400">{n.desc}</p>
                          <span className="text-[9px] text-slate-500 mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
                AD
              </div>
              <span className="text-xs font-medium hidden md:inline">{userRole}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl z-50 py-1.5">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-xs font-bold text-white">Administrator</p>
                  <p className="text-[10px] text-slate-400">admin@vnvfinancial.com</p>
                </div>
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Role
                </div>
                {(['Admin', 'Accountant', 'Auditor', 'Viewer'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setUserRole(r);
                      setShowProfileMenu(false);
                      addToast(`Switched active role to ${r}`, 'info');
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-800 flex items-center justify-between ${
                      userRole === r ? 'text-blue-400 font-semibold' : 'text-slate-300'
                    }`}
                  >
                    <span>{r}</span>
                    {userRole === r && <CheckCircle2 className="w-3 h-3 text-blue-400" />}
                  </button>
                ))}
                <div className="border-t border-slate-800 mt-1 pt-1">
                  <button
                    onClick={() => {
                      setActiveView('login');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-950/30 flex items-center space-x-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
