
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Doctor } from '../types';
import { Calendar, Clock, Wallet, Award, CheckCircle, Phone, ArrowLeft, Mail, User, Stethoscope, GraduationCap, Briefcase, ShieldCheck } from 'lucide-react';

const DoctorProfile: React.FC<{ doctors: Doctor[] }> = ({ doctors }) => {
  const { id } = useParams();
  const doctor = doctors.find(d => d.id === id);
  if (!doctor) return null;

  return (
    <div className="bg-[#fcfaf7] min-h-screen pb-20">
      <div className="bg-brand-secondary h-48 md:h-64 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-end pb-8">
           <Link to="/doctors" className="text-white/70 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors mb-4 md:mb-0"><ArrowLeft size={16} /> Back to Specialists</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 -mt-16 relative z-10">
          <div className="lg:w-1/3">
            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 p-8 text-center space-y-8">
              <div className="relative inline-block">
                <img src={doctor.image} alt={doctor.name} className="w-48 h-48 md:w-64 md:h-64 rounded-[2rem] object-cover shadow-xl mx-auto grayscale-[0.1]" />
                <div className="absolute -bottom-4 -right-4 bg-brand-primary text-white p-4 rounded-2xl shadow-lg border-4 border-white"><Award size={24} /></div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3 text-slate-500 font-bold text-[10px] uppercase tracking-widest"><Wallet size={16} className="text-brand-tertiary" /> Consultation</div>
                  <span className="font-bold text-brand-secondary">{doctor.fee || 'N/A'}</span>
                </div>
              </div>
              <div className="space-y-3">
                <Link to="/appointment" className="block w-full bg-brand-primary text-white py-5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-secondary transition-all shadow-xl active:scale-95">Book Appointment</Link>
                <a href="tel:0515425152" className="block w-full bg-slate-100 text-brand-secondary py-5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all flex items-center justify-center gap-2"><Phone size={14} /> Hospital Line</a>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 space-y-10">
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden group">
               <div className="relative z-10 space-y-10">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-50 pb-8">
                     <div>
                        <div className="inline-flex items-center gap-2 bg-brand-secondary/5 text-brand-secondary px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4"><ShieldCheck size={12} className="text-brand-tertiary" /> Board Certified Specialist</div>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-secondary font-serif italic">{doctor.name}</h1>
                        <p className="text-brand-primary font-bold text-lg mt-1">{doctor.specialty}</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="flex gap-5 items-start">
                        <div className="w-12 h-12 bg-slate-50 text-brand-primary rounded-2xl flex items-center justify-center shrink-0 shadow-sm"><GraduationCap size={24} /></div>
                        <div><h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Academic Credentials</h4><p className="text-sm font-bold text-brand-secondary leading-relaxed">{doctor.qualification}</p></div>
                     </div>
                     <div className="flex gap-5 items-start">
                        <div className="w-12 h-12 bg-slate-50 text-brand-primary rounded-2xl flex items-center justify-center shrink-0 shadow-sm"><Briefcase size={24} /></div>
                        <div><h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Clinical Experience</h4><p className="text-sm font-bold text-brand-secondary leading-relaxed">{doctor.experience} Service</p></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
