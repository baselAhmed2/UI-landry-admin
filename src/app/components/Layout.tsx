import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router";
import {
  LayoutDashboard,
  ShoppingBag,
  Scissors,
  Calendar,
  Bell,
  CreditCard,
  Menu,
  X,
  ChevronLeft,
  LogOut,
  Settings,
  Waves,
} from "lucide-react";

const navItems = [
  { path: "/", label: "لوحة التحكم", icon: LayoutDashboard, exact: true },
  { path: "/orders", label: "الطلبات", icon: ShoppingBag },
  { path: "/services", label: "الخدمات", icon: Scissors },
  { path: "/availability", label: "التوافر", icon: Calendar },
  { path: "/notifications", label: "الإشعارات", icon: Bell, badge: 3 },
  { path: "/payments", label: "المدفوعات", icon: CreditCard },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden" dir="rtl">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 h-full z-50 flex flex-col
          bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
          shadow-2xl transition-all duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
          ${collapsed ? "w-20" : "w-72"}
        `}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 p-5 border-b border-white/10 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg flex-shrink-0">
            <Waves className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-white font-black text-xl tracking-wide">Ndeef</h1>
              <p className="text-slate-400 text-xs">لوحة إدارة المغسلة</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden mr-auto text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Collapse Toggle - Desktop */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -left-3 top-16 w-6 h-6 rounded-full bg-blue-500 text-white items-center justify-center shadow-lg hover:bg-blue-600 transition-colors z-10"
        >
          <ChevronLeft className={`w-3 h-3 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
        </button>

        {/* Nav Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`
                  relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive
                    ? "bg-gradient-to-l from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-400 hover:bg-white/10 hover:text-white"
                  }
                  ${collapsed ? "justify-center px-3" : ""}
                `}
              >
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-l-full" />
                )}
                <item.icon className={`flex-shrink-0 ${collapsed ? "w-6 h-6" : "w-5 h-5"}`} />
                {!collapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span className="mr-auto bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
                {collapsed && item.badge && (
                  <span className="absolute -top-1 -left-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-200 ${collapsed ? "justify-center" : ""}`}>
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">الإعدادات</span>}
          </button>
          <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 ${collapsed ? "justify-center" : ""}`}>
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">تسجيل الخروج</span>}
          </button>
          {!collapsed && (
            <div className="flex items-center gap-3 px-4 py-3 mt-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                م
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold truncate">مغسلة النظافة</p>
                <p className="text-slate-400 text-xs truncate">admin@ndeef.sa</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center gap-4 flex-shrink-0 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2 className="text-gray-800 font-bold text-lg">
              {navItems.find(i => i.exact ? location.pathname === i.path : location.pathname.startsWith(i.path))?.label || "لوحة التحكم"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <NavLink to="/notifications" className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </NavLink>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
              م
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
