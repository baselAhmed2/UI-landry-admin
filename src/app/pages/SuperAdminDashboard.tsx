import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp, Users, Store, Package, ArrowUpRight, ArrowDownRight,
  DollarSign, Activity, Eye, ChevronRight, MoreHorizontal, Zap, Clock, X, MapPin, Star,
  Smartphone
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import clsx from "clsx";
import { useState } from "react";

// ─── Mock Data ───
const stats = [
  { title: "Total Revenue", value: "SAR 142.5K", trend: "+12.5%", isUp: true, icon: DollarSign, color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50", sparkData: [30, 45, 35, 55, 48, 62, 75] },
  { title: "Active Laundries", value: "342", trend: "+4", isUp: true, icon: Store, color: "from-[#1D6076] to-[#2a8ba8]", bg: "bg-[#1D6076]/5", sparkData: [20, 22, 25, 24, 28, 30, 34] },
  { title: "Total Users", value: "12,847", trend: "+24%", isUp: true, icon: Users, color: "from-[#EBA050] to-[#d68b3a]", bg: "bg-[#EBA050]/10", sparkData: [80, 95, 105, 115, 108, 120, 128] },
  { title: "Orders Today", value: "1,847", trend: "-2.1%", isUp: false, icon: Package, color: "from-violet-500 to-violet-600", bg: "bg-violet-50", sparkData: [50, 55, 48, 52, 45, 42, 38] },
];

const revenueData = [
  { month: "Jan", revenue: 65000, orders: 3200, profit: 18200 },
  { month: "Feb", revenue: 72000, orders: 3600, profit: 20100 },
  { month: "Mar", revenue: 85000, orders: 4100, profit: 25500 },
  { month: "Apr", revenue: 104000, orders: 5200, profit: 33200 },
  { month: "May", revenue: 98000, orders: 4800, profit: 29400 },
  { month: "Jun", revenue: 142500, orders: 6200, profit: 42750 },
];

const ordersByStatus = [
  { name: "Completed", value: 62, color: "#10b981" },
  { name: "In Progress", value: 18, color: "#1D6076" },
  { name: "Pending", value: 12, color: "#EBA050" },
  { name: "Cancelled", value: 8, color: "#ef4444" },
];

const topLaundries = [
  { rank: 1, name: "Al Jawhara Laundry", city: "Riyadh", orders: 1240, revenue: "SAR 38.2K", rating: 4.9, growth: "+18%", history: [20, 25, 22, 30, 28, 35, 40] },
  { rank: 2, name: "Clean & Care", city: "Jeddah", orders: 980, revenue: "SAR 29.4K", rating: 4.8, growth: "+12%", history: [15, 18, 16, 22, 24, 28, 32] },
  { rank: 3, name: "Speed Wash Pro", city: "Dammam", orders: 856, revenue: "SAR 25.1K", rating: 4.7, growth: "+9%", history: [10, 12, 14, 18, 20, 22, 25] },
  { rank: 4, name: "Modern Laundry", city: "Riyadh", orders: 742, revenue: "SAR 22.8K", rating: 4.6, growth: "+7%", history: [8, 10, 12, 14, 16, 18, 20] },
  { rank: 5, name: "Royal Cleaners", city: "Mecca", orders: 695, revenue: "SAR 20.1K", rating: 4.5, growth: "+5%", history: [5, 8, 10, 12, 14, 15, 18] },
];

const recentOrders = [
  { id: "#ND-4521", customer: "Omar K.", laundry: "Al Jawhara", amount: "SAR 245", status: "Completed", time: "2 min ago" },
  { id: "#ND-4520", customer: "Sara M.", laundry: "Clean & Care", amount: "SAR 180", status: "In Progress", time: "8 min ago" },
  { id: "#ND-4519", customer: "Khalid A.", laundry: "Speed Wash", amount: "SAR 320", status: "Pending", time: "15 min ago" },
  { id: "#ND-4518", customer: "Nora H.", laundry: "Modern Laundry", amount: "SAR 95", status: "Completed", time: "22 min ago" },
  { id: "#ND-4517", customer: "Faisal R.", laundry: "Royal Cleaners", amount: "SAR 410", status: "Cancelled", time: "35 min ago" },
];

const hourlyOrders = [
  { hour: "6am", orders: 12 }, { hour: "8am", orders: 45 }, { hour: "10am", orders: 78 },
  { hour: "12pm", orders: 120 }, { hour: "2pm", orders: 95 }, { hour: "4pm", orders: 110 },
  { hour: "6pm", orders: 145 }, { hour: "8pm", orders: 88 }, { hour: "10pm", orders: 42 },
];

const cityDistribution = [
  { city: "Riyadh", percentage: 38, orders: 7240 },
  { city: "Jeddah", percentage: 24, orders: 4580 },
  { city: "Dammam", percentage: 15, orders: 2865 },
  { city: "Mecca", percentage: 12, orders: 2290 },
  { city: "Medina", percentage: 11, orders: 2100 },
];

const anim = {
  container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } },
  item: { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } },
};

// ─── Mini Sparkline ───
function Spark({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const h = 28;
  const w = 60;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`).join(" ");
  return (
    <svg width={w} height={h} className="opacity-60">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}

const statusColor: Record<string, string> = {
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  "In Progress": "bg-blue-50 text-blue-700 border-blue-100",
  Pending: "bg-amber-50 text-amber-700 border-amber-100",
  Cancelled: "bg-red-50 text-red-700 border-red-100",
};

export function SuperAdminDashboard() {
  const [period, setPeriod] = useState("30d");
  const [selectedLaundry, setSelectedLaundry] = useState<typeof topLaundries[0] | null>(null);

  return (
    <motion.div variants={anim.container} initial="hidden" animate="show" className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <motion.div variants={anim.item}>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back, Ahmed. Here's what's happening today.</p>
        </motion.div>
        <motion.div variants={anim.item} className="flex items-center gap-2">
          {["7d", "30d", "90d"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative overflow-hidden",
                period === p ? "text-white shadow-md shadow-[#1D6076]/20" : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
              )}
            >
              {period === p && (
                <motion.div layoutId="period-bg" className="absolute inset-0 bg-[#1D6076] z-0" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
              <span className="relative z-10">{p === "7d" ? "7 Days" : p === "30d" ? "30 Days" : "90 Days"}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.title} variants={anim.item} whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-white hover:border-[#EBA050]/30 shadow-sm hover:shadow-xl hover:shadow-[#1D6076]/5 transition-all duration-300 group cursor-default">
              <div className="flex items-start justify-between mb-4">
                <div className={clsx("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300", s.color)}>
                  <s.icon size={18} strokeWidth={2.5} />
                </div>
                <Spark data={s.sparkData} color={s.isUp ? "#10b981" : "#ef4444"} />
              </div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{s.title}</p>
              <div className="flex items-end justify-between mt-1">
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="text-2xl font-bold text-slate-900"
                >
                  {s.value}
                </motion.h3>
                <span className={clsx("flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded-md", s.isUp ? "text-emerald-700 bg-emerald-50" : "text-red-600 bg-red-50")}>
                  {s.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {s.trend}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <motion.div variants={anim.item} className="xl:col-span-2 h-full">
          <div className="bg-white rounded-2xl p-5 border border-slate-100/80 h-full flex flex-col hover:shadow-lg hover:shadow-slate-100 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#1D6076]" /> Revenue & Profit
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Monthly performance breakdown</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#1D6076]" />Revenue</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#EBA050]" />Profit</span>
              </div>
            </div>
            <div className="flex-1 min-h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient key="gRev" id="gRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1D6076" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#1D6076" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient key="gProf" id="gProf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EBA050" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#EBA050" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${v / 1000}K`} />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,.08)", fontSize: "12px" }}
                    formatter={(value: number, name: string) => [`SAR ${value.toLocaleString()}`, name === "revenue" ? "Revenue" : "Profit"]}
                  />
                  <Area key="rev-area" type="monotone" dataKey="revenue" stroke="#1D6076" strokeWidth={2.5} fill="url(#gRev)" animationDuration={1500} />
                  <Area key="prof-area" type="monotone" dataKey="profit" stroke="#EBA050" strokeWidth={2.5} fill="url(#gProf)" animationDuration={1500} animationBegin={200} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Order Distribution Donut */}
        <motion.div variants={anim.item} className="h-full">
          <div className="bg-white rounded-2xl p-5 border border-slate-100/80 h-full flex flex-col hover:shadow-lg hover:shadow-slate-100 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-800">Order Status</h3>
              <button className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50"><MoreHorizontal size={16} /></button>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                className="relative"
              >
                <PieChart width={200} height={200}>
                  <Pie data={ordersByStatus} cx={100} cy={100} innerRadius={65} outerRadius={90} paddingAngle={3} dataKey="value" strokeWidth={0} animationDuration={1000}>
                    {ordersByStatus.map((entry, i) => (<Cell key={`cell-${i}`} fill={entry.color} />))}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold text-slate-900">6.2K</span>
                  <span className="text-[10px] text-slate-400">Total Orders</span>
                </div>
              </motion.div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {ordersByStatus.map((s, idx) => (
                <motion.div 
                  key={s.name} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-50/60 hover:bg-slate-100 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-[11px] text-slate-500">{s.name}</span>
                  <span className="text-[11px] font-semibold text-slate-700 ml-auto">{s.value}%</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Hourly Orders */}
        <motion.div variants={anim.item}>
          <div className="bg-white rounded-2xl p-5 border border-slate-100/80 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Orders by Hour</h3>
                <p className="text-xs text-slate-400 mt-0.5">Today's order distribution</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#1D6076] font-semibold bg-[#1D6076]/5 px-2 py-1 rounded-lg">
                <Activity size={12} />
                Peak: 6PM
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyOrders} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10 }} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,.08)", fontSize: "12px" }} />
                  <Bar dataKey="orders" fill="#1D6076" radius={[6, 6, 0, 0]} maxBarSize={32} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* City Distribution */}
        <motion.div variants={anim.item}>
          <div className="bg-white rounded-2xl p-5 border border-slate-100/80 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold text-slate-800">Orders by City</h3>
              <button className="text-xs font-semibold text-[#1D6076] hover:underline">View Map</button>
            </div>
            <div className="space-y-3.5">
              {cityDistribution.map((c, idx) => (
                <motion.div 
                  key={c.city}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-slate-700 flex items-center gap-1.5"><MapPin size={12} className="text-slate-400" />{c.city}</span>
                    <span className="text-xs text-slate-400">{c.orders.toLocaleString()} orders ({c.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${c.percentage}%` }}
                      transition={{ duration: 1.2, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                      className={clsx("h-full rounded-full", idx === 0 ? "bg-gradient-to-r from-[#1D6076] to-[#2a8ba8]" : "bg-[#EBA050]/80")}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Third Row: Top Laundries + Recent Orders */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Top Performing Laundries */}
        <motion.div variants={anim.item} className="xl:col-span-3">
          <div className="bg-white rounded-2xl p-5 border border-slate-100/80 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#EBA050]/10 rounded-lg"><Zap size={14} className="text-[#EBA050]" /></div>
                <h3 className="text-sm font-semibold text-slate-800">Top Performing Laundries</h3>
              </div>
              <button className="text-xs font-semibold text-[#1D6076] hover:underline flex items-center gap-1">
                View All <ChevronRight size={14} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">#</th>
                    <th className="pb-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Laundry</th>
                    <th className="pb-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Orders</th>
                    <th className="pb-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Revenue</th>
                    <th className="pb-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Rating</th>
                    <th className="pb-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-right">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {topLaundries.map((l) => (
                    <motion.tr 
                      key={l.rank} 
                      whileHover={{ backgroundColor: "rgba(241, 245, 249, 0.5)", x: 4 }}
                      onClick={() => setSelectedLaundry(l)}
                      className="border-b border-slate-50 last:border-0 transition-colors group cursor-pointer"
                    >
                      <td className="py-3 pr-2">
                        <span className={clsx(
                          "w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all group-hover:scale-110",
                          l.rank <= 3 ? "bg-[#EBA050]/10 text-[#EBA050]" : "bg-slate-100 text-slate-400"
                        )}>{l.rank}</span>
                      </td>
                      <td className="py-3">
                        <div>
                          <p className="text-[13px] font-semibold text-slate-800 group-hover:text-[#1D6076] transition-colors">{l.name}</p>
                          <p className="text-[11px] text-slate-400 flex items-center gap-1"><MapPin size={10} />{l.city}</p>
                        </div>
                      </td>
                      <td className="py-3 text-[13px] font-medium text-slate-600">{l.orders.toLocaleString()}</td>
                      <td className="py-3 text-[13px] font-semibold text-slate-800">{l.revenue}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-1">
                          <span className="text-[#EBA050] text-xs"><Star size={12} fill="currentColor" /></span>
                          <span className="text-[13px] font-medium text-slate-700">{l.rating}</span>
                        </div>
                      </td>
                      <td className="py-3 text-right">
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white shadow-sm border border-slate-100 rounded-lg text-[#1D6076] hover:bg-[#1D6076] hover:text-white">
                          <ChevronRight size={14} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div variants={anim.item} className="xl:col-span-2">
          <div className="bg-white rounded-2xl p-5 border border-slate-100/80 h-full hover:shadow-lg hover:shadow-slate-100 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#1D6076]/10 rounded-lg"><Clock size={14} className="text-[#1D6076]" /></div>
                <h3 className="text-sm font-semibold text-slate-800">Recent Orders</h3>
              </div>
              <button className="text-xs font-semibold text-[#1D6076] hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {recentOrders.map((o, idx) => (
                <motion.div 
                  key={o.id} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: -4 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-100"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-bold text-slate-800 group-hover:text-[#1D6076] transition-colors">{o.id}</span>
                      <span className={clsx("text-[10px] font-semibold px-1.5 py-0.5 rounded-md border", statusColor[o.status])}>{o.status}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 truncate flex items-center gap-1">
                      <Users size={10} /> {o.customer} <span className="mx-1">•</span> <Store size={10} /> {o.laundry}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[12px] font-semibold text-slate-700 group-hover:text-[#EBA050] transition-colors">{o.amount}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{o.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Insights Bar */}
      <motion.div variants={anim.item}>
        <div className="bg-gradient-to-r from-[#1D6076] to-[#2a8ba8] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"
          />
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Eye size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Platform Health Score</h3>
              <p className="text-xs text-white/60">Based on user satisfaction, uptime & order completion</p>
            </div>
          </div>
          <div className="flex items-center gap-6 relative z-10">
            <motion.div whileHover={{ scale: 1.1 }} className="text-center cursor-default">
              <p className="text-2xl font-bold text-white">94.7%</p>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Health Score</p>
            </motion.div>
            <div className="h-8 w-px bg-white/20 hidden sm:block" />
            <motion.div whileHover={{ scale: 1.1 }} className="text-center cursor-default">
              <p className="text-2xl font-bold text-[#EBA050]">99.9%</p>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Uptime</p>
            </motion.div>
            <div className="h-8 w-px bg-white/20 hidden sm:block" />
            <motion.div whileHover={{ scale: 1.1 }} className="text-center cursor-default">
              <p className="text-2xl font-bold text-emerald-300 flex items-center justify-center gap-1">4.7 <Star size={16} fill="currentColor" /></p>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Avg Rating</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Drill-down Modal for Laundry */}
      <AnimatePresence>
        {selectedLaundry && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLaundry(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white relative">
                <button 
                  onClick={() => setSelectedLaundry(null)}
                  className="absolute right-6 top-6 p-2 bg-white hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors shadow-sm border border-slate-100 z-10"
                >
                  <X size={16} />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1D6076] to-[#2a8ba8] flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {selectedLaundry.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedLaundry.name}</h2>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin size={14} /> {selectedLaundry.city} <span className="mx-1">•</span> <Star size={12} fill="#EBA050" className="text-[#EBA050]" /> {selectedLaundry.rating}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50"
                  >
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Orders</p>
                    <p className="text-xl font-bold text-slate-800">{selectedLaundry.orders}</p>
                  </motion.div>
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                    className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50"
                  >
                    <p className="text-xs text-emerald-600 font-medium uppercase tracking-wider mb-1">Revenue</p>
                    <p className="text-xl font-bold text-emerald-800">{selectedLaundry.revenue}</p>
                  </motion.div>
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                    className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50"
                  >
                    <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-1">Growth</p>
                    <p className="text-xl font-bold text-blue-800">{selectedLaundry.growth}</p>
                  </motion.div>
                </div>

                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                  <h4 className="text-sm font-semibold text-slate-800 mb-3">Weekly Order Performance</h4>
                  <div className="h-[140px] bg-white border border-slate-100 rounded-xl p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selectedLaundry.history.map((val, i) => ({ day: `Day ${i+1}`, orders: val }))}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                        <Line type="monotone" dataKey="orders" stroke="#EBA050" strokeWidth={3} dot={{ r: 4, fill: "#EBA050", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
                
                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="flex gap-3 pt-2">
                  <button className="flex-1 bg-[#1D6076] hover:bg-[#1D6076]/90 text-white font-medium py-3 rounded-xl transition-colors shadow-md shadow-[#1D6076]/20">
                    View Full Profile
                  </button>
                  <button className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors">
                    <Smartphone size={20} />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}