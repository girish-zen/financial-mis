import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, UserPlus, Shield, Key, CheckCircle, XCircle, Search } from 'lucide-react';

export const UserManagementView: React.FC = () => {
  const { addToast } = useApp();
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const usersList = [
    { id: 1, name: 'Aditya Sharma', email: 'aditya@vnvfinancial.com', role: 'Admin', status: 'Active', lastLogin: '2026-07-21 16:30' },
    { id: 2, name: 'Priya Nair', email: 'priya@vnvfinancial.com', role: 'Accountant', status: 'Active', lastLogin: '2026-07-21 14:15' },
    { id: 3, name: 'Vikram Mehta', email: 'vikram@auditcorp.in', role: 'Auditor', status: 'Active', lastLogin: '2026-07-20 09:45' },
    { id: 4, name: 'Siddharth Rao', email: 'siddharth@vnvfinancial.com', role: 'Viewer', status: 'Inactive', lastLogin: '2026-06-12 11:20' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">User Management & Permissions</h1>
            <p className="text-xs text-slate-400">Manage Role-Based Access Control (RBAC), Active Users & Security Keys</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddUserModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-800/80 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-700">
            <tr>
              <th className="py-3 px-4">User Name</th>
              <th className="py-3 px-4">Email Address</th>
              <th className="py-3 px-4">Assigned Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Last Activity</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {usersList.map((u) => (
              <tr key={u.id} className="hover:bg-slate-800/60">
                <td className="py-3 px-4 font-bold text-slate-100">{u.name}</td>
                <td className="py-3 px-4 text-slate-400">{u.email}</td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold text-[10px]">
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {u.status === 'Active' ? (
                    <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 text-slate-500 font-semibold">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Inactive</span>
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">{u.lastLogin}</td>
                <td className="py-3 px-4 text-center space-x-2">
                  <button
                    onClick={() => addToast(`Password reset link sent to ${u.email}`, 'info')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-semibold"
                  >
                    Reset Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-white">Create New User Account</h2>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Full Name</label>
                <input type="text" placeholder="e.g. Ramesh Kumar" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Email Address</label>
                <input type="email" placeholder="ramesh@company.com" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Role Permission</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white">
                  <option value="Admin">Admin (Full Access)</option>
                  <option value="Accountant">Accountant (Reports & Ledger)</option>
                  <option value="Auditor">Auditor (Read Only Reports)</option>
                  <option value="Viewer">Viewer (Dashboard Only)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button onClick={() => setShowAddUserModal(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold">
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAddUserModal(false);
                  addToast('User created successfully and invitation email sent!', 'success');
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
