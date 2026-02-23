
import React, { useState, useMemo } from 'react';
import { SiteData, Appointment, Doctor } from '../types';
import { 
  User, 
  Phone, 
  Mail, 
  CheckCircle, 
  ShieldCheck,
  CalendarDays,
  Smartphone,
  Landmark,
  CreditCard,
  QrCode,
  ArrowLeft,
  Loader2,
  Stethoscope,
  ChevronRight,
  Clock,
  Building2,
  AlertCircle
} from 'lucide-react';
import { getDeptIcon } from './Departments';

const AppointmentBooking: React.FC<{ data: SiteData; updateData: (d: SiteData) => void }> = ({ data, updateData }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    departmentId: '',
    doctorId: '',
    date: '',
    time: '',
    paymentMethod: 'JazzCash' as 'JazzCash' | 'EasyPaisa' | 'Bank',
    transactionId: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Memoized filtered doctors based on selected department
  const availableDoctors = useMemo(() => {
    if (!formData.departmentId) return [];
    return data.doctors.filter(doc => doc.departmentId === formData.departmentId);
  }, [formData.departmentId, data.doctors]);

  const selectedDoctor = data.doctors.find(d => d.id === formData.doctorId);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.patientName.trim()) newErrors.patientName = "Patient name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Valid email is required";
    if (!formData.phone.match(/^\d{10,15}$/)) newErrors.phone = "Valid contact number is required (10-15 digits)";
    if (!formData.departmentId) newErrors.departmentId = "Please select a medical department";
    if (!formData.doctorId) newErrors.doctorId = "Please select a specialist";
    if (!formData.date) newErrors.date = "Consultation date is required";
    if (!formData.time) newErrors.time = "Preferred time slot is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setIsLoading(true);
      setTimeout(() => {
        setStep(2);
        setIsLoading(false);
        window.scrollTo(0, 0);
      }, 800);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.transactionId.trim()) {
      setErrors({ transactionId: "Transaction Reference (TID) is mandatory" });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      const newAppointment: Appointment = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        ...formData,
        status: 'Pending',
        paymentStatus: 'Verified'
      };
      updateData({
        ...data,
        appointments: [...data.appointments, newAppointment]
      });
      setSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  const getActivePaymentNumber = () => {
    const config = data.paymentConfig?.appointment;
    if (!config) return 'Contact Support';
    if (formData.paymentMethod === 'JazzCash') return config.jazzCashNumber;
    if (formData.paymentMethod === 'EasyPaisa') return config.easyPaisaNumber;
    return config.bankIban;
  };

  if (submitted) {
    return (
      <div className="py-24 bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-xl w-full text-center space-y-10 animate-in fade-in zoom-in duration-700">
          <div className="w-32 h-32 bg-green-100 text-brand-tertiary rounded-full flex items-center justify-center shadow-xl mx-auto border-8 border-white">
            <CheckCircle size={64} />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-secondary font-serif italic">Request Received!</h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">Your priority visit with <span className="text-brand-primary font-bold">{selectedDoctor?.name}</span> has been logged. Our clinical desk will confirm via WhatsApp/Call shortly.</p>
          </div>
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 space-y-8">
            <div className="bg-[#fcfaf7] p-8 rounded-3xl border border-[#f0e6d2] text-center">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Institutional Reference (TID)</p>
               <p className="text-4xl font-black text-brand-primary tracking-[0.2em] font-mono">{formData.transactionId}</p>
            </div>
            <div className="text-left space-y-3">
               <div className="flex justify-between text-sm"><span className="text-slate-400 font-bold">Patient:</span> <span className="text-brand-secondary font-black">{formData.patientName}</span></div>
               <div className="flex justify-between text-sm"><span className="text-slate-400 font-bold">Schedule:</span> <span className="text-brand-secondary font-black">{formData.date} at {formData.time}</span></div>
            </div>
          </div>
          <button onClick={() => window.location.href = '/'} className="w-full bg-brand-primary text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-brand-secondary transition-all shadow-xl active:scale-95">Return to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-[#fcfaf7] min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Progress Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-brand-secondary font-serif italic leading-tight">Institutional <br/><span className="text-brand-primary">Appointment</span></h1>
            <p className="text-slate-400 font-medium mt-3">Verified medical consultation registry.</p>
          </div>
          <div className="flex items-center gap-6 bg-white p-4 rounded-full shadow-xl border border-slate-100">
            <div className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all ${step === 1 ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-400'}`}>
              <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-[10px] font-bold">1</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Clinical Data</span>
            </div>
            <div className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all ${step === 2 ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-400'}`}>
              <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-[10px] font-bold">2</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Verification</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[700px] border border-slate-100">
          {/* Sidebar Summary */}
          <div className="lg:col-span-4 bg-brand-secondary p-10 md:p-14 text-white space-y-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
               <Stethoscope size={300} />
            </div>
            
            <div className="relative z-10 space-y-10">
               <div>
                 <h2 className="text-3xl font-bold font-serif mb-4 italic">Visit Summary</h2>
                 <p className="text-white/60 text-sm leading-relaxed">Your selection determines clinical priority and scheduling within our multi-specialty registry.</p>
               </div>

               <div className="space-y-6">
                 {formData.departmentId && (
                   <div className="flex gap-4 animate-in fade-in slide-in-from-left duration-300">
                     <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0"><Building2 size={18} /></div>
                     <div><p className="text-[9px] font-black uppercase text-brand-tertiary tracking-widest">Sector</p><p className="font-bold">{data.departments.find(d => d.id === formData.departmentId)?.name}</p></div>
                   </div>
                 )}
                 {selectedDoctor && (
                   <div className="flex gap-4 animate-in fade-in slide-in-from-left duration-500">
                     <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0"><User size={18} /></div>
                     <div><p className="text-[9px] font-black uppercase text-brand-tertiary tracking-widest">Specialist</p><p className="font-bold">{selectedDoctor.name}</p></div>
                   </div>
                 )}
               </div>

               <div className="p-8 bg-brand-primary rounded-[2.5rem] shadow-2xl border border-white/10">
                  <p className="text-[10px] uppercase font-black text-brand-tertiary tracking-[0.3em] mb-2">Total Consultation Fee</p>
                  <p className="text-3xl font-black">PKR {selectedDoctor?.fee || '1000/-'}</p>
               </div>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="lg:col-span-8 p-10 md:p-16">
            {step === 1 ? (
              <div className="space-y-10 animate-in fade-in slide-in-from-right duration-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">Patient Full Name <span className="text-red-500">*</span></label>
                    <div className="relative group">
                      <User className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${errors.patientName ? 'text-red-400' : 'text-slate-300 group-focus-within:text-brand-primary'}`} size={20} />
                      <input 
                        required 
                        type="text" 
                        className={`w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl border outline-none transition-all font-bold text-brand-secondary ${errors.patientName ? 'border-red-200 bg-red-50/50' : 'border-slate-100 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/5'}`} 
                        placeholder="John Doe" 
                        value={formData.patientName} 
                        onChange={(e) => setFormData({...formData, patientName: e.target.value})} 
                      />
                    </div>
                    {errors.patientName && <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.patientName}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">Contact Number <span className="text-red-500">*</span></label>
                    <div className="relative group">
                      <Phone className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${errors.phone ? 'text-red-400' : 'text-slate-300 group-focus-within:text-brand-primary'}`} size={20} />
                      <input 
                        required 
                        type="tel" 
                        className={`w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl border outline-none transition-all font-bold text-brand-secondary ${errors.phone ? 'border-red-200 bg-red-50/50' : 'border-slate-100 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/5'}`} 
                        placeholder="03XX XXXXXXX" 
                        value={formData.phone} 
                        onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})} 
                      />
                    </div>
                    {errors.phone && <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.phone}</p>}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">Email Address <span className="text-red-500">*</span></label>
                  <div className="relative group">
                    <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-400' : 'text-slate-300 group-focus-within:text-brand-primary'}`} size={20} />
                    <input 
                      required 
                      type="email" 
                      className={`w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl border outline-none transition-all font-bold text-brand-secondary ${errors.email ? 'border-red-200 bg-red-50/50' : 'border-slate-100 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/5'}`} 
                      placeholder="patient@example.com" 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Department Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">Select Medical Sector <span className="text-red-500">*</span></label>
                    <div className="relative group">
                      <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary" size={20} />
                      <select 
                        required 
                        className={`w-full pl-14 pr-10 py-5 bg-slate-50 border rounded-2xl outline-none appearance-none font-bold text-brand-secondary cursor-pointer transition-all ${errors.departmentId ? 'border-red-200 bg-red-50' : 'border-slate-100 focus:border-brand-primary focus:bg-white'}`} 
                        value={formData.departmentId} 
                        onChange={(e) => setFormData({...formData, departmentId: e.target.value, doctorId: ''})}
                      >
                        <option value="">Choose Department</option>
                        {data.departments.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
                      </select>
                      <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-slate-300 pointer-events-none" size={20} />
                    </div>
                    {errors.departmentId && <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.departmentId}</p>}
                  </div>

                  {/* Doctor Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">Choose Consultant <span className="text-red-500">*</span></label>
                    <div className="relative group">
                      <Stethoscope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary" size={20} />
                      <select 
                        required 
                        disabled={!formData.departmentId}
                        className={`w-full pl-14 pr-10 py-5 bg-slate-50 border rounded-2xl outline-none appearance-none font-bold text-brand-secondary cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.doctorId ? 'border-red-200 bg-red-50' : 'border-slate-100 focus:border-brand-primary focus:bg-white'}`} 
                        value={formData.doctorId} 
                        onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
                      >
                        <option value="">{formData.departmentId ? 'Select Specialist' : 'Select Department First'}</option>
                        {availableDoctors.map(doc => <option key={doc.id} value={doc.id}>{doc.name}</option>)}
                      </select>
                      <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-slate-300 pointer-events-none" size={20} />
                    </div>
                    {errors.doctorId && <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.doctorId}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Date */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">Consultation Date <span className="text-red-500">*</span></label>
                    <input 
                      type="date" 
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-6 py-5 bg-slate-50 border rounded-2xl outline-none font-bold text-brand-secondary transition-all ${errors.date ? 'border-red-200 bg-red-50' : 'border-slate-100 focus:border-brand-primary focus:bg-white'}`} 
                      value={formData.date} 
                      onChange={(e) => setFormData({...formData, date: e.target.value})} 
                    />
                    {errors.date && <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.date}</p>}
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">Preferred Slot <span className="text-red-500">*</span></label>
                    <div className="relative group">
                      <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary" size={20} />
                      <input 
                        type="time" 
                        className={`w-full pl-14 pr-6 py-5 bg-slate-50 border rounded-2xl outline-none font-bold text-brand-secondary transition-all ${errors.time ? 'border-red-200 bg-red-50' : 'border-slate-100 focus:border-brand-primary focus:bg-white'}`} 
                        value={formData.time} 
                        onChange={(e) => setFormData({...formData, time: e.target.value})} 
                      />
                    </div>
                    {errors.time && <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.time}</p>}
                  </div>
                </div>

                <button 
                  disabled={isLoading} 
                  onClick={handleNextStep} 
                  className="w-full bg-brand-primary text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-xs hover:bg-brand-secondary transition-all flex items-center justify-center gap-4 shadow-2xl disabled:opacity-70 active:scale-[0.98]"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : <><ShieldCheck size={20} /> Verify Details & Proceed</>}
                </button>
              </div>
            ) : (
              <div className="space-y-10 animate-in fade-in slide-in-from-right duration-700">
                <button onClick={() => setStep(1)} className="text-slate-400 hover:text-brand-primary flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-colors"><ArrowLeft size={16} /> Modified Selection</button>
                
                <div className="space-y-6">
                   <h3 className="text-2xl font-bold text-brand-secondary font-serif">Payment Verification</h3>
                   <p className="text-sm text-slate-500 font-medium">To confirm your priority consultation slot, please transfer the fee to one of our official accounts and provide the Transaction Reference (TID) below.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { id: 'JazzCash', name: 'JAZZCASH', icon: <Smartphone size={24} /> },
                    { id: 'EasyPaisa', name: 'EASYPAISA', icon: <Smartphone size={24} /> },
                    { id: 'Bank', name: (data.paymentConfig?.appointment?.bankName || 'BANK').toUpperCase(), icon: <Landmark size={24} /> }
                  ].map(method => (
                    <button 
                      key={method.id} 
                      type="button" 
                      onClick={() => setFormData({...formData, paymentMethod: method.id as any})} 
                      className={`p-10 rounded-[2.5rem] border-2 transition-all flex flex-col items-center justify-center gap-6 group relative h-48 ${formData.paymentMethod === method.id ? 'border-brand-secondary bg-brand-secondary/5 shadow-2xl' : 'border-slate-100 hover:border-slate-200 bg-white shadow-sm'}`}
                    >
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${formData.paymentMethod === method.id ? 'bg-brand-secondary text-white' : 'bg-slate-50 text-slate-300 group-hover:text-brand-secondary'}`}>
                         {method.icon}
                       </div>
                       <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${formData.paymentMethod === method.id ? 'text-brand-secondary' : 'text-slate-400'}`}>
                         {method.name}
                       </span>
                    </button>
                  ))}
                </div>

                {/* Specific Box UI matching the screenshot */}
                <div className="p-10 bg-[#fcf9f2] rounded-[3.5rem] border border-[#f0e8d5] shadow-sm space-y-8 animate-in fade-in duration-500">
                   <div className="flex justify-between items-center text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">
                      <span>OFFICIAL ACCOUNT</span>
                      <span className="text-brand-primary">{(data.paymentConfig?.appointment?.accountName || 'NBMH REGISTRY').toUpperCase()}</span>
                   </div>
                   <div className="h-px bg-[#ece0c6]/50"></div>
                   <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">ACCOUNT DETAILS</span>
                      <span className="text-3xl md:text-4xl font-black text-[#0e3fa7] tracking-tight">
                        {getActivePaymentNumber()}
                      </span>
                   </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-black text-brand-primary uppercase tracking-[0.3em] ml-2 flex items-center gap-2">ENTER TRANSACTION REFERENCE (TID) <span className="text-red-500">*</span></label>
                  <div className="relative group">
                    <CreditCard className={`absolute left-8 top-1/2 -translate-y-1/2 transition-colors ${errors.transactionId ? 'text-red-400' : 'text-slate-200 group-focus-within:text-brand-secondary'}`} size={28} />
                    <input 
                      required 
                      type="text" 
                      className={`w-full pl-20 pr-8 py-7 bg-white rounded-[2.5rem] border-2 outline-none transition-all font-black text-2xl text-brand-secondary tracking-[0.3em] placeholder:tracking-normal placeholder:font-bold placeholder:text-sm ${errors.transactionId ? 'border-red-100' : 'border-slate-100 focus:border-brand-secondary focus:ring-8 focus:ring-brand-secondary/5'}`} 
                      placeholder="ENTER TID CODE" 
                      value={formData.transactionId} 
                      onChange={(e) => setFormData({...formData, transactionId: e.target.value.toUpperCase()})} 
                    />
                  </div>
                  {errors.transactionId && <p className="text-[10px] text-red-500 font-bold ml-4 flex items-center gap-1"><AlertCircle size={10}/> {errors.transactionId}</p>}
                </div>

                <button 
                  type="submit" 
                  onClick={handleSubmit} 
                  disabled={isLoading}
                  className="w-full bg-brand-primary text-white py-7 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-sm hover:bg-brand-secondary transition-all shadow-2xl active:scale-[0.98] flex items-center justify-center gap-4"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={24} /> : 'FINALIZE INSTITUTION VISIT'}
                </button>
                
                <p className="text-center text-[9px] font-black uppercase text-slate-300 tracking-[0.3em]">SECURE CLINICAL RECORDING SYSTEM • NBMH REGISTRY</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
