import React from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Shield, Key, Database, Moon, Sun, User, Building } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { darkMode, setDarkMode, addToast } = useApp();

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-slate-800 text-slate-300 rounded-xl border border-slate-700">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">System Settings</h1>
            <p className="text-xs text-slate-400">Account Profile, Security Keys, Dark Mode & Cloud Backup Configurations</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
        {/* Profile */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <User className="w-4 h-4 text-blue-400" />
            <span>Administrator Profile</span>
          </h2>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Full Name</label>
              <input type="text" defaultValue="Aditya Sharma" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white" />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Email Address</label>
              <input type="email" defaultValue="admin@vnvfinancial.com" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white" />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Security & Authentication</span>
          </h2>
          <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
            <div>
              <p className="font-bold text-white">Two-Factor Authentication (2FA)</p>
              <p className="text-slate-400">Protect account login with Google Authenticator or SMS OTP</p>
            </div>
            <button onClick={() => addToast('2FA Security settings updated', 'success')} className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg">
              Enabled
            </button>
          </div>
        </div>

        {/* Save */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button onClick={() => addToast('Saved system settings successfully!', 'success')} className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
