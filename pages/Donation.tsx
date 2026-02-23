
import React, { useState } from 'react';
import { SiteData } from '../types';
import { 
  Heart, 
  Landmark,
  HandHeart,
  Check,
  Copy,
  Building2,
  Info,
  ShieldCheck,
  Smartphone,
  Flag,
  Target
} from 'lucide-react';
import { Meta } from '../App';

const Donation: React.FC<{ data: SiteData }> = ({ data }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const donationCauses = [
    { title: "Free Dialysis Fund", desc: "Supporting regular treatment for patients with renal failure." },
    { title: "Maternity Support", desc: "Providing safe deliveries for underprivileged mothers." },
    { title: "Emergency Trauma Care", desc: "Funding life-saving immediate surgeries for trauma cases." },
    { title: "Free Medical Camps", desc: "Organizing bi-monthly health screening camps in remote areas." }
  ];

  return (
    <div className="bg-[#fcfaf7] min-h-screen pb-24">
      <Meta 
        title="Donate & Support | Nazeer Begum Memorial Foundation"
        description="Contribute to Nazeer Begum Memorial Hospital (NBMH). Your manual bank donations help provide free surgeries and medical aid in Bahria Town Rawalpindi."
      />

      {/* Hero Section */}
      <section className="bg-brand-secondary py-24 md:py-36 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center"></div>
           <div className="absolute top-0 left-0 w-96 h-96 bg-brand-tertiary rounded-full blur-[150px] opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-primary rounded-full blur-[150px] opacity-10 translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-8">
          <div className="flex justify-center mb-4">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                <HandHeart size={14} className="text-brand-tertiary" /> Philanthropy Division
             </div>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold italic leading-tight animate-in fade-in slide-in-from-bottom duration-700">
            Serve Humanity <br/><span className="text-brand-tertiary">Serve God</span>
          </h1>
          <p className="text-white/60 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            NBMH is committed to providing best possible care to the less privileged. Your contribution ensures a patient’s lack of resources is never an impediment to receiving the care they deserve.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Bank Accounts - Left Sidebar */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-8 md:p-14">
              <div className="flex items-center gap-4 mb-12 border-b border-slate-50 pb-8">
                <div className="w-14 h-14 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-xl">
                  <Landmark size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-brand-secondary">Bank Transfer Details</h2>
                  <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Official Philanthropic Accounts</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-12">
                {data.donationAccounts.map((account, idx) => (
                  <div key={idx} className="group relative bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 hover:border-brand-tertiary transition-all duration-500 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-10">
                      <div className="flex items-center gap-8">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-[2rem] p-4 flex items-center justify-center border border-slate-100 group-hover:bg-white group-hover:scale-105 transition-all">
                           {account.logo ? (
                             <img src={account.logo} className="w-full h-full object-contain" alt={account.bankName} />
                           ) : (
                             <Building2 size={40} className="text-slate-200" />
                           )}
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black text-brand-secondary leading-tight">{account.bankName}</h3>
                          <p className="text-brand-primary font-bold text-[10px] uppercase tracking-widest mt-1">{account.branchName}</p>
                        </div>
                      </div>
                      <div className="shrink-0 w-full md:w-auto">
                         <div className="bg-brand-secondary/5 px-6 py-3 rounded-2xl border border-brand-secondary/10 text-center">
                            <p className="text-[10px] font-black text-brand-secondary uppercase tracking-widest mb-1">Verify Recipient</p>
                            <p className="text-sm font-bold text-slate-700">{account.accountTitle}</p>
                         </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Account Number</p>
                          <div className="group/field relative bg-slate-50 rounded-[2rem] p-6 border border-slate-100 transition-all hover:bg-brand-primary hover:text-white">
                             <span className="block font-mono text-2xl font-black tracking-widest transition-colors break-all">
                               {account.accountNumber}
                             </span>
                             <button 
                               onClick={() => copyToClipboard(account.accountNumber, `acc-${idx}`)}
                               className={`absolute top-4 right-4 p-3 rounded-xl transition-all ${copiedId === `acc-${idx}` ? 'bg-brand-tertiary text-white' : 'bg-white text-slate-400 hover:bg-white group-hover/field:bg-white/20 group-hover/field:text-white shadow-sm'}`}
                             >
                               {copiedId === `acc-${idx}` ? <Check size={18}/> : <Copy size={18}/>}
                             </button>
                          </div>
                       </div>
                       <div className="space-y-3">
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">IBAN Number</p>
                          <div className="group/field relative bg-slate-50 rounded-[2rem] p-6 border border-slate-100 transition-all hover:bg-brand-secondary hover:text-white">
                             <span className="block font-mono text-sm md:text-base font-black tracking-wider transition-colors break-all pr-12">
                               {account.iban}
                             </span>
                             <button 
                               onClick={() => copyToClipboard(account.iban, `iban-${idx}`)}
                               className={`absolute top-4 right-4 p-3 rounded-xl transition-all ${copiedId === `iban-${idx}` ? 'bg-brand-tertiary text-white' : 'bg-white text-slate-400 hover:bg-white group-hover/field:bg-white/20 group-hover/field:text-white shadow-sm'}`}
                             >
                               {copiedId === `iban-${idx}` ? <Check size={18}/> : <Copy size={18}/>}
                             </button>
                          </div>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Vision & Impact */}
          <div className="lg:col-span-4 space-y-12">
            <div className="bg-brand-primary rounded-[3.5rem] p-10 md:p-12 text-white space-y-12 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-125 transition-transform duration-[2s]">
                  <Target size={200} fill="currentColor" />
               </div>
               <div className="relative z-10 space-y-8">
                  <h3 className="text-4xl font-bold italic leading-tight">Our Impact & <br/> <span className="text-brand-tertiary">Vision</span></h3>
                  <p className="text-white/80 text-base leading-relaxed font-light">
                    Every month, hundreds of patients receive subsidized procedures and essential diagnostics at NBMH through your support.
                  </p>
                  
                  <div className="space-y-6">
                     <div className="p-6 bg-white/10 rounded-3xl border border-white/20">
                        <h4 className="font-bold text-lg text-brand-tertiary flex items-center gap-3">
                           <ShieldCheck size={20}/> Clinical Excellence
                        </h4>
                        <p className="text-xs text-white/60 mt-2">Highest clinical standards for every life we touch, regardless of funds.</p>
                     </div>
                     <div className="p-6 bg-white/10 rounded-3xl border border-white/20">
                        <h4 className="font-bold text-lg text-brand-tertiary flex items-center gap-3">
                           <HandHeart size={20}/> Dignity & Respect
                        </h4>
                        <p className="text-xs text-white/60 mt-2">Treating all patients with equal honor, ensuring clinical outcomes are the priority.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[3.5rem] p-10 md:p-12 shadow-xl border border-slate-100 space-y-10 text-center">
               <h4 className="text-xl font-bold text-brand-secondary font-serif italic">Our Promise</h4>
               <p className="text-sm text-slate-500 leading-relaxed font-medium italic">
                  "At NBMH, paying ability shall never be a barrier to health. 100% of your donation supports patient care."
               </p>
               <div className="pt-6">
                  <div className="w-16 h-1 h-1 bg-brand-tertiary mx-auto rounded-full"></div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Donation;
