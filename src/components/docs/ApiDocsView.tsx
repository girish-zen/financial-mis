import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Code2, Copy, Check, Key, Globe, Terminal } from 'lucide-react';

export const ApiDocsView: React.FC = () => {
  const { addToast } = useApp();
  const [copied, setCopied] = useState(false);

  const sampleRequestJson = `{
  "apiKey": "vnv_live_8f9a00219c84711a",
  "companyId": "COMP-901",
  "syncTimestamp": "2026-07-21T16:40:12Z",
  "vouchers": [
    {
      "voucherNo": "INV/2025-26/1001",
      "type": "Sales",
      "date": "2026-07-21",
      "partyName": "Apex Global Tech Solutions",
      "partyGstin": "27AAACA108311Z9",
      "taxableAmount": 150000.00,
      "cgst": 13500.00,
      "sgst": 13500.00,
      "totalAmount": 177000.00
    }
  ]
}`;

  const copySnippet = () => {
    navigator.clipboard.writeText(sampleRequestJson);
    setCopied(true);
    addToast('Copied API payload snippet to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-600/20 text-amber-400 rounded-xl border border-amber-500/30">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Developer REST API Documentation</h1>
            <p className="text-xs text-slate-400">HTTPS REST Specifications for VNV Tally Sync Agent & Cloud Integration</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono text-emerald-400">
          <Globe className="w-3.5 h-3.5" />
          <span>https://api.vnvfinancial.com/v1</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <h2 className="text-xs font-bold text-white uppercase">Authentication</h2>
          <p className="text-xs text-slate-400">Pass key in Authorization Header:</p>
          <code className="block bg-slate-950 p-2 rounded text-[11px] text-amber-400 font-mono">
            Authorization: Bearer vnv_live_8f...
          </code>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <h2 className="text-xs font-bold text-white uppercase">Sync Vouchers Endpoint</h2>
          <p className="text-xs text-slate-400">Upload batch XML/JSON vouchers:</p>
          <code className="block bg-slate-950 p-2 rounded text-[11px] text-blue-400 font-mono">
            POST /v1/sync/vouchers
          </code>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <h2 className="text-xs font-bold text-white uppercase">Fetch Reports API</h2>
          <p className="text-xs text-slate-400">Query Financial MIS JSON:</p>
          <code className="block bg-slate-950 p-2 rounded text-[11px] text-emerald-400 font-mono">
            GET /v1/reports/balance-sheet
          </code>
        </div>
      </div>

      {/* Code Payload Sandbox */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden p-5 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-xs font-bold text-white">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>Sample POST Sync Request Payload (JSON)</span>
          </div>
          <button onClick={copySnippet} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded font-semibold flex items-center space-x-1">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Payload'}</span>
          </button>
        </div>
        <pre className="bg-slate-950 p-4 rounded-xl text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800">
          {sampleRequestJson}
        </pre>
      </div>
    </div>
  );
};
