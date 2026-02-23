
import React, { useState } from 'react';
import { 
  Heart, 
  Building2, 
  Award, 
  CheckCircle2, 
  Stethoscope, 
  Microscope, 
  ShieldCheck, 
  Users, 
  ArrowRight,
  Target,
  Globe,
  MapPin,
  Baby,
  Activity,
  Scissors,
  Phone,
  Zap,
  Syringe,
  Pill,
  ChevronDown,
  LayoutGrid,
  ClipboardCheck,
  Sparkles,
  Plus,
  Minus,
  HelpCircle,
  Flag
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SiteData } from '../types';
import { Meta } from '../App';

const About: React.FC<{ data: SiteData }> = ({ data }) => {
  const { branding } = data;
  const [activeCategory, setActiveCategory] = useState<'all' | 'medical' | 'surgical' | 'diagnostic'>('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const highlights = [
    { title: "Multi-Specialty Care", desc: "Leading hospital in Hub Commercial, Bahria Town PH 8.", icon: <Building2 className="text-brand-tertiary" size={32}/> },
    { title: "Affordable Services", desc: "Quality healthcare accessible to everyone since foundation.", icon: <Heart className="text-brand-tertiary" size={32}/> },
    { title: "Expert Staff", desc: "Highly experienced doctors and medical professionals.", icon: <Users className="text-brand-tertiary" size={32}/> },
    { title: "Modern Technology", desc: "Advanced diagnostic and imaging facilities in Rawalpindi.", icon: <Microscope className="text-brand-tertiary" size={32}/> },
  ];

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'medical', name: 'Medical Care' },
    { id: 'surgical', name: 'Surgical Dept' },
    { id: 'diagnostic', name: 'Diagnostics' }
  ];

  const allServices = [
    // Medical
    { 
      label: "General Medical Consultations", 
      desc: "Expert primary care for all ages, focusing on comprehensive diagnosis and preventive medicine.",
      icon: <Stethoscope size={24}/>, 
      cat: 'medical' 
    },
    { 
      label: "Pediatrics & Neonatology", 
      desc: "Specialized healthcare for infants and children delivered by experienced pediatric specialists.",
      icon: <Baby size={24}/>, 
      cat: 'medical' 
    },
    { 
      label: "Cardiology & Heart Care", 
      desc: "Comprehensive heart health monitoring, ECG, and diagnostic cardiology services for all ages.",
      icon: <Activity size={24}/>, 
      cat: 'medical' 
    },
    { 
      label: "Pain Management", 
      desc: "Innovative therapies and palliative care strategies to manage chronic and acute pain effectively.",
      icon: <Zap size={24}/>, 
      cat: 'medical' 
    },
    { 
      label: "Internal Medicine", 
      desc: "Dedicated management of complex adult illnesses with a focus on multi-system health issues.",
      icon: <ClipboardCheck size={24}/>, 
      cat: 'medical' 
    },
    { 
      label: "Physiotherapy & Rehab", 
      desc: "Professional rehabilitation programs designed to restore mobility, strength, and physical function.",
      icon: <LayoutGrid size={24}/>, 
      cat: 'medical' 
    },
    { 
      label: "Dermatology Clinic", 
      desc: "Advanced clinical care for skin, hair, and nail conditions by expert dermatologists.",
      icon: <Sparkles size={24}/>, 
      cat: 'medical' 
    },
    
    // Surgical
    { 
      label: "Laparoscopic Surgery", 
      desc: "State-of-the-art minimally invasive 'keyhole' procedures for faster patient recovery.",
      icon: <Scissors size={24}/>, 
      cat: 'surgical' 
    },
    { 
      label: "General & Trauma Surgery", 
      desc: "24/7 surgical support for both emergency interventions and elective procedures.",
      icon: <Activity size={24}/>, 
      cat: 'surgical' 
    },
    { 
      label: "Dental & Orthodontics", 
      desc: "Advanced oral healthcare including dental implants, braces, and complex maxillo-facial surgery.",
      icon: <Syringe size={24}/>, 
      cat: 'surgical' 
    },
    { 
      label: "Gynecology & Obstetrics", 
      desc: "Dedicated maternity care and surgical services for women at every stage of life.",
      icon: <Baby size={24}/>, 
      cat: 'surgical' 
    },
    { 
      label: "ENT Specialized Surgery", 
      desc: "Specialized surgical treatment for conditions involving the Ear, Nose, and Throat.",
      icon: <Stethoscope size={24}/>, 
      cat: 'surgical' 
    },
    { 
      label: "Urology & Renal Care", 
      desc: "Expert treatment for kidney stones, bladder issues, and prostate conditions.",
      icon: <Zap size={24}/>, 
      cat: 'surgical' 
    },
    { 
      label: "Orthopedic Procedures", 
      desc: "Comprehensive surgical care for fractures, joint replacements, and bone health.",
      icon: <Award size={24}/>, 
      cat: 'surgical' 
    },

    // Diagnostic
    { 
      label: "Digital X-Ray & Imaging", 
      desc: "High-resolution digital imaging for precise diagnosis of bone and soft tissue conditions.",
      icon: <LayoutGrid size={24}/>, 
      cat: 'diagnostic' 
    },
    { 
      label: "Color Doppler Ultrasound", 
      desc: "Advanced vascular and organ imaging for detailed circulatory and structural analysis.",
      icon: <Activity size={24}/>, 
      cat: 'diagnostic' 
    },
    { 
      label: "Clinical Laboratory", 
      desc: "24/7 pathology services providing rapid and accurate testing for effective clinical decisions.",
      icon: <Microscope size={24}/>, 
      cat: 'diagnostic' 
    },
    { 
      label: "ECG & Heart Monitoring", 
      desc: "Real-time cardiac rhythm analysis and non-invasive diagnostic heart testing.",
      icon: <Heart size={24}/>, 
      cat: 'diagnostic' 
    },
    { 
      label: "Mammography Screening", 
      desc: "Specialized breast health imaging for early detection and preventive screening.",
      icon: <ShieldCheck size={24}/>, 
      cat: 'diagnostic' 
    },
    { 
      label: "24/7 Pharmacy", 
      desc: "Fully stocked onsite pharmacy providing genuine medications around the clock.",
      icon: <Pill size={24}/>, 
      cat: 'diagnostic' 
    },
  ];

  const faqs = [
    {
      q: "What are the hospital's emergency and OPD timings?",
      a: "Nazeer Begum Memorial Hospital (NBMH) operates its Specialist Emergency services 24/7. Our standard Outpatient Departments (OPD) are typically open from 9:00 AM to 11:00 PM, although individual specialist timings may vary. Please check the 'Doctors' page for specific consultant schedules."
    },
    {
      q: "How can I book an appointment with a specialist?",
      a: "You can easily book an appointment through our online portal by clicking 'Book Appointment'. Select your desired specialist, choose a convenient time slot, and provide the transaction ID (TID) after transferring the consultation fee via JazzCash, EasyPaisa, or Meezan Bank for priority slot confirmation."
    },
    {
      q: "Where exactly is the hospital located in Rawalpindi?",
      a: "We are located at 143-Hub Commercial, in front of Bahria Town Old Head Office, Phase 8 Bahria Town, Rawalpindi. Our facility is easily accessible from all major phases of Bahria Town, DHA, and the wider Twin Cities area."
    },
    {
      q: "Do you offer diagnostic and laboratory services?",
      a: "Yes, NBMH features a fully-equipped diagnostic center including a 24/7 clinical laboratory, digital X-Ray, color Doppler ultrasound, ECG, and mammography. Most diagnostic results are processed rapidly to assist in immediate clinical decision-making."
    },
    {
      q: "How can I check the status of my appointment?",
      a: "You can track your appointment status in real-time by visiting the 'Check Status' page. Simply enter the Phone Number, Email, or Transaction ID (TID) used during booking to see if your visit has been verified by our staff."
    },
    {
      q: "Is there an in-house pharmacy at NBMH?",
      a: "Yes, we have a 24/7 in-house pharmacy that ensures the availability of genuine medications and surgical supplies for both our inpatients and outpatient visitors at all times."
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? allServices 
    : allServices.filter(s => s.cat === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      <Meta 
        title="About Our Hospital | NBMH Bahria Town Phase 8 Rawalpindi"
        description="Learn about Nazeer Begum Memorial Hospital (NBMH). A leading tertiary care hospital in Hub Commercial, Bahria Town Rawalpindi."
      />
      
      {/* Hero Header Section */}
      <section className="bg-brand-secondary py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-brand-primary rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <p className="text-brand-tertiary font-black uppercase tracking-[0.4em] text-[10px] mb-2 animate-in fade-in slide-in-from-bottom duration-500">Established Excellence</p>
          <h1 className="text-5xl md:text-7xl font-bold font-serif leading-tight animate-in fade-in slide-in-from-bottom duration-700">
            About Nazeer Begum <br/> <span className="text-brand-tertiary">Memorial Hospital</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed italic">
            "Providing high-quality, affordable, and compassionate healthcare services at Hub Commercial, Bahria Town Rawalpindi."
          </p>
        </div>
      </section>

      {/* Vision, Mission & Motto Section */}
      <section className="py-24 bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center border border-white/20">
                  <Target size={32} className="text-brand-tertiary" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold font-serif italic">Our Vision & <span className="text-brand-tertiary">Mission</span></h2>
              </div>
              <p className="text-lg md:text-xl leading-relaxed font-light text-white/80">
                To provide the best possible healthcare to the less privileged with compassion, respect, and dignity. We envision NBMH as a state-of-the-art multidisciplinary institution where a patient’s lack of resources is never an impediment to receiving the care they deserve.
              </p>
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 italic">
                <p className="text-lg leading-relaxed text-brand-tertiary font-bold">
                  "Every patient seeking care at NBMH is provided the best clinical outcome irrespective of their capacity to pay."
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center border border-white/20">
                  <Flag size={32} className="text-brand-tertiary" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold font-serif italic">Our <span className="text-brand-tertiary">Motto</span></h2>
              </div>
              <p className="text-lg md:text-xl leading-relaxed font-light text-white/80">
                Clinical Excellence. Human Compassion. We are committed to meeting the highest standards of healthcare every single day, in everything we do for our community.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-brand-secondary/30 rounded-3xl border border-white/5 text-center">
                  <h4 className="font-bold text-brand-tertiary mb-1">Compassion</h4>
                  <p className="text-[10px] uppercase tracking-widest text-white/50">Our core ethos</p>
                </div>
                <div className="p-6 bg-brand-secondary/30 rounded-3xl border border-white/5 text-center">
                  <h4 className="font-bold text-brand-tertiary mb-1">Excellence</h4>
                  <p className="text-[10px] uppercase tracking-widest text-white/50">Our standard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Context Section */}
      <section className="py-24 bg-[#fcfaf7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-brand-secondary font-bold text-3xl md:text-4xl font-serif">A Trusted <span className="text-brand-primary">Tertiary Care</span> Institution</h2>
                <p className="text-slate-600 text-lg leading-relaxed text-justify">
                  Nazeer Begum Memorial Hospital is a trusted multi-specialty institution in Rawalpindi, located at 143-Hub Commercial, Phase 8, Bahria Town. We provide high-quality healthcare to Rawalpindi, Islamabad, Bahria Town, and DHA communities, treating every patient with dignity and respect.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {highlights.map((h, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 group hover:shadow-xl transition-all">
                    <div className="mb-4">{h.icon}</div>
                    <h4 className="font-bold text-brand-secondary mb-1">{h.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{h.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-secondary/5 rounded-full -z-10"></div>
              <div className="bg-white p-8 rounded-[3rem] shadow-2xl border-8 border-white overflow-hidden group">
                 <img 
                   src="https://lh3.googleusercontent.com/d/1lx6nx78K2htGaXZ5nyPTFBKG98CCowBe" 
                   alt="NBMH Hospital Building" 
                   className="w-full rounded-[2rem] h-[400px] object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                 />
                 <div className="absolute bottom-12 right-12 bg-brand-primary text-white p-6 rounded-3xl shadow-2xl border border-white/10 hidden md:block">
                    <p className="text-brand-tertiary font-black text-[9px] uppercase tracking-widest mb-1">Hub Commercial</p>
                    <h4 className="text-xl font-bold">Bahria Town PH 8</h4>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Directory Section */}
      <section className="py-24 bg-white border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-brand-secondary font-bold text-3xl md:text-5xl font-serif">Comprehensive <span className="text-brand-primary">Medical Ecosystem</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">We offer a full spectrum of therapeutic and diagnostic services under one roof in Bahria Town Phase 8.</p>
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat.id ? 'bg-brand-primary text-white shadow-xl translate-y-[-2px]' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
            {filteredServices.map((point, i) => (
              <div 
                key={i} 
                className="bg-[#fcfaf7] rounded-[2.5rem] p-8 md:p-10 border border-slate-100 hover:border-brand-tertiary hover:bg-white hover:shadow-2xl hover:scale-[1.02] transition-all group flex flex-col h-full"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-tertiary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-all mb-6">
                  {point.icon}
                </div>
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold text-brand-secondary leading-tight">{point.label}</h4>
                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-tertiary bg-brand-tertiary/10 px-3 py-1 rounded-full">{point.cat}</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {point.desc}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-brand-primary transition-colors">
                  Service Highlight <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#fcfaf7] border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <p className="text-brand-primary font-black uppercase tracking-[0.4em] text-[10px]">Patient Help Desk</p>
            <h2 className="text-4xl font-bold text-brand-secondary font-serif italic">Frequently Asked <span className="text-brand-tertiary">Questions</span></h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
              Find quick answers to common questions about visiting our hospital, booking appointments, and our specialized services.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`rounded-[2rem] border transition-all duration-300 overflow-hidden ${activeFaq === idx ? 'bg-white border-brand-tertiary shadow-xl' : 'bg-white border-slate-100'}`}
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl transition-all ${activeFaq === idx ? 'bg-brand-primary text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'}`}>
                      <HelpCircle size={20} />
                    </div>
                    <span className={`font-bold text-lg transition-colors ${activeFaq === idx ? 'text-brand-secondary' : 'text-slate-700'}`}>
                      {faq.q}
                    </span>
                  </div>
                  <div className={`p-2 rounded-full transition-all ${activeFaq === idx ? 'bg-brand-primary text-white rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                    {activeFaq === idx ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out ${activeFaq === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                   <div className="px-8 pb-8 pt-0 md:px-20">
                     <div className="w-full h-0.5 bg-slate-50 mb-6"></div>
                     <p className="text-slate-600 leading-relaxed font-medium">
                       {faq.a}
                     </p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
