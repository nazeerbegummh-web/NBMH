
import React, { useState, useMemo } from 'react';
import { Doctor, Department } from '../types';
import { 
  User, 
  Users,
  Calendar, 
  Quote, 
  Clock, 
  Wallet, 
  ChevronRight, 
  Search, 
  Filter, 
  X, 
  ArrowUpDown,
  Check,
  ChevronDown,
  Award,
  Stethoscope,
  Building2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDeptIcon } from './Departments';

interface DoctorsProps {
  doctors: Doctor[];
  departments: Department[];
}

type SortOption = 'name-asc' | 'name-desc' | 'exp-desc' | 'fee-asc' | 'fee-desc';

const Doctors: React.FC<DoctorsProps> = ({ doctors, departments }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const getNumericValue = (str: string | undefined): number => {
    if (!str) return 0;
    const match = str.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const filteredAndSortedDoctors = useMemo(() => {
    let result = doctors.filter((doc) => {
      const matchesSearch = 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.qualification.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDeptId === 'all' || doc.departmentId === selectedDeptId;
      return matchesSearch && matchesDept;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'exp-desc': return getNumericValue(b.experience) - getNumericValue(a.experience);
        case 'fee-asc':
          const feeA = a.fee?.includes('Contact') ? Infinity : getNumericValue(a.fee);
          const feeB = b.fee?.includes('Contact') ? Infinity : getNumericValue(b.fee);
          return feeA - feeB;
        case 'fee-desc': return getNumericValue(b.fee) - getNumericValue(a.fee);
        default: return 0;
      }
    });
    return result;
  }, [doctors, searchQuery, selectedDeptId, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDeptId('all');
  };

  return (
    <div className="py-20 bg-[#f8fafc] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <header className="text-center mb-16 space-y-4">
          <div className="flex justify-center mb-2">
            <div className="bg-brand-primary/10 text-brand-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-primary/20">
              Verified Medical Professionals
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-brand-secondary font-serif leading-tight tracking-tight">
            Specialist <span className="text-brand-primary">Registry</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Discover board-certified medical experts at Nazeer Begum Memorial Hospital.
          </p>
        </header>

        <div className="sticky top-32 z-30 mb-12">
          <div className="bg-white rounded-[2.5rem] p-4 shadow-2xl shadow-brand-secondary/5 border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={22} />
              <input 
                type="text" 
                placeholder="Search specialists..." 
                className="w-full pl-16 pr-6 py-5 bg-slate-50 rounded-[1.8rem] border border-transparent focus:border-brand-primary focus:bg-white outline-none transition-all font-bold text-brand-secondary shadow-inner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full md:hidden">
               <select 
                 className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-[1.8rem] outline-none font-bold text-brand-secondary appearance-none"
                 value={selectedDeptId}
                 onChange={(e) => setSelectedDeptId(e.target.value)}
               >
                 <option value="all">All Departments</option>
                 {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
               </select>
            </div>

            <div className="shrink-0 px-8 py-2 border-l border-slate-100 hidden md:flex items-center gap-4">
               <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-tight">Registry Count</p>
                  <p className="text-xl font-black text-brand-secondary leading-tight">{filteredAndSortedDoctors.length}</p>
               </div>
               <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-brand-primary">
                  <Users size={20} />
               </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="hidden lg:block lg:w-1/4 space-y-8">
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 sticky top-64">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                <h2 className="text-xl font-bold text-brand-secondary flex items-center gap-3">
                  <Building2 size={24} className="text-brand-primary" /> Sectors
                </h2>
                {selectedDeptId !== 'all' && (
                  <button onClick={() => setSelectedDeptId('all')} className="text-[9px] font-black uppercase text-white bg-brand-primary px-3 py-1 rounded-full shadow-lg">Reset</button>
                )}
              </div>
              <div className="space-y-2 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
                <button
                  onClick={() => setSelectedDeptId('all')}
                  className={`w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between group ${selectedDeptId === 'all' ? 'bg-brand-secondary text-white shadow-xl' : 'hover:bg-slate-50 text-slate-600'}`}
                >
                  <span className="text-xs font-bold uppercase tracking-widest">All Specialties</span>
                  {selectedDeptId === 'all' && <Check size={14} className="text-brand-tertiary" />}
                </button>
                {departments.map((dept) => {
                  const Icon = getDeptIcon(dept.icon);
                  const isSelected = selectedDeptId === dept.id;
                  return (
                    <button
                      key={dept.id}
                      onClick={() => setSelectedDeptId(dept.id)}
                      className={`w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between group ${isSelected ? 'bg-brand-secondary text-white shadow-xl' : 'hover:bg-slate-50 text-slate-600'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isSelected ? 'bg-white/10 text-brand-tertiary' : 'bg-slate-50 text-slate-400 group-hover:text-brand-secondary'}`}>
                          <Icon size={16} />
                        </div>
                        <p className="text-[11px] font-black uppercase tracking-widest leading-none">{dept.name}</p>
                      </div>
                      {isSelected && <Check size={14} className="text-brand-tertiary" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
              {filteredAndSortedDoctors.map((doc) => (
                <div key={doc.id} className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full animate-in fade-in duration-700">
                  <div className="relative h-80 overflow-hidden">
                    <img src={doc.image} alt={doc.name} className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/80 via-transparent to-transparent"></div>
                    <div className="absolute top-6 left-6 flex flex-col items-start gap-2">
                      <div className="bg-white/95 backdrop-blur-md text-brand-secondary text-[9px] font-black px-5 py-2.5 rounded-2xl uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2">
                        <Stethoscope size={12} className="text-brand-primary"/> {doc.specialty}
                      </div>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8">
                       <h2 className="text-3xl font-bold text-white group-hover:text-brand-tertiary transition-colors leading-tight mb-1 font-serif">{doc.name}</h2>
                       <p className="text-white/60 text-[9px] font-black uppercase tracking-[0.3em]">{doc.qualification}</p>
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-grow bg-white">
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-5 bg-[#fcfaf7] rounded-3xl border border-[#f0e6d2] space-y-1">
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Experience</p>
                        <p className="text-sm font-black text-brand-secondary">{doc.experience}</p>
                      </div>
                      <div className="p-5 bg-[#fcfaf7] rounded-3xl border border-[#f0e6d2] space-y-1">
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Consultation</p>
                        <p className="text-sm font-black text-brand-primary">{doc.fee || 'PKR 1000/-'}</p>
                      </div>
                    </div>
                    <div className="relative mb-8 flex-grow">
                      <Quote size={32} className="text-brand-primary/10 absolute -top-2 -left-2" />
                      <p className="text-slate-500 text-sm font-medium leading-relaxed italic pl-6">"{doc.motto}"</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link to={`/doctor/${doc.id}`} className="flex-grow flex items-center justify-center gap-2 bg-brand-secondary text-white py-4 px-6 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-xl active:scale-95 group/btn">Details <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" /></Link>
                      <Link to="/appointment" className="flex-grow flex items-center justify-center gap-2 bg-brand-primary text-white py-4 px-6 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-brand-secondary transition-all shadow-xl active:scale-95">Book Visit <Calendar size={14} /></Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
