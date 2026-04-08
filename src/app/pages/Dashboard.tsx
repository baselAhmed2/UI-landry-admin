import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
  Star,
  Waves,
  Users,
  AlertCircle,
} from "lucide-react";

const stats = [
  { label: "إجمالي الطلبات", value: "128", change: "+12%", icon: ShoppingBag, color: "from-blue-500 to-blue-600", bg: "bg-blue-50", text: "text-blue-600" },
  { label: "قيد التنفيذ", value: "24", change: "+5%", icon: Clock, color: "from-amber-500 to-orange-500", bg: "bg-amber-50", text: "text-amber-600" },
  { label: "مكتملة اليوم", value: "18", change: "+8%", icon: CheckCircle, color: "from-emerald-500 to-green-600", bg: "bg-emerald-50", text: "text-emerald-600" },
  { label: "إيرادات الشهر", value: "8,450 ر.س", change: "+15%", icon: TrendingUp, color: "from-purple-500 to-violet-600", bg: "bg-purple-50", text: "text-purple-600" },
];

const recentOrders = [
  { id: "ORD-001", customer: "أحمد محمد", service: "غسيل وكي", status: "جديد", amount: "85 ر.س", time: "منذ 5 دقائق", color: "bg-blue-100 text-blue-700" },
  { id: "ORD-002", customer: "سارة العمري", service: "تنظيف جاف", status: "جارٍ", amount: "120 ر.س", time: "منذ 20 دقيقة", color: "bg-amber-100 text-amber-700" },
  { id: "ORD-003", customer: "محمد خالد", service: "غسيل سريع", status: "مكتمل", amount: "60 ر.س", time: "منذ ساعة", color: "bg-green-100 text-green-700" },
  { id: "ORD-004", customer: "نورة السعيد", service: "كوي فقط", status: "جاهز", amount: "40 ر.س", time: "منذ ساعتين", color: "bg-purple-100 text-purple-700" },
  { id: "ORD-005", customer: "فهد الشمري", service: "غسيل وتنشيف", status: "جديد", amount: "95 ر.س", time: "منذ 3 ساعات", color: "bg-blue-100 text-blue-700" },
];

export default function Dashboard() {
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 lg:p-6 space-y-6" dir="rtl">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-blue-600 via-blue-700 to-slate-800 p-6 text-white shadow-xl">
        <div className="relative z-10">
          <p className="text-blue-200 text-sm mb-1">مرحباً بك في</p>
          <h2 className="text-2xl font-black mb-2">لوحة إدارة مغسلة النظافة</h2>
          <p className="text-blue-100 text-sm">لديك <span className="font-bold text-white">24 طلب</span> قيد التنفيذ الآن</p>
          <NavLink to="/orders" className="mt-4 inline-flex items-center gap-2 bg-white text-blue-700 text-sm font-bold px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors">
            عرض الطلبات
            <ArrowUpRight className="w-4 h-4" />
          </NavLink>
        </div>
        <div className="absolute left-0 top-0 w-64 h-full opacity-10">
          <Waves className="w-full h-full" />
        </div>
        <div className="absolute -left-8 -bottom-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 transition-all duration-500 ${animateStats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.text}`} />
            </div>
            <p className="text-gray-500 text-xs mb-1">{stat.label}</p>
            <p className="text-gray-900 font-black text-xl">{stat.value}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-600 text-xs font-semibold">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-800">آخر الطلبات</h3>
            </div>
            <NavLink to="/orders" className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
              عرض الكل
              <ArrowUpRight className="w-3 h-3" />
            </NavLink>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders.map((order) => (
              <NavLink
                key={order.id}
                to={`/orders/${order.id}`}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {order.customer[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm">{order.customer}</p>
                  <p className="text-gray-500 text-xs truncate">{order.service}</p>
                </div>
                <div className="text-left">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${order.color}`}>{order.status}</span>
                  <p className="text-gray-500 text-xs mt-1 text-center">{order.time}</p>
                </div>
                <p className="font-bold text-gray-800 text-sm">{order.amount}</p>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-gray-800">التقييم العام</h3>
            </div>
            <div className="text-center py-2">
              <p className="text-5xl font-black text-gray-900 mb-1">4.8</p>
              <div className="flex justify-center gap-1 mb-2">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-4 h-4 ${i <= 4 ? "fill-amber-400 text-amber-400" : "fill-amber-200 text-amber-200"}`} />
                ))}
              </div>
              <p className="text-gray-500 text-xs">من 234 تقييم</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-800">العملاء</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">إجمالي العملاء</span>
                <span className="font-bold text-gray-900">456</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">عملاء جدد</span>
                <span className="font-bold text-emerald-600">+28</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">عملاء متكررون</span>
                <span className="font-bold text-blue-600">78%</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-800 font-semibold text-sm">تنبيه</p>
                <p className="text-amber-700 text-xs mt-1">3 طلبات تجاوزت وقت التسليم المحدد</p>
                <NavLink to="/orders" className="text-amber-700 text-xs font-bold underline mt-1 inline-block">
                  مراجعة الطلبات
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
