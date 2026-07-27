import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, Building, Monitor, Key, Activity, Layers, Download, Search } from 'lucide-react';

export const AdminPortalView: React.FC = () => {
  const { addToast } = useApp();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-purple-500/30 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-600/20 text-purple-400 rounded-xl border border-purple-500/30">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              Super Admin Console
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight mt-1">Enterprise SaaS Cloud Admin</h1>
            <p className="text-xs text-slate-400">Multi-tenant Architecture & Global Agent Synchronization Telemetries</p>
          </div>
        </div>

        <button
          onClick={() => addToast('Generated new tenant license key', 'success')}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-lg"
        >
          Issue License Key
        </button>
      </div>

      {/* Admin KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs font-semibold text-slate-400">Total SaaS Tenants</span>
          <p className="text-2xl font-extrabold text-white mt-1">128 Companies</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs font-semibold text-slate-400">Active Windows Agents</span>
          <p className="text-2xl font-extrabold text-emerald-400 mt-1">312 Connected</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs font-semibold text-slate-400">Daily Sync Volume</span>
          <p className="text-2xl font-extrabold text-blue-400 mt-1">1.8M Records</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs font-semibold text-slate-400">API Health Index</span>
          <p className="text-2xl font-extrabold text-cyan-400 mt-1">99.98% Uptime</p>
        </div>
      </div>

      {/* Tenant Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden p-5 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Connected Client Companies & License Status</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800 text-slate-300 font-bold uppercase">
              <tr>
                <th className="py-2 px-3">Company Name</th>
                <th className="py-2 px-3">License Tier</th>
                <th className="py-2 px-3">Active Agents</th>
                <th className="py-2 px-3">Last Sync</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="hover:bg-slate-800/50">
                <td className="py-2.5 px-3 font-bold text-white">VNV Tech Solutions Pvt Ltd</td>
                <td className="py-2.5 px-3 text-purple-400 font-semibold">Enterprise Plan</td>
                <td className="py-2.5 px-3 font-mono text-emerald-400">4 Agents</td>
                <td className="py-2.5 px-3 font-mono text-slate-400">Just now</td>
                <td className="py-2.5 px-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">Active</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="py-2.5 px-3 font-bold text-white">Apex Global Tech Solutions</td>
                <td className="py-2.5 px-3 text-blue-400 font-semibold">Professional Plan</td>
                <td className="py-2.5 px-3 font-mono text-emerald-400">2 Agents</td>
                <td className="py-2.5 px-3 font-mono text-slate-400">5 mins ago</td>
                <td className="py-2.5 px-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">Active</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
