
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Heart, 
  Activity, 
  ChevronRight, 
  Clock,
  MapPin,
  Ambulance,
  Microscope,
  Scan,
  ShieldCheck,
  Users,
  BellRing,
  Medal,
  Stethoscope,
  Sparkles,
  HeartPulse,
  Scissors,
  Baby as BabyIcon,
  MonitorPlay,
  ArrowUpRight,
  Syringe,
  Pill,
  LayoutGrid,
  Building2,
  Maximize2,
  Zap
} from 'lucide-react';
import { SiteData } from '../types';
import { Meta } from '../App';
import { getDeptIcon } from './Departments';

const Home: React.FC<{ data: SiteData }> = ({ data }) => {
  const { branding, newsItems, departments } = data;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % branding.heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [branding.heroSlides.length]);

  const medicalServices = [
    { 
      id: 'SEC-01', 
      title: "Specialist Emergency", 
      urdu: "سپیشلسٹ ایمرجنسی",
      desc: "24/7 rapid response trauma unit with on-site senior surgeons for critical life-saving interventions.", 
      icon: <Ambulance size={24} />, 
      image: "https://lh3.googleusercontent.com/d/1kTeCNuCCgfZzWdXLyjM5_VOK0dHCLxBy" 
    },
    { 
      id: 'SEC-02', 
      title: "24/7 Clinical Lab", 
      urdu: "کلینیکل لیبارٹری",
      desc: "Fully automated diagnostic center utilizing high-precision chemistry and hematology analyzers.", 
      icon: <Microscope size={24} />, 
      image: "https://lh3.googleusercontent.com/d/1lx6nx78K2htGaXZ5nyPTFBKG98CCowBe" 
    },
    { 
      id: 'SEC-03', 
      title: "Digital Radiology", 
      urdu: "ڈیجیٹل ریڈیولوجی",
      desc: "Advanced Digital X-Ray and O.P.G for crystal clear skeletal imaging and precise diagnostic mapping.", 
      icon: <Scan size={24} />, 
      image: "https://lh3.googleusercontent.com/d/1AgUYGck3XP_k9QQ6YDEzh1-Fp8PWPNv4" 
    },
    { 
      id: 'SEC-04', 
      title: "Advanced Ultrasound", 
      urdu: "الٹراساؤنڈ",
      desc: "High-definition Color Doppler systems for detailed vascular analysis and fetal health monitoring.", 
      icon: <Activity size={24} />, 
      image: "https://lh3.googleusercontent.com/d/1xPLHSeU7PprFNO1ujAtzH9Ets3yaHUeh" 
    }
  ];

  const facilities = [
    { title: "Specialist Emergency", urdu: "سپیشلسٹ ایمرجنسی", desc: "Available 24/7 with on-call specialists for trauma and acute care.", icon: <Ambulance size={28}/> },
    { title: "Advanced Operation Theater", urdu: "جدید آپریشن تھیٹر", desc: "State-of-the-art sterile surgical suites for major and minor procedures.", icon: <Scissors size={28}/> },
    { title: "Automated Clinical Lab", urdu: "کلینیکل لیبارٹری", desc: "High-precision automated testing for rapid diagnostic reporting.", icon: <Microscope size={28}/> },
    { title: "Digital Radiology / X-Ray", urdu: "ڈیجیٹل ریڈیولوجی / ایکسرے", desc: "Crystal clear digital skeletal imaging and O.P.G services.", icon: <Scan size={28}/> },
    { title: "Ultrasound (Color Doppler)", urdu: "الٹراساؤنڈ", desc: "High-definition vascular mapping and pregnancy ultrasound.", icon: <Activity size={28}/> },
    { title: "24/7 Pharmacy", urdu: "فارمیسی", desc: "In-house pharmacy providing genuine medications around the clock.", icon: <Pill size={28}/> },
  ];

  const stats = [
    { label: "Successful Surgeries", value: "15k+", icon: <Activity size={28} className="text-brand-tertiary"/> },
    { label: "Verified Specialists", value: "60+", icon: <Users size={28} className="text-brand-tertiary"/> },
    { label: "Specialized Depts", value: "25+", icon: <Building2 size={28} className="text-brand-tertiary"/> },
    { label: "24/7 Critical Care", value: "100%", icon: <ShieldCheck size={28} className="text-brand-tertiary"/> },
    { label: "Patients Served", value: "250k+", icon: <Heart size={28} className="text-brand-tertiary"/> }
  ];

  const specialties = [
    { name: "Gynecologist", icon: <BabyIcon size={18}/>, id: "gynae" },
    { name: "Child Specialist", icon: <BabyIcon size={18}/>, id: "peds" },
    { name: "Medical Specialist", icon: <Stethoscope size={18}/>, id: "medical" },
    { name: "Dermatologist", icon: <Sparkles size={18}/>, id: "dermatology" },
    { name: "Cardiologist", icon: <HeartPulse size={18}/>, id: "cardiology" },
    { name: "General Surgeon", icon: <Scissors size={18}/>, id: "surgery" }
  ];

  return (
    <div className="space-y-0 overflow-x-hidden selection:bg-brand-tertiary selection:text-white">
      <Meta 
        title="Best Hospital in Bahria Town Rawalpindi | 24/7 Emergency Services"
        description="Nazeer Begum Memorial Hospital (NBMH) provides 24/7 Specialist Emergency and Maternity Care in Hub Commercial PH 8 Rawalpindi."
      />
      
      {/* Hero Section */}
      <section className="relative h-[75vh] md:h-[95vh] bg-brand-primary overflow-hidden">
        {branding.heroSlides.map((slide, index) => (
          <div key={slide.id} className={`absolute inset-0 transition-all duration-[1200ms] ease-out flex items-center ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}>
            <div className="absolute inset-0">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover opacity-75" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-primary/90 via-brand-primary/60 to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
              <div className="max-w-4xl space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 md:w-12 h-1 bg-brand-tertiary"></span>
                    <p className="text-brand-tertiary font-black text-[9px] md:text-xs uppercase tracking-[0.4em] drop-shadow-lg">{branding.tagline}</p>
                  </div>
                  <h1 className="text-4xl md:text-8xl font-bold leading-[1.1] text-white font-serif italic drop-shadow-2xl">
                    {slide.title.split(' ')[0]} <br/> <span className="text-brand-tertiary">{slide.title.split(' ').slice(1).join(' ')}</span>
                  </h1>
                  <p className="text-white text-sm md:text-2xl font-medium max-w-xl leading-relaxed italic drop-shadow-md">
                    {slide.subtitle}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 md:pt-0">
                  <Link to="/appointment" className="bg-brand-tertiary text-white px-8 md:px-14 py-4 md:py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] md:text-xs transition-all shadow-xl hover:bg-white hover:text-brand-primary active:scale-95 flex items-center justify-center gap-3">
                    <ShieldCheck size={18}/> Book Visit
                  </Link>
                  <Link to="/doctors" className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 md:px-14 py-4 md:py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-white transition-all hover:text-brand-primary flex items-center justify-center gap-3 active:scale-95">
                    <Users size={18}/> Specialists
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* News Ticker */}
      <section className="bg-brand-secondary py-4 overflow-hidden border-b border-white/10">
        <div className="flex items-center gap-6 whitespace-nowrap animate-ticker">
           {[...newsItems, ...newsItems].map((news, i) => (
             <div key={i} className="flex items-center gap-4 text-white/80 font-bold text-xs uppercase tracking-widest px-8 border-r border-white/10">
                <BellRing size={16} className="text-brand-tertiary" />
                {news}
             </div>
           ))}
        </div>
      </section>

      {/* Specialist Registry Section */}
      <section className="py-16 md:py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4 space-y-8">
               <div className="space-y-4">
                  <div className="bg-brand-primary text-white px-6 py-2 font-black text-sm tracking-tighter inline-block shadow-md transform -skew-x-12">MEDICAL REGISTRY</div>
                  <h2 className="text-3xl md:text-6xl font-bold text-brand-secondary font-serif leading-tight">Clinical <br/> <span className="text-brand-primary">Specialists</span></h2>
               </div>
               <p className="text-slate-500 italic border-l-4 border-brand-primary pl-4 md:pl-6">"Institutional excellence across 26+ specialized disciplines in Bahria Town PH 8."</p>
               <div className="pt-4 space-y-3">
                  <Link to="/doctors" className="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-slate-200 hover:bg-brand-primary hover:text-white transition-all group">
                     <span className="font-black text-[10px] uppercase tracking-widest">Consultant Database</span>
                     <ChevronRight className="text-brand-tertiary group-hover:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </div>
            <div className="lg:col-span-8">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {specialties.map((s, i) => (
                    <Link key={i} to={`/departments/${s.id}`} className="group flex items-center justify-between p-6 bg-white text-brand-secondary rounded-2xl hover:bg-brand-secondary hover:text-white transition-all shadow-sm">
                       <div className="flex items-center gap-5">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-brand-primary group-hover:text-white group-hover:bg-white/10 transition-all">{s.icon}</div>
                          <span className="text-xs md:text-sm font-black uppercase tracking-[0.1em]">{s.name}</span>
                       </div>
                       <ChevronRight size={18} className="opacity-0 group-hover:opacity-100" />
                    </Link>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 relative">
                 <div className="relative z-10 p-4 bg-white rounded-[3rem] shadow-2xl border border-slate-50">
                    <img src={branding.ceoImage} alt={branding.ceoName} className="w-full rounded-[2.5rem] aspect-[4/5] object-cover" />
                    <div className="absolute -bottom-8 -right-8 bg-brand-primary text-white p-8 rounded-3xl shadow-2xl">
                       <Medal size={32} className="text-brand-tertiary mb-4" />
                       <h4 className="text-xl font-bold font-serif">{branding.ceoName}</h4>
                    </div>
                 </div>
              </div>
              <div className="lg:col-span-7 space-y-10">
                 <h2 className="text-4xl md:text-7xl font-bold text-brand-secondary font-serif italic leading-tight">CEO's <span className="text-brand-primary">Message</span></h2>
                 <p className="text-slate-600 text-lg md:text-xl leading-relaxed italic font-light whitespace-pre-line relative z-10">"{branding.ceoMessage}"</p>
                 <div className="pt-8 border-t border-slate-50">
                    <h4 className="text-2xl font-bold text-brand-primary font-serif">{branding.ceoName}</h4>
                    <p className="text-brand-tertiary font-black uppercase tracking-widest text-[10px] mt-1">{branding.ceoTitle}</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-6 group">
                   <div className="w-20 h-20 bg-[#f8fafc] rounded-3xl flex items-center justify-center shadow-inner group-hover:bg-brand-primary transition-all duration-500 group-hover:text-white">
                      {stat.icon}
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-4xl md:text-5xl font-black text-brand-primary tracking-tighter">{stat.value}</h4>
                      <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">{stat.label}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Clinical Intelligence Section - Enhanced Version */}
      <section className="py-24 md:py-36 bg-slate-950 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#862a24_0%,transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,#1fb036_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-1.5 bg-brand-tertiary rounded-full"></div>
                <span className="text-brand-tertiary font-black uppercase text-[10px] tracking-[0.5em]">Digital Diagnostics</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-bold text-white font-serif italic tracking-tight leading-none">
                Clinical <br/> <span className="text-brand-primary drop-shadow-[0_5px_15px_rgba(134,42,36,0.4)]">Intelligence</span>
              </h2>
              <p className="text-white/40 text-lg md:text-xl font-medium italic border-l-4 border-brand-primary pl-6">
                "Harnessing advanced imaging and automated clinical diagnostics to ensure precision in every patient case."
              </p>
            </div>
            <div className="hidden lg:block">
               <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl">
                  <div className="flex items-center gap-4 text-white">
                     <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center text-brand-primary">
                        <Zap size={24} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase text-brand-tertiary tracking-widest">System Status</p>
                        <p className="text-sm font-bold">ALL CLINICAL UNITS ACTIVE</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {medicalServices.map((s, idx) => (
              <div key={idx} className="group relative h-[500px] rounded-[3.5rem] overflow-hidden border border-white/10 hover:border-brand-tertiary transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] bg-slate-900">
                {/* Image Layer - 75% Opacity as requested */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={s.image} 
                    className="w-full h-full object-cover opacity-75 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]" 
                    alt={s.title} 
                  />
                  {/* Dynamic Gradient Overlays for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 to-transparent"></div>
                </div>

                {/* Decorative UI Elements */}
                <div className="absolute top-8 left-8 z-10 flex items-center gap-3">
                   <div className="w-10 h-10 rounded-2xl bg-brand-primary text-white flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform">
                     {s.icon}
                   </div>
                   <div className="px-3 py-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                      <p className="text-[8px] font-black text-brand-tertiary tracking-widest uppercase">{s.id}</p>
                   </div>
                </div>

                <div className="absolute top-8 right-8 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Maximize2 size={20} className="text-white/40" />
                </div>

                {/* 'Scanning' Marker Decoration */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                   <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-tertiary/20 shadow-[0_0_15px_#1fb036] animate-pulse"></div>
                   <div className="absolute top-0 left-1/2 h-full w-0.5 bg-brand-tertiary/20 shadow-[0_0_15px_#1fb036] animate-pulse"></div>
                </div>

                {/* Content Layer */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                   <div className="space-y-4">
                      <div className="space-y-1">
                        <p className="text-lg md:text-2xl font-black text-brand-primary drop-shadow-lg" dir="rtl">{s.urdu}</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white font-serif leading-none tracking-tight">{s.title}</h3>
                      </div>
                      
                      <div className="w-full h-px bg-white/10 group-hover:bg-brand-tertiary transition-colors"></div>
                      
                      <p className="text-white/50 text-xs md:text-sm leading-relaxed font-medium line-clamp-3">
                        {s.desc}
                      </p>

                      <div className="pt-4 flex items-center justify-between">
                         <Link to="/departments" className="flex items-center gap-3 text-[10px] font-black uppercase text-brand-tertiary tracking-widest hover:text-white transition-colors">
                           Access Unit <ArrowUpRight size={14} />
                         </Link>
                         <ShieldCheck size={18} className="text-white/20 group-hover:text-brand-tertiary transition-colors" />
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-24 md:py-36 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-brand-tertiary"></div>
                <span className="text-[10px] font-black uppercase text-brand-tertiary tracking-[0.4em]">Infrastructure</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-brand-secondary font-serif italic leading-tight">
                Institutional <br/> <span className="text-brand-primary">Facilities</span>
              </h2>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-slate-400 font-bold text-2xl md:text-3xl italic max-w-xs ml-auto">
                 "ادارے کی سہولیات"
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((fac, i) => (
              <div key={i} className="group bg-white rounded-[2.5rem] p-10 border border-slate-100 hover:border-brand-primary hover:shadow-2xl transition-all duration-500 flex flex-col gap-6 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-2 h-full bg-brand-primary/10 group-hover:bg-brand-primary transition-colors"></div>
                 <div className="w-16 h-16 bg-slate-50 text-brand-tertiary rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                    {fac.icon}
                 </div>
                 <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                       <h3 className="text-2xl font-bold text-brand-secondary group-hover:text-brand-primary transition-colors">{fac.title}</h3>
                       <p className="text-2xl font-black text-brand-tertiary opacity-40" dir="rtl">{fac.urdu}</p>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                       {fac.desc}
                    </p>
                 </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 p-10 bg-brand-primary text-white rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
             <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full"></div>
             <div className="space-y-4 relative z-10">
                <h3 className="text-3xl font-bold font-serif italic">Need immediate medical attention?</h3>
                <p className="text-white/60 text-lg">Our facilities are fully operational 24 hours a day, 7 days a week.</p>
             </div>
             <a href={`tel:${branding.phone}`} className="bg-brand-tertiary text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl flex items-center gap-3 hover:scale-105 transition-transform active:scale-95 relative z-10">
                <Ambulance size={20}/> Emergency Helpdesk
             </a>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-24 md:py-36 bg-[#fcfaf7] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
           <Activity size={400} className="text-brand-primary" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="w-12 h-1 bg-brand-tertiary"></div>
                    <span className="text-[10px] font-black uppercase text-brand-tertiary tracking-[0.4em]">Comprehensive Care</span>
                 </div>
                 <h2 className="text-5xl md:text-7xl font-bold text-brand-secondary font-serif italic leading-tight">
                    Specialized <br/> <span className="text-brand-primary">Departments</span>
                 </h2>
              </div>
              <div className="text-right">
                 <p className="text-slate-400 font-bold text-xl md:text-2xl italic max-w-sm ml-auto">
                    "عوامی خدمت، اعلیٰ معیار اور سستی صحت کی سہولیات ہمارا عزم ہے۔"
                 </p>
              </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {departments.map((dept, i) => {
                const IconComponent = getDeptIcon(dept.icon);
                return (
                  <Link 
                    key={dept.id} 
                    to={`/departments/${dept.id}`}
                    className="group bg-white rounded-[2.5rem] p-10 border border-slate-100 hover:border-brand-primary hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[300px]"
                  >
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                    
                    <div className="space-y-6 relative z-10">
                       <div className="w-14 h-14 bg-slate-50 text-brand-tertiary rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                          <IconComponent size={28} />
                       </div>
                       <div className="space-y-2">
                          <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">{dept.name}</p>
                          <h3 className="text-4xl md:text-5xl font-black text-brand-secondary group-hover:text-brand-primary transition-colors leading-tight" dir="rtl">
                             {dept.urduName}
                          </h3>
                       </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50 relative z-10">
                       <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest group-hover:text-brand-tertiary transition-colors">تفصیلات دیکھیں</span>
                       <ArrowUpRight size={20} className="text-slate-200 group-hover:text-brand-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                  </Link>
                );
              })}
           </div>

           <div className="mt-20 text-center">
              <Link 
                to="/departments" 
                className="inline-flex items-center gap-4 bg-brand-secondary text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-brand-primary transition-all shadow-xl active:scale-95"
              >
                Explore All Facilities <ChevronRight size={18} />
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
