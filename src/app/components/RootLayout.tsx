import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  ShoppingBag,
  WashingMachine,
  CalendarDays,
  Bell,
  Wallet,
  Menu,
  X,
  LogOut,
  ChevronRight
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_LINKS = [
  { path: "/", label: "الرئيسية", icon: LayoutDashboard },
  { path: "/orders", label: "الطلبات", icon: ShoppingBag },
  { path: "/services", label: "الخدمات", icon: WashingMachine },
  { path: "/availability", label: "التوافر", icon: CalendarDays },
  { path: "/payments", label: "المدفوعات", icon: Wallet },
  { path: "/notifications", label: "الإشعارات", icon: Bell },
];

export function RootLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 overflow-hidden font-sans" dir="rtl">
      {/* Mobile Header */}
      <header className="lg:hidden absolute top-0 left-0 right-0 h-16 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-2">
          <WashingMachine className="w-8 h-8 text-blue-600" />
          <span className="font-bold text-xl">نظيف</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Sidebar Overlay — two keyed direct children instead of a fragment */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />
        )}
        {isMobileMenuOpen && (
          <motion.aside
            key="mobile-sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="lg:hidden fixed top-0 bottom-0 right-0 w-72 bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 z-50 flex flex-col shadow-2xl"
          >
            <SidebarContent closeMenu={closeMenu} location={location.pathname} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 flex-col relative z-20">
        <SidebarContent location={location.pathname} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full relative h-full flex flex-col pt-16 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
}

function SidebarContent({ closeMenu, location }: { closeMenu?: () => void, location: string }) {
  return (
    <>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white">
            <WashingMachine className="w-6 h-6" />
          </div>
          <div>
            <span className="font-bold text-xl block leading-none">نظيف</span>
            <span className="text-xs text-neutral-500 font-medium">لوحة تحكم المغسلة</span>
          </div>
        </div>
        {closeMenu && (
          <button onClick={closeMenu} className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="px-4 py-2">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent w-full" />
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {NAV_LINKS.map((link) => {
          const isActive = location === link.path || (link.path !== '/' && location.startsWith(link.path));
          return (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "text-blue-600 bg-blue-50 dark:bg-blue-500/10 font-medium"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute right-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <link.icon className={cn("w-5 h-5 transition-transform duration-200", isActive ? "scale-110" : "group-hover:scale-110")} />
              <span>{link.label}</span>
              {link.path === '/notifications' && (
                <span className="mr-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center justify-center">
                  3
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-neutral-200 dark:border-neutral-800">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-200 font-medium">
          <LogOut className="w-5 h-5" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </>
  );
}
