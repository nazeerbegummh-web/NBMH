
import React, { useState } from 'react';
import { Appointment, Doctor } from '../types';
import { Search, User, Calendar, Clock, CheckCircle, XCircle, AlertCircle, ShieldCheck, Smartphone, Landmark, ArrowRight, MessageSquare, Sparkles, Info } from 'lucide-react';

interface CheckStatusProps { appointments: Appointment[]; doctors: Doctor[]; }

const CheckStatus: React.FC<CheckStatusProps> = ({ appointments, doctors }) => {
  const [query, setQuery] = useState('');
  const [foundAppointments, setFoundAppointments] = useState<Appointment[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = appointments.filter(a => a.email.toLowerCase() === query.toLowerCase() || a.phone === query || (a.transactionId && a.transactionId.toLowerCase() === query.toLowerCase()));
    setFoundAppointments(results.length > 0 ? results : null);
    setHasSearched(true);
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-brand-tertiary border-green-200';
      case 'Completed': return 'bg-blue-100 text-brand-secondary border-blue-200';
      case 'Cancelled': return 'bg-red-100 text-brand-primary border-red-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div className="py-24 bg-[#f8fafc] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-brand-primary font-black uppercase tracking-[0.4em] text-[10px] mb-2">Patient Portal</p>
        <h1 className="text-5xl md:text-6xl font-bold text-brand-secondary font-serif mb-16">Track Your Visit</h1>
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 mb-12">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
              <input required type="text" placeholder="Email, Phone, or TID..." className="w-full pl-16 pr-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-brand-primary/5 focus:bg-white outline-none transition-all font-bold text-brand-secondary" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <button type="submit" className="bg-brand-secondary text-white px-12 py-6 rounded-[2rem] font-bold uppercase tracking-widest text-xs hover:bg-brand-primary transition-all flex items-center justify-center gap-3 shadow-xl">Verify <ArrowRight size={20} /></button>
          </form>
        </div>

        {hasSearched && foundAppointments && foundAppointments.map((apt) => (
          <div key={apt.id} className="bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-2xl mb-8">
            <div className={`px-10 py-5 flex justify-between items-center border-b ${getStatusColor(apt.status)}`}><span className="font-black uppercase tracking-[0.2em] text-[11px]">Appointment {apt.status}</span></div>
            <div className="p-10 text-left space-y-8">
               <h3 className="text-2xl font-bold text-brand-secondary">{apt.patientName}</h3>
               <div className="bg-brand-secondary rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                  <p className="text-xl md:text-2xl font-serif italic leading-relaxed">"{apt.adminMessage || 'Your visit is currently under review by our clinical administration.'}"</p>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckStatus;
