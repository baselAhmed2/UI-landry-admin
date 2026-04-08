import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, CheckCircle, XCircle, Clock, FileText, 
  ZoomIn, X, Building, User, Mail, Phone, Calendar 
} from "lucide-react";
import { toast } from "sonner";

// Mock data based on endpoint expectations
const initialRequests = [
  { 
    id: "VR-001", userId: "U-102", name: "Ahmed Al-Faisal", email: "ahmed@cleanpro.com", phone: "+966 50 123 4567",
    laundryName: "Clean Pro Laundry", city: "Riyadh", status: "Pending", submittedAt: "2026-04-04T10:30:00Z",
    idCardImageUrl: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=400&q=80",
    commercialRegisterUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "VR-002", userId: "U-105", name: "Khalid R.", email: "khalid@washhub.com", phone: "+966 55 987 6543",
    laundryName: "Wash Hub", city: "Jeddah", status: "Pending", submittedAt: "2026-04-03T14:15:00Z",
    idCardImageUrl: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=400&q=80",
    commercialRegisterUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&q=80"
  }
];

export function LaundryVerifications() {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");
  const [selectedReq, setSelectedReq] = useState<typeof initialRequests[0] | null>(null);
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const filtered = requests.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.laundryName.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleApprove = async () => {
    if (!selectedReq) return;
    setIsProcessing(true);
    // Simulate POST /api/admin/laundry-admins-verifications/{userId}/approve
    await new Promise(r => setTimeout(r, 800));
    
    setRequests(prev => prev.filter(r => r.id !== selectedReq.id));
    toast.success(`Laundry admin ${selectedReq.name} approved successfully.`);
    setIsProcessing(false);
    setSelectedReq(null);
  };

  const handleReject = async () => {
    if (!selectedReq || !rejectReason.trim()) return;
    setIsProcessing(true);
    // Simulate POST /api/admin/laundry-admins-verifications/{userId}/reject
    await new Promise(r => setTimeout(r, 800));
    
    setRequests(prev => prev.filter(r => r.id !== selectedReq.id));
    toast.success(`Request rejected. Reason sent to user.`);
    setIsProcessing(false);
    setShowRejectModal(false);
    setSelectedReq(null);
    setRejectReason("");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Verifications & Onboarding</h1>
        <p className="text-sm text-slate-500 mt-1">Review and approve new laundry partners</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, email, or laundry..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#1D6076]/20 focus:border-[#1D6076]/40 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-semibold flex items-center gap-1.5">
            <Clock size={14} /> {requests.length} Pending
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Laundry Info</th>
                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Owner</th>
                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase">City</th>
                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Submitted</th>
                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(req => (
                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#1D6076]/10 text-[#1D6076] flex items-center justify-center">
                        <Building size={16} />
                      </div>
                      <span className="font-semibold text-slate-800 text-sm">{req.laundryName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm font-medium text-slate-800">{req.name}</p>
                    <p className="text-xs text-slate-500">{req.email}</p>
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-600">{req.city}</td>
                  <td className="py-4 px-4 text-xs text-slate-500">{new Date(req.submittedAt).toLocaleDateString()}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-md text-xs font-semibold">
                      <Clock size={12} /> {req.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button 
                      onClick={() => setSelectedReq(req)}
                      className="px-3 py-1.5 bg-[#1D6076]/10 text-[#1D6076] hover:bg-[#1D6076]/20 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">No pending requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {selectedReq && !showRejectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedReq(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Review Partner Request</h2>
                  <p className="text-sm text-slate-500">ID: {selectedReq.id}</p>
                </div>
                <button onClick={() => setSelectedReq(null)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Owner Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <User size={16} className="text-slate-400" />
                        <span className="font-medium text-slate-800">{selectedReq.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Mail size={16} className="text-slate-400" />
                        <span className="text-slate-600">{selectedReq.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone size={16} className="text-slate-400" />
                        <span className="text-slate-600">{selectedReq.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px w-full bg-slate-100" />

                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Laundry Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Building size={16} className="text-slate-400" />
                        <span className="font-medium text-slate-800">{selectedReq.laundryName}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <FileText size={16} className="text-slate-400" />
                        <span className="text-slate-600">{selectedReq.city}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar size={16} className="text-slate-400" />
                        <span className="text-slate-600">Submitted: {new Date(selectedReq.submittedAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="space-y-6">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Verification Documents</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-700">ID Card</p>
                      <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50 cursor-pointer" onClick={() => setZoomedImg(selectedReq.idCardImageUrl)}>
                        <img src={selectedReq.idCardImageUrl} alt="ID Card" className="w-full h-32 object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                          <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-700">Commercial Register</p>
                      <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50 cursor-pointer" onClick={() => setZoomedImg(selectedReq.commercialRegisterUrl)}>
                        <img src={selectedReq.commercialRegisterUrl} alt="Commercial Register" className="w-full h-32 object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                          <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setShowRejectModal(true)}
                  disabled={isProcessing}
                  className="px-6 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl font-semibold text-sm hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <XCircle size={16} /> Reject
                </button>
                <button 
                  onClick={handleApprove}
                  disabled={isProcessing}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                >
                  {isProcessing ? <Clock size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                  Approve Request
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reject Reason Modal */}
      <AnimatePresence>
        {showRejectModal && selectedReq && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowRejectModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Reject Request</h3>
              <p className="text-sm text-slate-500 mb-4">Please provide a reason for rejecting {selectedReq.name}'s request. This will be sent to their email.</p>
              
              <textarea 
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="e.g., The commercial register document is blurred..."
                className="w-full h-32 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500/40 resize-none outline-none mb-4"
              />

              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowRejectModal(false)} className="px-4 py-2 text-slate-600 font-medium text-sm hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                <button 
                  onClick={handleReject}
                  disabled={!rejectReason.trim() || isProcessing}
                  className="px-4 py-2 bg-red-500 text-white font-medium text-sm rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors flex items-center gap-2"
                >
                  {isProcessing ? <Clock size={16} className="animate-spin" /> : null}
                  Confirm Rejection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Image Zoom Lightbox */}
      <AnimatePresence>
        {zoomedImg && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={() => setZoomedImg(null)}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" />
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              src={zoomedImg} alt="Zoomed Document" 
              className="relative max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
            <button className="absolute top-6 right-6 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-md">
              <X size={24} />
            </button>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}