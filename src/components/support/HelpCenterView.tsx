import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HelpCircle, Download, Send, Search, BookOpen, MessageSquare, CheckCircle2 } from 'lucide-react';

export const HelpCenterView: React.FC = () => {
  const { addToast } = useApp();
  const [showTicketModal, setShowTicketModal] = useState(false);

  const faqs = [
    { q: 'How does VNV Tally Sync Agent connect with Tally Prime?', a: 'The Windows Agent runs as a background service on the client PC. It queries Tally Prime using its local XML HTTP port (default 9000) and securely transmits encrypted JSON payloads to the VNV Cloud Server via HTTPS.' },
    { q: 'Does Tally Prime need to be open all the time?', a: 'Yes, Tally Prime should be running with ODBC/HTTP server enabled. The Windows Agent will automatically sync changes every 15 minutes.' },
    { q: 'Is my financial data secure in the Cloud Portal?', a: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. We maintain SOC2 Type II & ISO 27001 compliance standards.' },
    { q: 'Can I export reports to Excel & PDF?', a: 'Yes! Every financial report (Balance Sheet, P&L, Trial Balance, GST Registers, Ledger) supports one-click PDF, Excel, and CSV downloads.' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-cyan-600/20 text-cyan-400 rounded-xl border border-cyan-500/30">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Help Center & Support Desk</h1>
            <p className="text-xs text-slate-400">Knowledge Base Guides, Software Setup Binaries & Ticket Desk</p>
          </div>
        </div>

        <button
          onClick={() => setShowTicketModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg"
        >
          Raise Support Ticket
        </button>
      </div>

      {/* Downloads Section */}
      <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/30 p-5 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white">Download VNV Tally Sync Agent for Windows</h2>
          <p className="text-xs text-slate-400">Version 3.4.1 Installer (EXE / MSI) • Compatible with Windows 10/11 & Server 2022</p>
        </div>
        <button
          onClick={() => addToast('Downloading VNV_Tally_Sync_Agent_v3.4.1_Setup.exe (45 MB)...', 'success')}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md"
        >
          <Download className="w-4 h-4" />
          <span>Download .EXE</span>
        </button>
      </div>

      {/* FAQ Accordions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-5 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions (FAQ)</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <h3 className="text-xs font-bold text-blue-400 flex items-center space-x-2">
                <span>Q: {faq.q}</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Raise Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl">
            <h2 className="text-base font-bold text-white">Raise Enterprise Support Ticket</h2>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Issue Subject</label>
                <input type="text" placeholder="e.g. Tally Port 9000 Connection Error" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Category</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white">
                  <option value="Agent Sync">Windows Sync Agent Issue</option>
                  <option value="Financial Report">Financial Report Variance</option>
                  <option value="GST">GST Reconciliation Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Description</label>
                <textarea rows={3} placeholder="Describe the behavior..." className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"></textarea>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button onClick={() => setShowTicketModal(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold">
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowTicketModal(false);
                  addToast('Support ticket #VNV-9842 raised successfully! Assigned to L2 Support.', 'success');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold"
              >
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
