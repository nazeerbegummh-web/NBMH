
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  ChevronRight,
  Youtube,
  Clock,
  ArrowUp,
  Lock,
  HandCoins,
  ArrowUpRight,
  Loader2,
  Wifi,
  WifiOff,
  Search,
  ChevronLeft,
  CircleCheck
} from 'lucide-react';

import { SiteData } from './types';
import { INITIAL_DATA } from './constants';
import { fetchFromSupabase, syncToSupabase, testSupabaseConnection } from './supabase';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import Departments from './pages/Departments';
import Blogs from './pages/Blogs';
import Donation from './pages/Donation';
import AppointmentBooking from './pages/AppointmentBooking';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminLogin from './pages/Admin/AdminLogin';
import DoctorProfile from './pages/DoctorProfile';
import CheckStatus from './pages/CheckStatus';
import Contact from './pages/Contact';
import Videos from './pages/Videos';

export const Meta: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  useEffect(() => {
    document.title = `${title} | Nazeer Begum Memorial Hospital (NBMH)`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);
  return null;
};

const App: React.FC = () => {
  const [data, setData] = useState<SiteData>(INITIAL_DATA);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Initial Fetch from Supabase
  const initData = useCallback(async () => {
    try {
      const dbData = await fetchFromSupabase();
      if (dbData) {
        setData({ ...INITIAL_DATA, ...dbData });
      } else {
        await syncToSupabase(INITIAL_DATA);
      }
      const connectionOk = await testSupabaseConnection();
      setIsOnline(connectionOk);
    } catch (err) {
      console.error("Initialization Failed:", err);
      setIsOnline(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initData();
    const interval = setInterval(async () => {
      const ok = await testSupabaseConnection();
      setIsOnline(ok);
    }, 60000);
    return () => clearInterval(interval);
  }, [initData]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateData = async (newData: SiteData) => {
    const result = await syncToSupabase(newData);
    setIsOnline(result.success);
    if (result.success) {
      setData(newData);
    }
    return result; // Return result for Admin Dashboard error handling
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-primary flex flex-col items-center justify-center space-y-6">
        <Loader2 className="text-brand-tertiary animate-spin" size={64} />
        <div className="text-center space-y-2">
          <p className="text-white font-black uppercase tracking-[0.4em] text-xs">NBMH Registry Connection</p>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Accessing Hospital Database...</p>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <NavigationContainer isAdmin={isAdmin} setIsAdmin={setIsAdmin} data={data} isOnline={isOnline} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/about" element={<About data={data} />} />
            <Route path="/doctors" element={<Doctors doctors={data.doctors} departments={data.departments} />} />
            <Route path="/doctor/:id" element={<DoctorProfile doctors={data.doctors} />} />
            <Route path="/departments" element={<Departments departments={data.departments} doctors={data.doctors} />} />
            <Route path="/departments/:id" element={<Departments departments={data.departments} doctors={data.doctors} />} />
            <Route path="/blogs" element={<Blogs blogs={data.blogs} />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/donation" element={<Donation data={data} />} />
            <Route path="/appointment" element={<AppointmentBooking data={data} updateData={updateData} />} />
            <Route path="/check-status" element={<CheckStatus appointments={data.appointments} doctors={data.doctors} />} />
            <Route path="/contact" element={<Contact data={data} updateData={updateData} />} />
            <Route path="/admin" element={isAdmin ? <AdminDashboard data={data} updateData={updateData} isOnline={isOnline} /> : <AdminLogin setIsAdmin={setIsAdmin} />} />
          </Routes>
        </main>

        <Footer data={data} isOnline={isOnline} />

        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-24 right-6 md:bottom-32 md:right-10 z-[90] bg-white text-brand-primary p-3 rounded-full shadow-2xl border border-slate-100 transition-all duration-500 transform ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} strokeWidth={2.5} />
        </button>

        <Link 
          to="/donation" 
          className="fixed bottom-24 left-6 md:bottom-32 md:left-10 z-[100] bg-brand-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-3 border-2 border-white/50 backdrop-blur-sm"
        >
          <HandCoins size={28} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold text-[10px] uppercase tracking-widest px-0 group-hover:px-2">
            Donate Now
          </span>
        </Link>

        <a 
          href="https://wa.me/923125152659" 
          target="_blank" 
          rel="noreferrer" 
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] hover:scale-110 active:scale-95 transition-all group flex items-center gap-3"
        >
          <span className="hidden md:block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-black text-[10px] uppercase tracking-widest pl-2 bg-white/90 backdrop-blur-md text-brand-secondary py-2 px-4 rounded-full border border-slate-100">
            Patient Helpline
          </span>
          <img 
            src="https://lh3.googleusercontent.com/d/1F_1QOPL6hw9MJ0bc_GNVYHtl5RE43mG1" 
            alt="WhatsApp Chat" 
            className="w-14 h-14 md:h-16 md:h-16 object-contain rounded-full shadow-xl" 
          />
        </a>
      </div>
    </HashRouter>
  );
};

const NavigationContainer: React.FC<{ isAdmin: boolean; setIsAdmin: (v: boolean) => void; data: SiteData; isOnline: boolean }> = (props) => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) {
    return null;
  }
  return <Navbar {...props} />;
};

const Navbar: React.FC<{ isAdmin: boolean; setIsAdmin: (v: boolean) => void; data: SiteData; isOnline: boolean }> = ({ data, isOnline }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinksLeft = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Doctors', path: '/doctors' },
  ];

  const navLinksRight = [
    { name: 'Facilities', path: '/departments' },
    { name: 'Gallery', path: '/videos' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'pt-2' : 'pt-4 md:pt-8'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="relative">
          <nav className={`flex items-center justify-between h-14 md:h-16 lg:h-20 px-6 md:px-12 rounded-full transition-all duration-500 relative z-20 ${isScrolled ? 'bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl' : 'bg-black/10 backdrop-blur-md border border-white/10 shadow-lg'}`}>
            
            <div className="hidden lg:flex items-center gap-6 xl:gap-10 w-1/3">
              {navLinksLeft.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={`text-[10px] xl:text-[11px] font-black uppercase tracking-[0.2em] transition-all relative py-2 ${location.pathname === link.path ? 'text-brand-primary' : isScrolled ? 'text-slate-600 hover:text-brand-primary' : 'text-white hover:text-brand-tertiary drop-shadow-md'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="lg:hidden w-1/3 flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`p-2.5 rounded-2xl transition-all shadow-lg ${isScrolled ? 'bg-brand-primary text-white' : 'bg-white/10 backdrop-blur-md text-white border border-white/20'}`}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 -top-8 md:-top-14 lg:-top-16 flex flex-col items-center pointer-events-none w-1/3">
              <Link to="/" className="pointer-events-auto flex flex-col items-center group">
                <div className="relative flex flex-col items-center">
                  <div className={`absolute -inset-4 bg-white/5 backdrop-blur-sm rounded-full transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}></div>
                  {data.branding.logoUrl && (
                    <img 
                      src={data.branding.logoUrl} 
                      alt="Hospital Logo" 
                      className={`relative z-10 h-16 w-auto md:h-24 lg:h-28 object-contain transition-all duration-700 drop-shadow-2xl ${isScrolled ? 'h-14 md:h-18 mt-6 md:mt-10 lg:mt-12' : ''}`}
                    />
                  )}
                </div>

                <div className={`mt-1 md:mt-2 flex flex-col items-center transition-all duration-500 ${isScrolled ? 'scale-75 -translate-y-4' : 'scale-100'}`}>
                   <span className={`text-xl md:text-3xl lg:text-4xl font-black italic uppercase tracking-tighter leading-none font-serif drop-shadow-lg transition-colors ${isScrolled ? 'text-[#862a24]' : 'text-white'}`}>
                      Nazeer Begum
                   </span>
                   <div className="mt-1 bg-[#1fb036] text-white px-5 md:px-8 py-0.5 md:py-1 rounded-full shadow-lg relative border border-white/10">
                      <p className="text-[7px] md:text-[9px] lg:text-[11px] font-black uppercase tracking-[0.3em] whitespace-nowrap">
                        Memorial Hospital
                      </p>
                   </div>
                </div>
              </Link>
            </div>

            <div className="hidden lg:flex items-center justify-end gap-3 xl:gap-4 w-1/3">
              {navLinksRight.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={`text-[10px] xl:text-[11px] font-black uppercase tracking-[0.2em] transition-all relative py-2 ${location.pathname === link.path ? 'text-brand-primary' : isScrolled ? 'text-slate-600 hover:text-brand-primary' : 'text-white hover:text-brand-tertiary drop-shadow-md'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center gap-2">
                <Link 
                  to="/check-status" 
                  className={`px-4 py-2.5 rounded-full font-black uppercase tracking-[0.1em] text-[9px] transition-all border border-brand-tertiary/20 flex items-center gap-2 ${isScrolled ? 'bg-slate-50 text-brand-secondary shadow-sm hover:bg-brand-secondary hover:text-white' : 'bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-brand-primary'}`}
                >
                  <Search size={14} /> TRACK
                </Link>
                <Link 
                  to="/appointment" 
                  className={`px-6 py-3 rounded-full font-black uppercase tracking-[0.1em] text-[9px] transition-all shadow-xl active:scale-95 flex items-center gap-2 ${isScrolled ? 'bg-brand-primary text-white' : 'bg-brand-tertiary text-white hover:bg-white hover:text-brand-primary'}`}
                >
                  BOOK
                </Link>
              </div>
            </div>

            <div className="lg:hidden w-1/3 flex justify-end">
               <Link to="/contact" className={`p-2.5 rounded-full transition-all shadow-lg ${isScrolled ? 'bg-brand-tertiary text-white' : 'bg-white/10 backdrop-blur-md text-white border border-white/20'}`}>
                 <Phone size={20} />
               </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-brand-secondary z-[150] transition-all duration-700 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="h-full flex flex-col w-full relative">
          
          {/* Menu Header with Back and Close */}
          <div className="flex justify-between items-center p-6 pt-10 border-b border-white/5">
            <button 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-white/60 font-black text-xs uppercase tracking-widest hover:text-white transition-colors"
            >
              <ChevronLeft size={20} /> Back
            </button>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/20 shadow-xl"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow flex flex-col justify-between py-12">
            <div className="flex flex-col px-8">
              {[...navLinksLeft, ...navLinksRight].map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)} 
                  className="text-4xl font-black text-white/50 hover:text-white uppercase transition-all tracking-tighter py-6 border-b border-white/5 flex justify-between items-center group"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight size={28} className="opacity-0 group-hover:opacity-100 transition-all text-brand-tertiary" />
                </Link>
              ))}
            </div>
            
            <div className="px-8 pb-10 space-y-4">
              {/* Track Your Visit Button */}
              <Link 
                to="/check-status" 
                onClick={() => setIsOpen(false)} 
                className="w-full bg-white/5 border border-white/10 text-white py-6 rounded-3xl text-center font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all active:scale-95 hover:bg-white/10"
              >
                <Search size={20} className="text-brand-tertiary" /> Track Your Visit
              </Link>
              
              {/* Book Urgent Visit Button */}
              <Link 
                to="/appointment" 
                onClick={() => setIsOpen(false)} 
                className="w-full bg-brand-tertiary text-white py-6 rounded-3xl text-center font-black uppercase tracking-[0.2em] text-xs block shadow-2xl relative overflow-hidden active:scale-95 transition-all group"
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center border-2 border-white/20">
                   <Heart size={20} fill="currentColor" />
                </div>
                Book Urgent Visit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const Footer: React.FC<{ data: SiteData; isOnline: boolean }> = ({ data, isOnline }) => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;
  
  const socialLinks = [
    { Icon: Facebook, url: "https://web.facebook.com/www.nbmh.com.pk/?_rdc=1&_rdr#", label: "Facebook" },
    { Icon: Instagram, url: "https://www.instagram.com/reel/DM-iBJ0ItHY/?hl=en", label: "Instagram" },
    { Icon: Youtube, url: "https://www.youtube.com/@nazeerbegummemorialhospita3202", label: "YouTube" }
  ];

  return (
    <footer className="bg-brand-primary text-white pt-24 pb-12 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        <div className="space-y-10">
          <div className="flex flex-col gap-6">
            {data.branding.logoUrl && (
              <img 
                src={data.branding.logoUrl} 
                alt="Institutional Logo" 
                className="h-20 md:h-28 w-auto object-contain self-start drop-shadow-2xl"
              />
            )}
            <div className="space-y-1">
              <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-none uppercase font-serif italic text-white drop-shadow-lg">Nazeer Begum</h3>
              <p className="text-[#1fb036] font-black text-xs md:text-lg uppercase tracking-[0.4em] drop-shadow-md">Memorial Hospital</p>
            </div>
          </div>
          <p className="text-sm text-white/50 leading-relaxed font-medium">Official portal for NBMH - Providing specialized healthcare in Bahria Town PH 8 Rawalpindi via NBMH.org.</p>
          <div className="flex gap-5">
             {socialLinks.map((social, i) => (
               <a 
                 key={i} 
                 href={social.url} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#1fb036] transition-all border border-white/5 group shadow-xl" 
                 aria-label={social.label}
               >
                 <social.Icon size={20}/>
               </a>
             ))}
          </div>
        </div>
        <div>
          <h4 className="text-[#1fb036] font-black text-[10px] uppercase tracking-widest mb-10 border-l-2 border-[#1fb036] pl-4">Institutional Links</h4>
          <ul className="space-y-4 text-sm font-bold text-white/60">
             <li><Link to="/doctors" className="hover:text-white transition-colors flex items-center gap-2 group"><ChevronRight size={14} /> Specialists Registry</Link></li>
             <li><Link to="/departments" className="hover:text-white transition-colors flex items-center gap-2 group"><ChevronRight size={14} /> Medical Centers</Link></li>
             <li><Link to="/donation" className="hover:text-white transition-colors flex items-center gap-2 group"><ChevronRight size={14} /> Donation Portal</Link></li>
             <li><Link to="/check-status" className="hover:text-white transition-colors flex items-center gap-2 group"><ChevronRight size={14} /> Visit Tracking</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[#1fb036] font-black text-[10px] uppercase tracking-widest mb-10 border-l-2 border-[#1fb036] pl-4">Contact Details</h4>
          <ul className="space-y-8 text-sm text-white/60">
             <li className="flex gap-4 items-start"><MapPin size={24} className="text-[#1fb036] shrink-0 mt-1" /> <span className="font-medium leading-relaxed">{data.branding.address}</span></li>
             <li className="flex gap-4 items-center"><Phone size={24} className="text-[#1fb036] shrink-0" /> <span className="font-bold text-lg">{data.branding.phone}</span></li>
             <li className="flex gap-4 items-center"><Clock size={24} className="text-[#1fb036] shrink-0" /> <span className="font-black text-[11px] uppercase tracking-[0.2em] bg-[#1fb036]/20 text-[#1fb036] px-3 py-1 rounded-full border border-[#1fb036]/20">24/7 Specialist Emergency</span></li>
          </ul>
        </div>
        <div className="bg-white/5 p-10 rounded-[3rem] space-y-8 border border-white/5 shadow-inner">
           <h4 className="text-white font-bold text-xl border-l-4 border-[#1fb036] pl-4">Welfare Foundation</h4>
           <p className="text-xs text-white/40 leading-relaxed font-medium italic">"Every donation directly supports subsidized surgeries and free patient care at NBMH.org."</p>
           <Link to="/donation" className="block w-full bg-[#1fb036] text-white py-6 rounded-2xl text-center text-[11px] font-black uppercase tracking-widest shadow-2xl border border-white/10 hover:bg-white hover:text-brand-primary transition-all">Support Mission</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black">© 2026 Nazeer Begum Memorial Hospital (NBMH). Verified Welfare Trust.</p>
        <div className="flex items-center gap-4">
          <Link to="/admin" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-[#1fb036] transition-colors group">
            <Lock size={12} className="group-hover:scale-110 transition-transform" /> 
            Staff Access
          </Link>
          <div className="flex items-center gap-2">
            {isOnline ? <Wifi size={10} className="text-brand-tertiary" /> : <WifiOff size={10} className="text-brand-primary" />}
            <span className="text-[9px] font-black uppercase tracking-widest text-white/20">{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>
        <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black flex items-center gap-2">Website Develop By <a href="https://wa.me/923022194075" target="_blank" rel="noreferrer" className="text-[#1fb036] hover:underline transition-all font-black">M.Zohaib</a></p>
      </div>
    </footer>
  );
};

export default App;
