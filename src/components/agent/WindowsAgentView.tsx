import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Monitor,
  RefreshCw,
  Play,
  Pause,
  RotateCcw,
  Settings,
  FileText,
  History,
  CheckCircle2,
  AlertCircle,
  HardDrive,
  Cpu,
  Download,
  X,
  Minus,
  Square,
  ShieldCheck,
  Folder,
  Key,
  Globe,
  Sparkles,
  Zap,
  Activity,
} from 'lucide-react';

export const WindowsAgentView: React.FC = () => {
  const {
    isSyncing,
    triggerSyncNow,
    lastSyncTime,
    addToast,
    financialData,
    syncProgressPercent,
    syncStageMessage,
    justSynced,
    recentDeltaSales,
    recentDeltaPurchase,
    recentDeltaBank,
    liveSyncLogs,
  } = useApp();

  const [isPaused, setIsPaused] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showInstallerModal, setShowInstallerModal] = useState(false);
  const [installerStep, setInstallerStep] = useState(1);

  // Settings State initialized with localStorage persistence
  const [serverUrl, setServerUrl] = useState(() => localStorage.getItem('vnv_agent_serverUrl') || 'https://api.vnvfinancial.com/v1');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('vnv_agent_apiKey') || 'vnv_live_8f9a00219c84711a');
  const [tallyPath, setTallyPath] = useState(() => localStorage.getItem('vnv_agent_tallyPath') || 'C:\\Program Files\\TallyPrime\\tally.exe');
  const [port, setPort] = useState(() => localStorage.getItem('vnv_agent_port') || '9000');
  const [syncEvery, setSyncEvery] = useState(() => localStorage.getItem('vnv_agent_syncEvery') || '15 Minutes');
  const [runAsService, setRunAsService] = useState(true);
  const [autoStart, setAutoStart] = useState(true);

  const saveAgentSettings = () => {
    localStorage.setItem('vnv_agent_serverUrl', serverUrl);
    localStorage.setItem('vnv_agent_apiKey', apiKey);
    localStorage.setItem('vnv_agent_tallyPath', tallyPath);
    localStorage.setItem('vnv_agent_port', port);
    localStorage.setItem('vnv_agent_syncEvery', syncEvery);
    setShowSettingsModal(false);
    addToast('Saved Agent Settings to Local Configuration & Reconnected!', 'success');
  };

  const syncHistory = [
    { date: '2026-07-21', time: '16:40:12', duration: '3.4s', uploaded: 73, failed: 0, status: 'Success' },
    { date: '2026-07-21', time: '16:25:00', duration: '2.8s', uploaded: 500, failed: 0, status: 'Success' },
    { date: '2026-07-21', time: '16:10:00', duration: '3.1s', uploaded: 498, failed: 2, status: 'Completed with warnings' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Outer Windows 11 Desktop Application Window Frame */}
      <div className="bg-slate-950 border-2 border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-200">
        {/* Windows Titlebar */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between select-none">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-[10px] font-black text-white">
              V
            </div>
            <span className="text-xs font-bold text-slate-200 tracking-wide">
              VNV Tally Sync Agent - Enterprise Client (64-bit)
            </span>
          </div>

          <div className="flex items-center space-x-3 text-slate-400">
            <button
              onClick={() => setShowInstallerModal(true)}
              className="text-[11px] font-semibold text-blue-400 hover:underline flex items-center space-x-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Run Setup Wizard</span>
            </button>
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white">
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white">
                <Square className="w-3 h-3" />
              </button>
              <button className="p-1 hover:bg-rose-900/60 rounded text-slate-400 hover:text-rose-300">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop App Main Content Area */}
        <div className="p-6 space-y-6 bg-slate-900/60">
          {/* Status Header Banner */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                  <Monitor className="w-6 h-6" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-slate-950 flex items-center justify-center text-[9px] font-black text-slate-950">
                  ✓
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] uppercase tracking-wider flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{isPaused ? 'SYNC PAUSED' : isSyncing ? 'SYNCING LIVE VALUES...' : 'CONNECTED & LISTENING'}</span>
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Port 9000</span>
                </div>
                <h1 className="text-xl font-extrabold text-white mt-1">VNV Tally Sync Agent v3.4.1</h1>
                <p className="text-xs text-slate-400">Windows Service ID: <code className="text-blue-400 font-mono">VNVTallySyncSvc</code></p>
              </div>
            </div>

            {/* Action Buttons Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={triggerSyncNow}
                disabled={isSyncing}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
              </button>

              <button
                onClick={() => {
                  setIsPaused(!isPaused);
                  addToast(isPaused ? 'Sync Agent Resumed' : 'Sync Agent Paused', 'info');
                }}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700"
              >
                {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
                <span>{isPaused ? 'Resume Sync' : 'Pause Sync'}</span>
              </button>

              <button
                onClick={() => addToast('Restarted VNV Tally Sync Windows Service', 'success')}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Restart Agent</span>
              </button>

              <button
                onClick={() => setShowSettingsModal(true)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                title="Agent Settings"
              >
                <Settings className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowLogsModal(true)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                title="View Agent Logs"
              >
                <FileText className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowHistoryModal(true)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                title="Sync History"
              >
                <History className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sync Progress Bar Simulation */}
          {isSyncing && (
            <div className="bg-slate-900 border-2 border-blue-500/60 p-4 rounded-xl space-y-2 animate-pulse">
              <div className="flex justify-between text-xs font-bold text-blue-400">
                <span className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-cyan-300 animate-spin" />
                  <span>{syncStageMessage}</span>
                </span>
                <span className="font-mono text-cyan-300 text-sm">{syncProgressPercent}%</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-300 h-full rounded-full transition-all duration-300"
                  style={{ width: `${syncProgressPercent}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Live Agent Telemetries & Ingested Tally Values Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`bg-slate-900 p-4 rounded-xl border transition-all ${justSynced ? 'border-emerald-400 ring-2 ring-emerald-500/40 bg-slate-900 scale-105' : 'border-slate-800'}`}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Synced Sales</span>
              <p className={`text-base font-extrabold mt-1 ${justSynced ? 'text-emerald-300' : 'text-white'}`}>
                ₹ {financialData.totalSales.toLocaleString('en-IN')}
              </p>
              {justSynced ? (
                <span className="text-[10px] text-emerald-400 font-bold block mt-1">+₹ {(recentDeltaSales / 100000).toFixed(1)}L Tally Stream</span>
              ) : (
                <span className="text-[10px] text-slate-500">Tally Prime Gold (v4.1)</span>
              )}
            </div>

            <div className={`bg-slate-900 p-4 rounded-xl border transition-all ${justSynced ? 'border-emerald-400 ring-2 ring-emerald-500/40 bg-slate-900 scale-105' : 'border-slate-800'}`}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Synced Purchase</span>
              <p className={`text-base font-extrabold mt-1 ${justSynced ? 'text-emerald-300' : 'text-white'}`}>
                ₹ {financialData.totalPurchase.toLocaleString('en-IN')}
              </p>
              {justSynced ? (
                <span className="text-[10px] text-emerald-400 font-bold block mt-1">+₹ {(recentDeltaPurchase / 100000).toFixed(1)}L Ingested</span>
              ) : (
                <span className="text-[10px] text-slate-500">Host: ACCOUNTS-DESKTOP-01</span>
              )}
            </div>

            <div className={`bg-slate-900 p-4 rounded-xl border transition-all ${justSynced ? 'border-emerald-400 ring-2 ring-emerald-500/40 bg-slate-900 scale-105' : 'border-slate-800'}`}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Vouchers Uploaded</span>
              <p className="text-base font-extrabold text-emerald-400 mt-1">
                {financialData.totalVouchersCount} Vouchers
              </p>
              <span className="text-[10px] text-slate-500">0 Pending Queue</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sync Frequency</span>
              <p className="text-base font-bold text-cyan-400 mt-1">{syncEvery}</p>
              <span className="text-[10px] text-slate-500">Last Sync: {lastSyncTime.substring(11)}</span>
            </div>
          </div>

          {/* Real-time Tally Live Stream Ingestion Logs */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>Live Tally Ingestion Console Feed</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Port 9000 XML Listener</span>
            </div>
            <div className="font-mono text-[11px] space-y-1.5 max-h-40 overflow-y-auto divide-y divide-slate-900">
              {liveSyncLogs.map((log, index) => (
                <div key={index} className="pt-1 flex items-center space-x-2">
                  <span className="text-slate-500">{log.time}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${log.type === 'success' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'}`}>
                    {log.type.toUpperCase()}
                  </span>
                  <span className="text-slate-200">{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <Settings className="w-4 h-4 text-blue-400" />
                <span>Agent Configuration Settings</span>
              </h2>
              <button onClick={() => setShowSettingsModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Cloud Server Endpoint URL</label>
                <input
                  type="text"
                  value={serverUrl}
                  onChange={(e) => setServerUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">API Key & License Token</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Tally Executable Path</label>
                  <input
                    type="text"
                    value={tallyPath}
                    onChange={(e) => setTallyPath(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">ODBC / HTTP Port</label>
                  <input
                    type="text"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Automatic Sync Frequency</label>
                <select
                  value={syncEvery}
                  onChange={(e) => setSyncEvery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                >
                  <option value="5 Minutes">Every 5 Minutes (Real-time)</option>
                  <option value="15 Minutes">Every 15 Minutes (Recommended)</option>
                  <option value="30 Minutes">Every 30 Minutes</option>
                  <option value="1 Hour">Every 1 Hour</option>
                </select>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="flex items-center space-x-2 text-slate-300">
                  <input
                    type="checkbox"
                    checked={runAsService}
                    onChange={(e) => setRunAsService(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                  />
                  <span>Run as Windows Background Service (System User)</span>
                </label>
                <label className="flex items-center space-x-2 text-slate-300">
                  <input
                    type="checkbox"
                    checked={autoStart}
                    onChange={(e) => setAutoStart(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                  />
                  <span>Auto-start on Windows Boot</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={saveAgentSettings}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log Viewer Modal */}
      {showLogsModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Agent Execution Logs</span>
              </h2>
              <button onClick={() => setShowLogsModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl font-mono text-[11px] space-y-2 max-h-72 overflow-y-auto border border-slate-800">
              {liveSyncLogs.map((log, i) => (
                <div key={i} className="flex space-x-2">
                  <span className="text-slate-500">{log.time}</span>
                  <span className="text-emerald-400">[{log.type.toUpperCase()}]</span>
                  <span className="text-slate-200">{log.text}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => addToast('Downloaded agent_debug.log file', 'info')}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded text-xs font-semibold flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Log File</span>
              </button>
              <button onClick={() => setShowLogsModal(false)} className="px-4 py-1.5 bg-blue-600 text-white rounded text-xs font-bold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sync History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <History className="w-4 h-4 text-purple-400" />
                <span>Synchronization Audit History</span>
              </h2>
              <button onClick={() => setShowHistoryModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-800 text-slate-300 font-bold uppercase">
                  <tr>
                    <th className="py-2 px-3">Date & Time</th>
                    <th className="py-2 px-3">Duration</th>
                    <th className="py-2 px-3 text-right">Uploaded</th>
                    <th className="py-2 px-3 text-right">Failed</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {syncHistory.map((h, i) => (
                    <tr key={i}>
                      <td className="py-2 px-3 font-mono text-slate-300">{h.date} {h.time}</td>
                      <td className="py-2 px-3 font-mono text-slate-400">{h.duration}</td>
                      <td className="py-2 px-3 text-right font-mono text-emerald-400 font-bold">{h.uploaded}</td>
                      <td className="py-2 px-3 text-right font-mono text-slate-500">{h.failed}</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                          {h.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setShowHistoryModal(false)} className="px-4 py-1.5 bg-blue-600 text-white rounded text-xs font-bold">
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive 5-step Windows Installation Wizard Modal */}
      {showInstallerModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-2xl p-6 space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Monitor className="w-5 h-5 text-blue-400" />
                <h2 className="text-sm font-bold text-white">VNV Tally Sync Agent - Installation Wizard (Step {installerStep} of 5)</h2>
              </div>
              <button onClick={() => setShowInstallerModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step 1: Welcome */}
            {installerStep === 1 && (
              <div className="space-y-3 text-xs text-slate-300">
                <h3 className="text-base font-extrabold text-white">Welcome to the Setup Wizard</h3>
                <p>This wizard will guide you through installing **VNV Tally Sync Agent v3.4.1** on your Windows workstation.</p>
                <p className="text-slate-400">It connects your local Tally Prime software with the Cloud Financial MIS Portal automatically.</p>
              </div>
            )}

            {/* Step 2: License Agreement */}
            {installerStep === 2 && (
              <div className="space-y-3 text-xs text-slate-300">
                <h3 className="text-sm font-bold text-white">End User License Agreement (EULA)</h3>
                <div className="bg-slate-950 p-3 rounded-lg font-mono text-[10px] text-slate-400 h-32 overflow-y-auto border border-slate-800">
                  VNV FINANCIAL SOFTWARE LICENSE AGREEMENT...
                  Permission is granted to use this sync agent solely with authorized VNV Cloud MIS accounts.
                </div>
                <label className="flex items-center space-x-2 font-semibold text-slate-200">
                  <input type="checkbox" defaultChecked className="rounded bg-slate-950 border-slate-800 text-blue-600" />
                  <span>I accept the terms in the license agreement</span>
                </label>
              </div>
            )}

            {/* Step 3: Target Directory */}
            {installerStep === 3 && (
              <div className="space-y-3 text-xs text-slate-300">
                <h3 className="text-sm font-bold text-white">Select Installation Folder</h3>
                <div>
                  <label className="block text-slate-400 mb-1">Destination Location:</label>
                  <input
                    type="text"
                    defaultValue="C:\Program Files\VNV Financial\TallyAgent"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <p className="text-slate-400">Required Disk Space: 45 MB</p>
              </div>
            )}

            {/* Step 4: API Key */}
            {installerStep === 4 && (
              <div className="space-y-3 text-xs text-slate-300">
                <h3 className="text-sm font-bold text-white">Enter Cloud MIS API Credentials</h3>
                <div>
                  <label className="block text-slate-400 mb-1">Server URL:</label>
                  <input type="text" defaultValue="https://api.vnvfinancial.com/v1" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">License API Key:</label>
                  <input type="text" defaultValue="vnv_live_8f9a00219c84711a" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono" />
                </div>
              </div>
            )}

            {/* Step 5: Finish */}
            {installerStep === 5 && (
              <div className="space-y-3 text-xs text-slate-300 text-center py-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-base font-extrabold text-white">Installation Complete!</h3>
                <p className="text-slate-400">VNV Tally Sync Agent is installed and running as a Windows Service.</p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <button
                disabled={installerStep === 1 || installerStep === 5}
                onClick={() => setInstallerStep((s) => Math.max(1, s - 1))}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold disabled:opacity-50"
              >
                Back
              </button>
              {installerStep < 5 ? (
                <button
                  onClick={() => setInstallerStep((s) => Math.min(5, s + 1))}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold"
                >
                  Next &rarr;
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowInstallerModal(false);
                    addToast('Agent setup completed!', 'success');
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                >
                  Finish & Launch Agent
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
