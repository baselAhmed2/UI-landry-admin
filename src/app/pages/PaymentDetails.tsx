import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Wallet,
  CheckCircle2,
  AlertCircle,
  Building,
  Calendar,
  Clock,
  Printer,
  Download,
  Building2,
  FileText
} from "lucide-react";

export function PaymentDetails() {
  const { id } = useParams();

  const payment = {
    id: id || "TRX-101",
    amount: 1200,
    status: "completed",
    date: "2026-04-06",
    time: "14:30 ص",
    method: "bank_transfer",
    reference: "B-7645321",
    type: "withdrawal",
    fee: 5.75,
    netAmount: 1194.25,
    bankInfo: {
      bankName: "مصرف الراجحي",
      accountName: "مغسلة نظيف",
      iban: "SA00 0000 0000 0000 0000 0000",
      swift: "RJHI SARI"
    },
    timeline: [
      { status: "requested", date: "2026-04-05", time: "10:00 ص", label: "تم طلب التحويل" },
      { status: "processing", date: "2026-04-05", time: "11:30 ص", label: "جاري المعالجة من قبل الإدارة" },
      { status: "completed", date: "2026-04-06", time: "14:30 ص", label: "تم التحويل بنجاح" }
    ]
  };

  const isCompleted = payment.status === 'completed';

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 md:p-8 max-w-5xl mx-auto w-full"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link 
            to="/payments" 
            className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
              تفاصيل العملية {payment.id}
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {isCompleted ? 'مكتمل' : 'قيد المعالجة'}
              </span>
            </h1>
            <p className="text-neutral-500 text-sm mt-1 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {payment.date}
              <Clock className="w-4 h-4 ml-2" /> {payment.time}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-700 dark:text-neutral-300 font-medium flex items-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> إيصال التحويل
          </button>
          <button className="px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-700 dark:text-neutral-300 font-medium flex items-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-sm">
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm relative overflow-hidden">
            {isCompleted ? (
              <div className="absolute right-0 top-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
            ) : (
              <div className="absolute right-0 top-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl" />
            )}
            
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2 relative z-10">
              <FileText className="w-5 h-5 text-blue-600" /> ملخص العملية
            </h2>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center p-8 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800 mb-8 relative z-10">
              <div className="text-center">
                <p className="text-neutral-500 text-sm font-medium mb-1">المبلغ الإجمالي</p>
                <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">SAR {payment.amount}</h3>
              </div>
              
              <div className="hidden md:flex h-12 w-px bg-neutral-200 dark:bg-neutral-700 mx-4" />
              
              <div className="text-center">
                <p className="text-neutral-500 text-sm font-medium mb-1">رسوم التحويل</p>
                <h3 className="text-xl font-bold text-red-500">- SAR {payment.fee}</h3>
              </div>

              <div className="hidden md:flex h-12 w-px bg-neutral-200 dark:bg-neutral-700 mx-4" />
              
              <div className="text-center">
                <p className="text-neutral-500 text-sm font-medium mb-1">صافي التحويل</p>
                <h3 className="text-3xl font-bold text-green-600">SAR {payment.netAmount}</h3>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-800">
                <span className="text-neutral-500">طريقة التحويل</span>
                <div className="flex items-center gap-2 font-medium text-neutral-900 dark:text-white">
                  <Building className="w-4 h-4 text-blue-600" /> تحويل بنكي
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-800">
                <span className="text-neutral-500">الرقم المرجعي</span>
                <span className="font-mono font-medium text-neutral-900 dark:text-white">{payment.reference}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-neutral-500">نوع العملية</span>
                <span className="font-medium text-neutral-900 dark:text-white">سحب أرباح</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" /> بيانات البنك المستلم
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800">
                <p className="text-neutral-500 text-sm mb-1">اسم البنك</p>
                <p className="font-bold text-neutral-900 dark:text-white">{payment.bankInfo.bankName}</p>
              </div>
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800">
                <p className="text-neutral-500 text-sm mb-1">اسم الحساب</p>
                <p className="font-bold text-neutral-900 dark:text-white">{payment.bankInfo.accountName}</p>
              </div>
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800 md:col-span-2">
                <p className="text-neutral-500 text-sm mb-1">رقم الآيبان (IBAN)</p>
                <p className="font-mono font-bold text-neutral-900 dark:text-white tracking-widest text-left mt-2 px-4 py-2 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 inline-block w-full">{payment.bankInfo.iban}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-6">تتبع العملية</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 dark:before:via-neutral-700 before:to-transparent">
              
              {payment.timeline.map((step, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full border-4 border-white dark:border-neutral-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 ${
                    i === payment.timeline.length - 1 ? (isCompleted ? 'bg-green-600 text-white' : 'bg-yellow-500 text-white') : 'bg-blue-600 text-white'
                  }`}>
                    {i === payment.timeline.length - 1 && isCompleted ? <CheckCircle2 className="w-3 h-3" /> : (i === payment.timeline.length - 1 && !isCompleted ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />)}
                  </div>
                  <div className={`w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl shadow-sm md:group-odd:pr-6 md:group-even:pl-6 ${
                    i === payment.timeline.length - 1 
                      ? (isCompleted ? 'border border-green-200 bg-green-50 dark:border-green-900/30 dark:bg-green-900/10' : 'border border-yellow-200 bg-yellow-50 dark:border-yellow-900/30 dark:bg-yellow-900/10')
                      : 'border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900'
                  }`}>
                    <div className="flex items-center justify-between space-x-2 space-x-reverse mb-1">
                      <div className={`font-bold ${
                        i === payment.timeline.length - 1 
                          ? (isCompleted ? 'text-green-800 dark:text-green-200' : 'text-yellow-800 dark:text-yellow-200')
                          : 'text-neutral-900 dark:text-white'
                      }`}>{step.label}</div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium opacity-70">
                      <span>{step.date}</span>
                      <span>•</span>
                      <span>{step.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {!isCompleted && (
               <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex gap-3 text-blue-800 dark:text-blue-200 border border-blue-100 dark:border-blue-900/30">
                 <AlertCircle className="w-5 h-5 shrink-0" />
                 <p className="text-sm">عادة ما تستغرق التحويلات البنكية من 24 إلى 48 ساعة عمل للوصول إلى حسابك.</p>
               </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
