import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import clsx from "clsx";
import {
  LayoutDashboard,
  Store,
  Users,
  ShieldAlert,
  Wallet,
  BarChart3,
  Bell,
  X,
  LogOut,
  Settings,
  HelpCircle,
  CheckSquare
} from "lucide-react";

const mainNav = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Store, label: "Laundries", path: "/admin/laundries" },
  { icon: CheckSquare, label: "Verifications", path: "/admin/verifications", badge: 4 },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: ShieldAlert, label: "Fraud Monitor", path: "/admin/fraud", badge: 3 },
  { icon: Wallet, label: "Commissions", path: "/admin/commissions" },
  { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
  { icon: Bell, label: "Notifications", path: "/admin/notifications", badge: 5 },
];

const bottomNav = [
  { icon: Settings, label: "Settings", path: "/admin/settings" },
  { icon: HelpCircle, label: "Help Center", path: "/admin/help" },
];

export function Sidebar({ open, setOpen }: { open: boolean; setOpen: (val: boolean) => void }) {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  const NavItem = ({ item }: { item: (typeof mainNav)[0] }) => {
    const active = isActive(item.path);
    return (
      <Link
        to={item.path}
        onClick={() => setOpen(false)}
        className={clsx(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group relative",
          active
            ? "text-white"
            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
        )}
      >
        {active && (
          <motion.div
            layoutId="sidebar-active"
            className="absolute inset-0 bg-gradient-to-r from-[#1D6076] to-[#1D6076]/90 rounded-xl shadow-lg shadow-[#1D6076]/25"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        <item.icon
          size={18}
          strokeWidth={2}
          className={clsx(
            "relative z-10 transition-colors",
            active ? "text-[#EBA050]" : "text-slate-400 group-hover:text-[#1D6076]"
          )}
        />
        <span className="relative z-10 flex-1">{item.label}</span>
        {item.badge && (
          <span
            className={clsx(
              "relative z-10 min-w-[20px] h-5 flex items-center justify-center rounded-full text-[10px] font-bold px-1.5",
              active ? "bg-white/20 text-white" : "bg-red-100 text-red-600"
            )}
          >
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <>
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-[260px] bg-white/95 backdrop-blur-xl border-r border-slate-100/80 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        dir="ltr"
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-[72px] px-5 border-b border-slate-100/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1D6076] to-[#2a8ba8] flex items-center justify-center text-white font-bold text-base shadow-lg shadow-[#1D6076]/20">
              N
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800 tracking-tight leading-none">Ndeef</h1>
              <p className="text-[10px] font-semibold text-[#EBA050] tracking-widest uppercase mt-0.5">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Main Nav */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Main Menu</p>
          {mainNav.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}

          <div className="!mt-6">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Support</p>
            {bottomNav.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-3 border-t border-slate-100/60">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100/50">
            <img
              src="https://ui-avatars.com/api/?name=Ahmed+M&background=1D6076&color=fff&size=80"
              alt="Admin"
              className="w-9 h-9 rounded-lg object-cover shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-semibold text-slate-800 truncate">Ahmed M.</h4>
              <p className="text-[11px] text-slate-400">Super Admin</p>
            </div>
            <button className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </>
  );
}
