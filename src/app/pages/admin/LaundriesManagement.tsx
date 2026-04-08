import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  Store, Search, Filter, Plus, MoreHorizontal, MapPin, Star,
  CheckCircle, Clock, XCircle, ChevronLeft, ChevronRight, Download, Eye, AlertOctagon
} from "lucide-react";
import clsx from "clsx";
import { toast } from "sonner";

const initialLaundries = [
  { id: "L-001", name: "Al Jawhara Laundry", owner: "Mohammed A.", city: "Riyadh", area: "Al Malqa", status: "Active", rating: 4.9, orders: 1240, revenue: 38200, joined: "Jan 15, 2025", commission: 12 },
  { id: "L-002", name: "Clean & Care", owner: "Khalid R.", city: "Jeddah", area: "Al Tahlia", status: "Pending", rating: 0, orders: 0, revenue: 0, joined: "Mar 28, 2026", commission: 10 },
  { id: "L-003", name: "Speed Wash Pro", owner: "Faisal M.", city: "Dammam", area: "Al Shati", status: "Active", rating: 4.7, orders: 856, revenue: 25100, joined: "Feb 20, 2025", commission: 12 },
  { id: "L-004", name: "Modern Laundry", owner: "Ali S.", city: "Riyadh", area: "Al Yasmin", status: "Suspended", rating: 3.2, orders: 342, revenue: 10260, joined: "Nov 5, 2024", commission: 15 },
  { id: "L-005", name: "Royal Cleaners", owner: "Omar H.", city: "Mecca", area: "Al Aziziya", status: "Active", rating: 4.5, orders: 695, revenue: 20100, joined: "Dec 1, 2024", commission: 12 },
  { id: "L-006", name: "Fresh Start", owner: "Saad K.", city: "Medina", area: "Al Haram", status: "Active", rating: 4.6, orders: 520, revenue: 15600, joined: "Apr 10, 2025", commission: 10 },
  { id: "L-007", name: "Quick Clean Hub", owner: "Turki N.", city: "Riyadh", area: "Al Muruj", status: "Pending", rating: 0, orders: 0, revenue: 0, joined: "Mar 30, 2026", commission: 10 },
  { id: "L-008", name: "Sparkle Plus", owner: "Hamad Y.", city: "Jeddah", area: "Al Rawdah", status: "Active", rating: 4.4, orders: 410, revenue: 12300, joined: "Jun 15, 2025", commission: 12 },
];

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  Active: { label: "Active", color: "bg-emerald-50 text-emerald-700 border-emerald-100", icon: CheckCircle },
  Pending: { label: "Pending Review", color: "bg-amber-50 text-amber-700 border-amber-100", icon: Clock },
  Suspended: { label: "Suspended", color: "bg-red-50 text-red-700 border-red-100", icon: XCircle },
};

const summaryStats = [
  { label: "Total Laundries", value: "342", color: "text-[#1D6076]" },
  { label: "Active", value: "298", color: "text-emerald-600" },
  { label: "Pending Review", value: "31", color: "text-amber-600" },
  { label: "Suspended", value: "13", color: "text-red-600" },
];

export function LaundriesManagement() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [laundries, setLaundries] = useState(initialLaundries);
  const [selectedLaundry, setSelectedLaundry] = useState<typeof initialLaundries[0] | null>(null);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [suspendReason, setSuspendReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const filtered = laundries.filter((l) => {
    if (filter !== "All" && l.status !== filter) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.city.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleToggleStatus = async () => {
    if (!selectedLaundry) return;
    const isSuspending = selectedLaundry.status === "Active";
    if (isSuspending && !suspendReason.trim()) return;

    setIsProcessing(true);
    // Simulate PUT /api/admin/laundries/{id}/status
    await new Promise(r => setTimeout(r, 800));

    setLaundries(prev => prev.map(l => 
      l.id === selectedLaundry.id 
        ? { ...l, status: isSuspending ? "Suspended" : "Active" } 
        : l
    ));
    
    toast.success(`Laundry ${selectedLaundry.name} has been ${isSuspending ? "suspended" : "activated"}.`);
    setIsProcessing(false);
    setShowSuspendModal(false);
    setSelectedLaundry(null);
    setSuspendReason("");
  };

  const openSuspendModal = (laundry: typeof initialLaundries[0]) => {
    setSelectedLaundry(laundry);
    setSuspendReason("");
    setShowSuspendModal(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Laundries Management</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor and manage all partner laundries</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1D6076] text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-[#1D6076]/20 hover:bg-[#164a5c] transition-colors">
          <Plus size={16} /> Add Laundry
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summaryStats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-100">
            <p className="text-xs text-slate-400 font-medium">{s.label}</p>
            <p className={clsx("text-2xl font-bold mt-1", s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            {["All", "Active", "Pending", "Suspended"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={clsx("px-3 py-1.5 rounded-lg text-xs font-semibold transition-all", filter === f ? "bg-[#1D6076] text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100")}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search laundries..." className="w-full sm:w-56 bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-[#1D6076]/10 focus:border-[#1D6076]/30" />
            </div>
            <button className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600"><Download size={14} /></button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                {["ID", "Laundry", "City / Area", "Status", "Rating", "Orders", "Revenue", "Commission", "Actions"].map((h) => (
                  <th key={h} className="pb-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap px-3 first:pl-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => {
                const st = statusConfig[l.status];
                return (
                  <tr key={l.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-3 first:pl-0 text-xs text-slate-400 font-mono">{l.id}</td>
                    <td className="py-3 px-3">
                      <p className="text-[13px] font-semibold text-slate-800">{l.name}</p>
                      <p className="text-[11px] text-slate-400">{l.owner}</p>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin size={12} className="text-slate-300" />
                        {l.city}, {l.area}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={clsx("text-[10px] font-semibold px-2 py-1 rounded-md border", st.color)}>{st.label}</span>
                    </td>
                    <td className="py-3 px-3">
                      {l.rating > 0 ? (
                        <span className="flex items-center gap-1 text-xs"><Star size={12} className="text-[#EBA050] fill-[#EBA050]" />{l.rating}</span>
                      ) : <span className="text-[10px] text-slate-300">N/A</span>}
                    </td>
                    <td className="py-3 px-3 text-xs font-medium text-slate-600">{l.orders.toLocaleString()}</td>
                    <td className="py-3 px-3 text-xs font-semibold text-slate-800">SAR {l.revenue.toLocaleString()}</td>
                    <td className="py-3 px-3 text-xs font-medium text-[#1D6076]">{l.commission}%</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#1D6076] transition-colors"><Eye size={14} /></button>
                        {l.status !== "Pending" && (
                          <button 
                            onClick={() => openSuspendModal(l)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <AlertOctagon size={14} />
                          </button>
                        )}
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><MoreHorizontal size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">Showing {filtered.length} of {laundries.length} laundries</p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg bg-slate-50 text-slate-400"><ChevronLeft size={14} /></button>
            <button className="px-2.5 py-1 rounded-lg bg-[#1D6076] text-white text-xs font-semibold">1</button>
            <button className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-500 text-xs font-medium hover:bg-slate-100">2</button>
            <button className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-500 text-xs font-medium hover:bg-slate-100">3</button>
            <button className="p-1.5 rounded-lg bg-slate-50 text-slate-400"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>

      {/* Suspend Modal */}
      <AnimatePresence>
        {showSuspendModal && selectedLaundry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowSuspendModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {selectedLaundry.status === "Active" ? "Suspend Laundry" : "Activate Laundry"}
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                {selectedLaundry.status === "Active" 
                  ? `You are about to suspend ${selectedLaundry.name}. They will not receive new orders and won't appear in customer search.`
                  : `You are about to activate ${selectedLaundry.name}. They will start receiving orders again.`}
              </p>
              
              {selectedLaundry.status === "Active" && (
                <textarea 
                  value={suspendReason}
                  onChange={e => setSuspendReason(e.target.value)}
                  placeholder="Enter reason for suspension (required)"
                  className="w-full h-24 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500/40 resize-none outline-none mb-4"
                />
              )}

              <div className="flex gap-3 justify-end mt-4">
                <button onClick={() => setShowSuspendModal(false)} className="px-4 py-2 text-slate-600 font-medium text-sm hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                <button 
                  onClick={handleToggleStatus}
                  disabled={isProcessing || (selectedLaundry.status === "Active" && !suspendReason.trim())}
                  className={clsx("px-4 py-2 font-medium text-sm rounded-lg flex items-center gap-2 text-white transition-colors disabled:opacity-50",
                    selectedLaundry.status === "Active" ? "bg-red-500 hover:bg-red-600" : "bg-emerald-500 hover:bg-emerald-600"
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
