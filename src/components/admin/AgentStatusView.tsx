import React from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, Cpu, HardDrive, Monitor, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export const AgentStatusView: React.FC = () => {
  const { addToast } = useApp();

  const agentMachines = [
    { machine: 'ACCOUNTS-DESKTOP-01', company: 'VNV Tech Solutions Pvt Ltd', version: 'v3.4.1', cpu: '12%', ram: '2.4 GB / 16 GB', disk: '140 GB Free', status: 'Online', lastSync: '10s ago', error: 'None' },
    { machine: 'MUMBAI-FINANCE-PC02', company: 'VNV Global Inc', version: 'v3.4.0', cpu: '28%', ram: '4.1 GB / 32 GB', disk: '420 GB Free', status: 'Online', lastSync: '2m ago', error: 'None' },
    { machine: 'BLR-AUDIT-LAPTOP', company: 'Pinnacle Enterprise', version: 'v3.3.9', cpu: '0%', ram: '1.8 GB / 16 GB', disk: '95 GB Free', status: 'Offline', lastSync: '3h ago', error: 'Network timeout' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-600/20 text-green-400 rounded-xl border border-green-500/30">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Agent Telemetry & Machine Health</h1>
            <p className="text-xs text-slate-400">Live Client Workstation Telemetries, Hardware Loads & Sync Status</p>
          </div>
        </div>

        <button
          onClick={() => addToast('Pinging all connected Windows Agents...', 'info')}
          className="flex items-center space-x-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700"
        >
          <RefreshCw className="w-3.5 h-3.5 text-green-400" />
          <span>Ping All Agents</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agentMachines.map((m, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Monitor className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-bold text-white">{m.machine}</h2>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${m.status === 'Online' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                {m.status}
              </span>
            </div>
            <p className="text-xs text-slate-400">{m.company}</p>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="flex items-center"><Cpu className="w-3 h-3 mr-1 text-cyan-400" /> CPU Load</span>
                <span className="font-mono font-bold">{m.cpu}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="flex items-center"><Activity className="w-3 h-3 mr-1 text-purple-400" /> RAM Usage</span>
                <span className="font-mono">{m.ram}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="flex items-center"><HardDrive className="w-3 h-3 mr-1 text-emerald-400" /> Storage</span>
                <span className="font-mono">{m.disk}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
