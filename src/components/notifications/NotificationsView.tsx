import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, MessageSquare, Mail, Smartphone, Send, CheckCircle2 } from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const { addToast } = useApp();
  const [whatsAppEnabled, setWhatsAppEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-yellow-600/20 text-yellow-400 rounded-xl border border-yellow-500/30">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Notification & Automated Report Dispatcher</h1>
            <p className="text-xs text-slate-400">Configure Automated Daily MIS Statements via WhatsApp, Email & SMS</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* WhatsApp Card */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-xl">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">WhatsApp Automated Report Dispatcher</h2>
              <p className="text-xs text-slate-400">Sends daily PDF summaries & outstanding payment reminders to debtors</p>
            </div>
          </div>
          <button
            onClick={() => {
              setWhatsAppEnabled(!whatsAppEnabled);
              addToast(whatsAppEnabled ? 'Disabled WhatsApp Notifications' : 'Enabled WhatsApp Dispatcher', 'info');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              whatsAppEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {whatsAppEnabled ? 'Active (Connected)' : 'Disabled'}
          </button>
        </div>

        {/* Email Card */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Email Digest & Scheduled PDF Export</h2>
              <p className="text-xs text-slate-400">Delivers weekly Balance Sheet & P&L statements to CXO emails</p>
            </div>
          </div>
          <button
            onClick={() => {
              setEmailEnabled(!emailEnabled);
              addToast(emailEnabled ? 'Disabled Email Dispatch' : 'Enabled Email Dispatch', 'info');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              emailEnabled ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {emailEnabled ? 'Active (Connected)' : 'Disabled'}
          </button>
        </div>
      </div>
    </div>
  );
};
