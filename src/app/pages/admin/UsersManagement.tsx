import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Users, Search, Download, MoreHorizontal, ShieldCheck, UserX, TrendingUp, ArrowUpRight, X, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import clsx from "clsx";
import { toast } from "sonner";

const userGrowth = [
  { month: "Jan", users: 820 }, { month: "Feb", users: 945 }, { month: "Mar", users: 1100 },
  { month: "Apr", users: 1380 }, { month: "May", users: 1520 }, { month: "Jun", users: 1847 },
];

const initialUsers = [
  { id: "U-001", name: "Omar Khalid", email: "omar.k@email.com", phone: "+966 50 ***1234", orders: 48, spent: 4250, status: "Active", joined: "Jan 2025", city: "Riyadh", role: "Customer" },
  { id: "U-002", name: "Sara Mohammed", email: "sara.m@email.com", phone: "+966 55 ***5678", orders: 32, spent: 2890, status: "Active", joined: "Feb 2025", city: "Jeddah", role: "Customer" },
  { id: "U-003", name: "Khalid Amin", email: "khalid.a@email.com", phone: "+966 50 ***9012", orders: 12, spent: 980, status: "Active", joined: "Mar 2025", city: "Dammam", role: "Courier" },
  { id: "U-004", name: "Nora Hamad", email: "nora.h@email.com", phone: "+966 54 ***3456", orders: 5, spent: 320, status: "Blocked", joined: "Apr 2025", city: "Mecca", role: "Customer" },
  { id: "U-005", name: "Faisal Rashid", email: "faisal.r@email.com", phone: "+966 56 ***7890", orders: 67, spent: 6210, status: "Active", joined: "Nov 2024", city: "Riyadh", role: "Laundry Admin" },
  { id: "U-006", name: "Layla Ahmed", email: "layla.a@email.com", phone: "+966 59 ***2345", orders: 22, spent: 1740, status: "Active", joined: "May 2025", city: "Jeddah", role: "Customer" },
];

const stats = [
  { label: "Total Users", value: "12,847", trend: "+24%", icon: Users, color: "from-[#1D6076] to-[#2a8ba8]" },
  { label: "Active Users", value: "11,290", trend: "+18%", icon: ShieldCheck, color: "from-emerald-500 to-emerald-600" },
  { label: "Blocked", value: "142", trend: "-5%", icon: UserX, color: "from-red-500 to-red-600" },
  { label: "Avg. LTV", value: "SAR 842", trend: "+12%", icon: TrendingUp, color: "from-[#EBA050] to-[#d68b3a]" },
];

export function UsersManagement() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState<typeof initialUsers[0] | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusReason, setStatusReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const filtered = users.filter((u) => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const handleToggleStatus = async () => {
    if (!selectedUser) return;
    const isBlocking = selectedUser.status === "Active";
    if (isBlocking && !statusReason.trim()) return;

    setIsProcessing(true);
    // Simulate PUT /api/admin/users/{id}/status
    await new Promise(r => setTimeout(r, 800));

    setUsers(prev => prev.map(u => 
      u.id === selectedUser.id 
        ? { ...u, status: isBlocking ? "Blocked" : "Active" } 
        : u
    ));
    
    toast.success(`User ${selectedUser.name} has been ${isBlocking ? "blocked" : "activated"}.`);
    setIsProcessing(false);
    setShowStatusModal(false);
    setSelectedUser(null);
    setStatusReason("");
  };

  const openStatusModal = (user: typeof initialUsers[0]) => {
    setSelectedUser(user);
    setStatusReason("");
    setShowStatusModal(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Users Management</h1>
        <p className="text-sm text-slate-500 mt-1">Manage customers, couriers, and laundry admins</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className={clsx("w-9 h-9 rounded-lg bg-gradient-to-br flex items-center justify-center text-white", s.color)}>
                <s.icon size={16} />
              </div>
              <span className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                <ArrowUpRight size={10} />{s.trend}
              </span>
            </div>
            <p className="text-xs text-slate-400">{s.label}</p>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Growth Chart */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">User Growth</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userGrowth} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,.08)", fontSize: "12px" }} />
              <Bar dataKey="users" fill="#1D6076" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="w-64 bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs" />
          </div>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-100">
            <Download size={14} /> Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                {["User", "Role", "City", "Orders", "Total Spent", "Status", "Joined", ""].map((h) => (
                  <th key={h} className="pb-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group">
                  <td className="py-3 px-3">
                    <p className="text-[13px] font-semibold text-slate-800">{u.name}</p>
                    <p className="text-[11px] text-slate-400">{u.email}</p>
                  </td>
                  <td className="py-3 px-3">
                    <span className={clsx("text-[10px] font-semibold px-2 py-1 rounded-md", 
                      u.role === "Customer" ? "bg-blue-50 text-blue-600" : 
                      u.role === "Courier" ? "bg-amber-50 text-amber-600" : 
                      "bg-purple-50 text-purple-600"
                    )}>{u.role}</span>
                  </td>
                  <td className="py-3 px-3 text-xs text-slate-500">{u.city}</td>
                  <td className="py-3 px-3 text-xs font-medium text-slate-600">{u.orders}</td>
                  <td className="py-3 px-3 text-xs font-semibold text-slate-800">SAR {u.spent.toLocaleString()}</td>
                  <td className="py-3 px-3">
                    <span className={clsx("text-[10px] font-semibold px-2 py-1 rounded-md border", u.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100")}>{u.status}</span>
                  </td>
                  <td className="py-3 px-3 text-xs text-slate-400">{u.joined}</td>
                  <td className="py-3 px-3 text-right">
                    <button 
                      onClick={() => openStatusModal(u)}
                      className={clsx("px-3 py-1.5 rounded-lg text-xs font-semibold transition-all opacity-0 group-hover:opacity-100", 
                        u.status === "Active" ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                      )}
                    >
                      {u.status === "Active" ? "Block" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Block/Activate Modal */}
      <AnimatePresence>
        {showStatusModal && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowStatusModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {selectedUser.status === "Active" ? "Block User" : "Activate User"}
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                {selectedUser.status === "Active" 
                  ? `You are about to block ${selectedUser.name}. They will not be able to access their account.`
                  : `You are about to activate ${selectedUser.name}. They will regain access to their account.`}
              </p>
              
              {selectedUser.status === "Active" && (
                <textarea 
                  value={statusReason}
                  onChange={e => setStatusReason(e.target.value)}
                  placeholder="Enter block reason (required)"
                  className="w-full h-24 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500/40 resize-none outline-none mb-4"
                />
              )}

              <div className="flex gap-3 justify-end mt-4">
                <button onClick={() => setShowStatusModal(false)} className="px-4 py-2 text-slate-600 font-medium text-sm hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                <button 
                  onClick={handleToggleStatus}
                  disabled={isProcessing || (selectedUser.status === "Active" && !statusReason.trim())}
                  className={clsx("px-4 py-2 font-medium text-sm rounded-lg flex items-center gap-2 text-white transition-colors disabled:opacity-50",
                    selectedUser.status === "Active" ? "bg-red-500 hover:bg-red-600" : "bg-emerald-500 hover:bg-emerald-600"
                  )}
                >
                  {isProcessing ? <Clock size={16} className="animate-spin" /> : null}
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
