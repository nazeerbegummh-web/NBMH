
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Department, Doctor } from '../types';
import { 
  Heart, Brain, Baby, Activity, Stethoscope, ShieldCheck, Sparkles, ChevronRight, Calendar, Award, Clock, Wallet, Microscope, Bone, Pill, Syringe, Zap, HeartPulse, Eye, Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const getDeptIcon = (iconName: string): React.ComponentType<any> => {
  if (iconName?.startsWith('data:image')) {
    return (props: any) => (<img src={iconName} alt="Icon" style={{ width: props.size || 24, height: props.size || 24 }} className={`${props.className || ''} object-contain`} />);
  }
  const iconMap: Record<string, React.ComponentType<any>> = { HeartPulse, Brain, Baby, Activity, Stethoscope, ShieldCheck, Sparkles, Microscope, Bone, Pill, Syringe, Zap, Heart, Eye, Building2 };
  return iconMap[iconName] || Activity;
};

const Departments: React.FC<{ departments: Department[]; doctors: Doctor[] }> = ({ departments, doctors }) => {
  const { id: urlDeptId } = useParams();
  const navigate = useNavigate();
  const [selectedDeptId, setSelectedDeptId] = useState<string>(urlDeptId || departments[0]?.id || '');
  useEffect(() => { if (urlDeptId && urlDeptId !== selectedDeptId) setSelectedDeptId(urlDeptId); }, [urlDeptId]);

  const handleDeptSelect = (id: string) => { setSelectedDeptId(id); navigate(`/departments/${id}`, { replace: true }); };
  const selectedDept = departments.find(d => d.id === selectedDeptId) || departments[0];
  const deptDoctors = doctors.filter(doc => doc.departmentId === selectedDeptId);

  return (
    <div className="bg-[#fcfaf7] min-h-screen">
      <div className="bg-brand-secondary py-16 text-center text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Facilities</h1>
          <p className="text-brand-tertiary font-bold uppercase tracking-[0.3em] text-xs">Specialized Medical Services</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/3 xl:w-1/4 space-y-2">
            <h2 className="text-brand-secondary font-bold text-xl mb-6 flex items-center gap-2"><span className="w-1 h-6 bg-brand-primary"></span>Departments</h2>
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50 sticky top-32 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {departments.map((dept) => {
                const IconComponent = getDeptIcon(dept.icon);
                return (
                  <button key={dept.id} onClick={() => handleDeptSelect(dept.id)} className={`w-full text-left px-6 py-4 flex items-center justify-between group transition-all ${selectedDeptId === dept.id ? 'bg-brand-secondary text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <div className="flex items-center gap-4">
                      <IconComponent size={18} className={`${selectedDeptId === dept.id ? 'text-brand-tertiary' : 'text-slate-300 group-hover:text-brand-primary'} transition-colors`} />
                      <div className="flex flex-col">
                        <span className={`text-sm font-bold uppercase tracking-widest ${selectedDeptId === dept.id ? 'text-white' : 'text-slate-500 group-hover:text-brand-secondary'}`}>{dept.name}</span>
                        <span className={`text-[11px] font-bold ${selectedDeptId === dept.id ? 'text-white/60' : 'text-slate-300'}`} dir="rtl">{dept.urduName}</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className={`${selectedDeptId === dept.id ? 'text-brand-tertiary' : 'text-slate-300 opacity-0 group-hover:opacity-100'}`} />
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="lg:w-2/3 xl:w-3/4 space-y-12">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
               <div className="flex items-center gap-6 mb-8">
                 <div className="w-16 h-16 bg-slate-50 text-brand-primary rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">{React.createElement(getDeptIcon(selectedDept.icon), { size: 32 })}</div>
                 <div className="flex flex-col">
                    <h3 className="text-3xl md:text-4xl font-bold text-brand-secondary">{selectedDept.name}</h3>
                    <span className="text-2xl font-bold text-brand-primary" dir="rtl">{selectedDept.urduName}</span>
                 </div>
               </div>
               <p className="text-lg text-slate-600 font-light leading-relaxed mb-10">{selectedDept.description}</p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['World-class Diagnostics', 'Expert Multi-disciplinary Team', 'Compassionate Care', '24/7 Support'].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl"><Award className="text-brand-tertiary" size={20} /><span className="text-sm font-bold text-brand-secondary uppercase tracking-wide">{feat}</span></div>
                  ))}
               </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-brand-secondary font-bold text-2xl flex items-center gap-3"><span className="w-10 h-0.5 bg-brand-primary"></span>Specialist Doctors</h2>
              <div className="grid grid-cols-1 gap-6">
                {deptDoctors.map((doc) => (
                  <div key={doc.id} className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 hover:shadow-xl transition-all group">
                     <img src={doc.image} alt={doc.name} className="w-full md:w-48 h-64 md:h-full object-cover rounded-2xl shadow-md grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500" />
                     <div className="flex-grow space-y-4">
                        <div className="flex flex-col md:flex-row md:justify-between items-start gap-2">
                           <div><h4 className="text-2xl font-bold text-brand-secondary">{doc.name}</h4><p className="text-brand-primary font-bold uppercase tracking-[0.2em] text-[10px]">{doc.qualification}</p></div>
                           <span className="bg-brand-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{doc.experience} Experience</span>
                        </div>
                        <p className="text-slate-600 italic font-medium">"{doc.motto}"</p>
                        <div className="pt-4 flex gap-4">
                          <Link to={`/doctor/${doc.id}`} className="bg-brand-secondary text-white px-8 py-3 rounded-md font-bold uppercase tracking-widest text-[10px] hover:bg-brand-primary transition-all">View Profile</Link>
                          <Link to="/appointment" className="bg-slate-100 text-brand-secondary px-8 py-3 rounded-md font-bold uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all">Request Appointment</Link>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
