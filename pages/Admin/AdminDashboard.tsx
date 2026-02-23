
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SiteData, Appointment, Doctor, Department, DonationAccount, ContactMessage, PaymentConfig, BlogPost, BrandingConfig } from '../../types';
import { 
  Users, 
  Trash2, 
  CheckCircle,
  X,
  ShieldCheck,
  Bell,
  Calendar,
  Building2,
  Plus,
  Pencil,
  Layout,
  Eye,
  Banknote,
  PlusCircle,
  Inbox,
  Wifi,
  WifiOff,
  RefreshCw,
  AlertCircle,
  Loader2,
  Upload,
  Image as ImageIcon,
  Camera,
  Search,
  Check,
  Link as LinkIcon,
  CreditCard
} from 'lucide-react';
import { uploadFile } from '../../supabase';

const AdminDashboard: React.FC<{ data: SiteData; updateData: (d: SiteData) => Promise<{ success: boolean; message?: string }>; isOnline: boolean }> = ({ data, updateData, isOnline }) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'doctors' | 'departments' | 'donations' | 'news' | 'messages' | 'payments' | 'blogs' | 'branding'>('appointments');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'info' | 'error'; details?: string } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Modals state
  const [isAptModalOpen, setIsAptModalOpen] = useState(false);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  // Edit states
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);
  const [editingDoctor, setEditingDoctor] = useState<Partial<Doctor> | null>(null);
  const [editingDept, setEditingDept] = useState<Partial<Department> | null>(null);
  const [editingDonation, setEditingDonation] = useState<Partial<DonationAccount> & { originalIban?: string } | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  
  const [editPayment, setEditPayment] = useState<PaymentConfig>(data.paymentConfig);
  const [editBranding, setEditBranding] = useState<BrandingConfig>(data.branding);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const notify = (message: string, type: 'success' | 'info' | 'error' = 'success', details?: string) => {
    setFeedback({ message, type, details });
  };

  const wrapUpdate = async (newData: SiteData) => {
    setIsSyncing(true);
    try {
      const result = await updateData(newData);
      if (result && result.success) {
        notify('Cloud Sync Successful', 'success', 'Registry updated on Supabase.');
        return true;
      } else {
        notify('Supabase Error', 'error', result?.message || 'The server rejected this update (Check RLS Policies).');
        return false;
      }
    } catch (err: any) {
      notify('Critical Error', 'error', err.message || 'Could not reach the database server.');
      return false;
    } finally {
      setIsSyncing(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      notify('File too large', 'error', 'Please upload an image smaller than 3MB.');
      return;
    }

    setIsUploading(true);
    try {
      const result = await uploadFile(file);
      if (result.success && result.url) {
        setEditingDoctor(prev => ({ ...prev, image: result.url }));
        notify('Photo Uploaded', 'success', 'Image successfully saved to PC storage.');
      } else {
        notify('Upload Failed', 'error', result.message || 'Supabase Storage RLS Violation.');
      }
    } catch (err) {
      notify('Error', 'error', 'Unexpected error during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoctor) return;
    if (!editingDoctor.name || !editingDoctor.specialty) {
      notify('Validation Error', 'error', 'Full Name and Specialty are required.');
      return;
    }
    
    const finalImage = editingDoctor.image || 'https://via.placeholder.com/400?text=No+Photo';
    
    let newDoctors;
    if (editingDoctor.id) {
      newDoctors = data.doctors.map(d => d.id === editingDoctor.id ? ({ ...editingDoctor, image: finalImage } as Doctor) : d);
    } else {
      newDoctors = [...data.doctors, { 
        ...editingDoctor, 
        image: finalImage,
        id: 'doc-' + Date.now(),
        qualification: editingDoctor.qualification || 'Consultant',
        experience: editingDoctor.experience || '10+ Years',
        motto: editingDoctor.motto || 'Commitment to Care.',
        days: editingDoctor.days || ['Mon-Fri']
      } as Doctor];
    }
    
    const success = await wrapUpdate({ ...data, doctors: newDoctors });
    if (success) {
      setIsDoctorModalOpen(false);
      setEditingDoctor(null);
    }
  };

  const handleSaveDept = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDept) return;
    
    if (!editingDept.name || !editingDept.urduName || !editingDept.description) {
      notify('Validation Error', 'error', 'Name, Urdu Name, and Description are required.');
      return;
    }

    const deptToSave = {
      ...editingDept,
      description: editingDept.description,
      icon: editingDept.icon || 'Activity'
    };

    let newDepts;
    if (editingDept.id) {
      newDepts = data.departments.map(d => d.id === editingDept.id ? (deptToSave as Department) : d);
    } else {
      newDepts = [...data.departments, { ...deptToSave, id: 'dept-' + Date.now() } as Department];
    }
    
    const success = await wrapUpdate({ ...data, departments: newDepts });
    if (success) {
      setIsDeptModalOpen(false);
      setEditingDept(null);
    }
  };

  const handleSaveDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDonation) return;
    let newDonations = [...(data.donationAccounts || [])];
    if (editingDonation.originalIban) {
      newDonations = newDonations.map(acc => acc.iban === editingDonation.originalIban ? {
        bankName: editingDonation.bankName!,
        accountTitle: editingDonation.accountTitle!,
        accountNumber: editingDonation.accountNumber!,
        iban: editingDonation.iban!,
        logo: editingDonation.logo,
        branchName: editingDonation.branchName
      } : acc);
    } else {
      newDonations.push({
        bankName: editingDonation.bankName!,
        accountTitle: editingDonation.accountTitle!,
        accountNumber: editingDonation.accountNumber!,
        iban: editingDonation.iban!,
        logo: editingDonation.logo,
        branchName: editingDonation.branchName
      });
    }
    const success = await wrapUpdate({ ...data, donationAccounts: newDonations });
    if (success) {
      setIsDonationModalOpen(false);
      setEditingDonation(null);
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    
    if (!editingBlog.title || !editingBlog.content) {
      notify('Validation Error', 'error', 'Title and Content are required.');
      return;
    }

    let newBlogs;
    if (editingBlog.id) {
      newBlogs = data.blogs.map(b => b.id === editingBlog.id ? (editingBlog as BlogPost) : b);
    } else {
      newBlogs = [...data.blogs, { 
        ...editingBlog, 
        id: 'blog-' + Date.now(),
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        author: editingBlog.author || data.branding.ceoName,
        image: editingBlog.image || 'https://picsum.photos/800/600',
        category: editingBlog.category || 'News'
      } as BlogPost];
    }
    
    const success = await wrapUpdate({ ...data, blogs: newBlogs });
    if (success) {
      setIsBlogModalOpen(false);
      setEditingBlog(null);
    }
  };

  const handleSaveBranding = async (e: React.FormEvent) => {
    e.preventDefault();
    await wrapUpdate({ ...data, branding: editBranding });
  };

  const handleUpdateApt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedApt) return;
    const formData = new FormData(e.currentTarget);
    const updatedApts = data.appointments.map(a => 
      a.id === selectedApt.id ? { 
        ...a, 
        status: formData.get('status') as Appointment['status'],
        adminMessage: formData.get('adminMessage') as string
      } : a
    );
    const success = await wrapUpdate({ ...data, appointments: updatedApts });
    if (success) {
      setIsAptModalOpen(false);
    }
  };

  const handleSavePayments = async (e: React.FormEvent) => {
    e.preventDefault();
    await wrapUpdate({ ...data, paymentConfig: editPayment });
  };

  const markMessageRead = async (msg: ContactMessage) => {
    const updatedMessages = data.messages.map(m => m.id === msg.id ? { ...m, status: 'read' as const } : m);
    await wrapUpdate({ ...data, messages: updatedMessages });
  };

  const totalRevenue = (data.appointments || []).reduce((acc, apt) => {
    if (apt.status === 'Confirmed' || apt.status === 'Completed') {
      const doc = data.doctors.find(d => d.id === apt.doctorId);
      return acc + parseInt(doc?.fee?.match(/\d+/)?.[0] || '0');
    }
    return acc;
  }, 0);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 font-sans selection:bg-brand-tertiary selection:text-white">
      {isSyncing && (
        <div className="fixed inset-0 z-[500] bg-brand-secondary/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl flex flex-col items-center gap-4">
             <Loader2 className="animate-spin text-brand-primary" size={48} />
             <p className="font-black text-brand-secondary uppercase tracking-widest text-xs">Syncing with Supabase...</p>
          </div>
        </div>
      )}

      <aside className="w-full lg:w-72 bg-brand-secondary text-white shrink-0 p-8 flex flex-col border-r border-white/5 z-50">
        <div className="mb-12 flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center shadow-2xl">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif leading-none">NBMH Admin</h2>
            <p className="text-[9px] font-black uppercase text-brand-tertiary tracking-[0.3em] mt-1">Control Panel</p>
          </div>
        </div>

        <nav className="space-y-2 flex-grow">
          {[
            { id: 'appointments', label: 'Consultations', icon: <Calendar size={18}/> },
            { id: 'doctors', label: 'Doctors Registry', icon: <Users size={18}/> },
            { id: 'departments', label: 'Clinical Sectors', icon: <Building2 size={18}/> },
            { id: 'blogs', label: 'Health Blogs', icon: <Layout size={18}/> },
            { id: 'donations', label: 'Bank Accounts', icon: <Banknote size={18}/> },
            { id: 'payments', label: 'Payment Settings', icon: <CreditCard size={18}/> },
            { id: 'branding', label: 'Site Branding', icon: <ShieldCheck size={18}/> },
            { id: 'news', label: 'Announcements', icon: <Bell size={18}/> },
            { id: 'messages', label: 'Messages', icon: <Inbox size={18}/> },
          ].map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-[11px] uppercase tracking-widest ${activeTab === tab.id ? 'bg-brand-primary text-white shadow-xl' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
            >
              {tab.icon} {tab.label}
              {tab.id === 'messages' && (data.messages || []).filter(m => m.status === 'unread').length > 0 && (
                <span className="ml-auto bg-brand-tertiary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {(data.messages || []).filter(m => m.status === 'unread').length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/5">
           <Link to="/" className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest text-white/50 hover:text-white transition-all">
             <Layout size={18}/> Exit Dashboard
           </Link>
        </div>
      </aside>

      <main className="flex-grow p-6 lg:p-12 overflow-y-auto max-h-screen">
        <div className="max-w-7xl mx-auto space-y-12">
          {feedback && (
            <div className={`fixed top-8 right-8 z-[300] p-6 rounded-[2rem] shadow-2xl border-2 flex items-start gap-4 animate-in slide-in-from-right duration-500 bg-white max-w-sm ${feedback.type === 'error' ? 'border-red-200 text-red-600' : 'border-brand-tertiary text-brand-tertiary'}`}>
              <div className="mt-1">
                {feedback.type === 'error' ? <AlertCircle size={24} /> : <CheckCircle size={24} />}
              </div>
              <div className="space-y-1 overflow-hidden">
                <p className="font-black uppercase text-[10px] tracking-widest">{feedback.message}</p>
                <p className="text-xs font-medium text-slate-500 break-words">{feedback.details}</p>
              </div>
              <button onClick={() => setFeedback(null)} className="text-slate-300 hover:text-slate-600"><X size={16}/></button>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-10 animate-in fade-in duration-700">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                   <h1 className="text-4xl md:text-6xl font-bold text-brand-secondary font-serif">Consultations</h1>
                   <p className="text-slate-400 font-medium">Manage patient appointments and clinical tracking.</p>
                </div>
                <div className="bg-white px-8 py-4 rounded-3xl border border-slate-100 shadow-sm text-center">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Clinic Revenue</p>
                    <p className="text-xl font-black text-brand-primary">Rs {totalRevenue.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="px-8 py-6">Patient</th>
                      <th className="px-8 py-6">Specialist</th>
                      <th className="px-8 py-6">Schedule</th>
                      <th className="px-8 py-6">Status</th>
                      <th className="px-8 py-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {(data.appointments || []).map(apt => (
                      <tr key={apt.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-6">
                          <p className="font-bold text-brand-secondary">{apt.patientName}</p>
                          <p className="text-xs text-slate-400">{apt.phone}</p>
                        </td>
                        <td className="px-8 py-6">
                          <p className="font-bold text-slate-600">{data.doctors.find(d => d.id === apt.doctorId)?.name || 'N/A'}</p>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-xs font-bold text-slate-500">{apt.date}</p>
                          <p className="text-[10px] uppercase text-slate-300">{apt.time}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${apt.status === 'Confirmed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{apt.status}</span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button onClick={() => { setSelectedApt(apt); setIsAptModalOpen(true); }} className="p-3 bg-slate-50 text-brand-secondary rounded-2xl hover:bg-brand-primary hover:text-white transition-all"><Eye size={18}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'doctors' && (
            <div className="space-y-10 animate-in fade-in duration-700">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <h1 className="text-4xl md:text-6xl font-bold text-brand-secondary font-serif">Doctors Registry</h1>
                <button onClick={() => { setEditingDoctor({}); setIsDoctorModalOpen(true); }} className="bg-brand-tertiary text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-3"><Plus size={18}/> Add Specialist</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.doctors.map(doc => (
                  <div key={doc.id} className="bg-white p-6 rounded-[2.5rem] shadow-lg border border-slate-100 flex flex-col items-center text-center group hover:border-brand-tertiary transition-all">
                    <img src={doc.image} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-slate-50 shadow-md" alt="" />
                    <h3 className="font-bold text-lg text-brand-secondary">{doc.name}</h3>
                    <p className="text-[10px] font-black uppercase text-brand-primary tracking-widest">{doc.specialty}</p>
                    <div className="flex gap-2 mt-6">
                      <button onClick={() => { setEditingDoctor(doc); setIsDoctorModalOpen(true); }} className="p-3 bg-slate-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Pencil size={16}/></button>
                      <button onClick={async () => {
                        if(window.confirm('Remove doctor?')) await wrapUpdate({...data, doctors: data.doctors.filter(d => d.id !== doc.id)});
                      }} className="p-3 bg-slate-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'departments' && (
            <div className="space-y-10 animate-in fade-in duration-700">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <h1 className="text-4xl md:text-6xl font-bold text-brand-secondary font-serif">Clinical Sectors</h1>
                <button onClick={() => { setEditingDept({ name: '', urduName: '', description: '', icon: 'Activity' }); setIsDeptModalOpen(true); }} className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-3"><Plus size={18}/> Add Sector</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(data.departments || []).map(dept => (
                  <div key={dept.id} className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-100 flex justify-between items-center hover:border-brand-primary transition-all group">
                    <div>
                      <h3 className="font-bold text-xl text-brand-secondary">{dept.name}</h3>
                      <p className="text-lg font-bold text-brand-primary" dir="rtl">{dept.urduName}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingDept(dept); setIsDeptModalOpen(true); }} className="p-3 bg-slate-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Pencil size={16}/></button>
                      <button onClick={async () => {
                        if(window.confirm('Delete this Clinical Sector?')) {
                          const updatedDepts = data.departments.filter(d => d.id !== dept.id);
                          await wrapUpdate({...data, departments: updatedDepts});
                        }
                      }} className="p-3 bg-slate-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'donations' && (
            <div className="space-y-10 animate-in fade-in duration-700">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <h1 className="text-4xl md:text-6xl font-bold text-brand-secondary font-serif">Bank Accounts</h1>
                <button onClick={() => { setEditingDonation({}); setIsDonationModalOpen(true); }} className="bg-brand-tertiary text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-3"><PlusCircle size={18}/> Add Account</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(data.donationAccounts || []).map(acc => (
                  <div key={acc.iban} className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl p-2 border border-slate-100 flex items-center justify-center">
                        {acc.logo ? <img src={acc.logo} className="w-full h-full object-contain" alt="" /> : <Banknote size={32} className="text-slate-200" />}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingDonation({ ...acc, originalIban: acc.iban }); setIsDonationModalOpen(true); }} className="p-2 bg-slate-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"><Pencil size={14}/></button>
                        <button onClick={async () => {
                          if(window.confirm('Delete account?')) await wrapUpdate({...data, donationAccounts: data.donationAccounts.filter(a => a.iban !== acc.iban)});
                        }} className="p-2 bg-slate-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white"><Trash2 size={14}/></button>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-brand-secondary mb-1">{acc.bankName}</h3>
                    <p className="text-[10px] font-black uppercase text-brand-tertiary tracking-widest">{acc.accountTitle}</p>
                    <p className="text-xs font-mono text-slate-400 mt-2">{acc.iban}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-10 animate-in fade-in duration-700">
               <h1 className="text-4xl md:text-6xl font-bold text-brand-secondary font-serif">Payment Methods</h1>
               <div className="bg-white p-10 md:p-14 rounded-[4rem] shadow-xl border border-slate-100 space-y-12">
                  <div className="space-y-8">
                     <h3 className="text-2xl font-bold text-brand-secondary flex items-center gap-3">
                        <Calendar size={24} className="text-brand-primary" /> Appointment Booking Accounts
                     </h3>
                     <form onSubmit={handleSavePayments} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Official Account Name</label>
                           <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" value={editPayment.appointment.accountName} onChange={e => setEditPayment({...editPayment, appointment: {...editPayment.appointment, accountName: e.target.value}})} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">JazzCash Number</label>
                           <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" value={editPayment.appointment.jazzCashNumber} onChange={e => setEditPayment({...editPayment, appointment: {...editPayment.appointment, jazzCashNumber: e.target.value}})} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">EasyPaisa Number</label>
                           <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" value={editPayment.appointment.easyPaisaNumber} onChange={e => setEditPayment({...editPayment, appointment: {...editPayment.appointment, easyPaisaNumber: e.target.value}})} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Bank Name</label>
                           <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" value={editPayment.appointment.bankName} onChange={e => setEditPayment({...editPayment, appointment: {...editPayment.appointment, bankName: e.target.value}})} />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Bank IBAN / Account Details</label>
                           <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" value={editPayment.appointment.bankIban} onChange={e => setEditPayment({...editPayment, appointment: {...editPayment.appointment, bankIban: e.target.value}})} />
                        </div>
                        <div className="md:col-span-2">
                           <button type="submit" disabled={isSyncing} className="w-full bg-brand-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95">
                              {isSyncing ? 'Syncing...' : 'Update Appointment Payments'}
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="space-y-10 animate-in fade-in duration-700">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <h1 className="text-4xl md:text-6xl font-bold text-brand-secondary font-serif">Health Blogs</h1>
                <button onClick={() => { setEditingBlog({}); setIsBlogModalOpen(true); }} className="bg-brand-tertiary text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-3"><Plus size={18}/> Write Blog</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.blogs.map(blog => (
                  <div key={blog.id} className="bg-white p-6 rounded-[2.5rem] shadow-lg border border-slate-100 flex gap-6 hover:border-brand-tertiary transition-all group">
                    <img src={blog.image} className="w-32 h-32 rounded-3xl object-cover shrink-0" alt="" />
                    <div className="flex-grow space-y-2">
                      <span className="text-[9px] font-black uppercase text-brand-primary tracking-widest">{blog.category}</span>
                      <h3 className="font-bold text-lg text-brand-secondary line-clamp-2">{blog.title}</h3>
                      <div className="flex gap-2 pt-2">
                        <button onClick={() => { setEditingBlog(blog); setIsBlogModalOpen(true); }} className="p-2 bg-slate-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Pencil size={14}/></button>
                        <button onClick={async () => {
                          if(window.confirm('Delete blog post?')) await wrapUpdate({...data, blogs: data.blogs.filter(b => b.id !== blog.id)});
                        }} className="p-2 bg-slate-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14}/></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'branding' && (
            <div className="space-y-10 animate-in fade-in duration-700">
              <h1 className="text-4xl md:text-6xl font-bold text-brand-secondary font-serif">Site Branding</h1>
              <div className="bg-white p-10 md:p-14 rounded-[4rem] shadow-xl border border-slate-100">
                <form onSubmit={handleSaveBranding} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Hospital Name</label>
                      <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" value={editBranding.hospitalName} onChange={e => setEditBranding({...editBranding, hospitalName: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Tagline</label>
                      <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" value={editBranding.tagline} onChange={e => setEditBranding({...editBranding, tagline: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Full Address</label>
                      <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" value={editBranding.address} onChange={e => setEditBranding({...editBranding, address: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Contact Phone</label>
                      <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" value={editBranding.phone} onChange={e => setEditBranding({...editBranding, phone: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">CEO Name</label>
                      <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" value={editBranding.ceoName} onChange={e => setEditBranding({...editBranding, ceoName: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">CEO Message</label>
                      <textarea className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-medium h-32 resize-none" value={editBranding.ceoMessage} onChange={e => setEditBranding({...editBranding, ceoMessage: e.target.value})} />
                    </div>
                  </div>
                  <button type="submit" disabled={isSyncing} className="w-full bg-brand-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95">
                    {isSyncing ? 'Syncing...' : 'Update Site Branding'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="space-y-10 animate-in fade-in duration-700">
              <h1 className="text-4xl md:text-6xl font-bold text-brand-secondary font-serif">Ticker News</h1>
              <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100">
                <div className="flex gap-4 mb-8">
                  <input 
                    type="text" 
                    placeholder="New ticker headline..." 
                    className="flex-grow p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold"
                    value={newAnnouncement}
                    onChange={(e) => setNewAnnouncement(e.target.value)}
                  />
                  <button onClick={async () => {
                    if(!newAnnouncement.trim()) return;
                    await wrapUpdate({...data, newsItems: [newAnnouncement, ...data.newsItems]});
                    setNewAnnouncement('');
                  }} className="bg-brand-tertiary text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest">Publish</button>
                </div>
                <div className="space-y-4">
                  {(data.newsItems || []).map((news, i) => (
                    <div key={i} className="flex justify-between items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 group">
                      <p className="font-bold text-slate-600">{news}</p>
                      <button onClick={async () => {
                        const next = [...data.newsItems];
                        next.splice(i, 1);
                        await wrapUpdate({...data, newsItems: next});
                      }} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-10 animate-in fade-in duration-700">
              <h1 className="text-4xl md:text-6xl font-bold text-brand-secondary font-serif">Messages</h1>
              <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="px-8 py-6">Sender</th>
                      <th className="px-8 py-6">Subject</th>
                      <th className="px-8 py-6">Date</th>
                      <th className="px-8 py-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {(data.messages || []).map(msg => (
                      <tr key={msg.id} className={msg.status === 'unread' ? 'bg-brand-tertiary/5' : ''}>
                        <td className="px-8 py-6">
                          <p className="font-bold text-brand-secondary">{msg.name}</p>
                          <p className="text-xs text-slate-400">{msg.email}</p>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-sm font-medium">{msg.subject}</p>
                        </td>
                        <td className="px-8 py-6 text-xs text-slate-400">{msg.date}</td>
                        <td className="px-8 py-6 text-right">
                          <button onClick={() => { setSelectedMessage(msg); markMessageRead(msg); setIsMessageModalOpen(true); }} className="p-3 bg-slate-50 text-brand-secondary rounded-2xl hover:bg-brand-primary hover:text-white transition-all"><Eye size={18}/></button>
                        </td>
                      </tr>
                    ))}
                    {(data.messages || []).length === 0 && (
                      <tr><td colSpan={4} className="px-8 py-20 text-center text-slate-300 uppercase font-black tracking-widest text-xs">Inbox is empty</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* --- MODALS --- */}

      {/* Blog Modal */}
      {isBlogModalOpen && editingBlog && (
        <div className="fixed inset-0 bg-brand-secondary/90 backdrop-blur-2xl z-[600] flex items-center justify-center p-4">
           <form onSubmit={handleSaveBlog} className="bg-white rounded-[4rem] w-full max-w-3xl p-8 md:p-14 shadow-2xl space-y-8 animate-in zoom-in duration-300 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                 <h3 className="text-3xl font-bold text-brand-secondary font-serif">Blog Post</h3>
                 <button type="button" onClick={() => setIsBlogModalOpen(false)} className="p-3 text-slate-400 hover:text-red-500 transition-all"><X size={32}/></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-1">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Blog Title</label>
                   <input required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold focus:bg-white" value={editingBlog.title || ''} onChange={e => setEditingBlog({...editingBlog, title: e.target.value})} placeholder="e.g. Tips for a Healthy Heart" />
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Category</label>
                   <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold focus:bg-white" value={editingBlog.category || 'News'} onChange={e => setEditingBlog({...editingBlog, category: e.target.value as any})}>
                      <option value="News">News</option>
                      <option value="Health Tips">Health Tips</option>
                      <option value="Success Story">Success Story</option>
                   </select>
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Image URL</label>
                   <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold focus:bg-white" value={editingBlog.image || ''} onChange={e => setEditingBlog({...editingBlog, image: e.target.value})} placeholder="https://picsum.photos/800/600" />
                </div>
                <div className="md:col-span-2 space-y-1">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Excerpt (Short Summary)</label>
                   <textarea required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-medium h-20 resize-none focus:bg-white" value={editingBlog.excerpt || ''} onChange={e => setEditingBlog({...editingBlog, excerpt: e.target.value})} placeholder="Brief summary of the blog..."></textarea>
                </div>
                <div className="md:col-span-2 space-y-1">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Full Content</label>
                   <textarea required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-medium h-64 resize-none focus:bg-white" value={editingBlog.content || ''} onChange={e => setEditingBlog({...editingBlog, content: e.target.value})} placeholder="Write your blog content here..."></textarea>
                </div>
              </div>
              <button type="submit" disabled={isSyncing} className="w-full bg-brand-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-transform disabled:opacity-50">
                {isSyncing ? 'Synchronizing...' : 'Publish Blog Post'}
              </button>
           </form>
        </div>
      )}

      {/* Sector Modal (Department) */}
      {isDeptModalOpen && editingDept && (
        <div className="fixed inset-0 bg-brand-secondary/90 backdrop-blur-2xl z-[600] flex items-center justify-center p-4">
           <form onSubmit={handleSaveDept} className="bg-white rounded-[4rem] w-full max-w-xl p-8 md:p-14 shadow-2xl space-y-8 animate-in zoom-in duration-300 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                 <h3 className="text-3xl font-bold text-brand-secondary font-serif">Clinical Sector</h3>
                 <button type="button" onClick={() => setIsDeptModalOpen(false)} className="p-3 text-slate-400 hover:text-red-500 transition-all"><X size={32}/></button>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Sector Name (English)</label>
                   <input required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold focus:bg-white" value={editingDept.name || ''} onChange={e => setEditingDept({...editingDept, name: e.target.value})} placeholder="e.g. Gynecology" />
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Sector Name (Urdu)</label>
                   <input required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold text-right focus:bg-white" value={editingDept.urduName || ''} onChange={e => setEditingDept({...editingDept, urduName: e.target.value})} placeholder="مثال کے طور پر: گائناکولوجی" />
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Icon Identifier</label>
                   <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold focus:bg-white" value={editingDept.icon || ''} onChange={e => setEditingDept({...editingDept, icon: e.target.value})} placeholder="e.g. Activity, Heart" />
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Sector Description</label>
                   <textarea required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-medium h-32 resize-none focus:bg-white" value={editingDept.description || ''} onChange={e => setEditingDept({...editingDept, description: e.target.value})} placeholder="Describe services..."></textarea>
                </div>
              </div>
              <button type="submit" disabled={isSyncing} className="w-full bg-brand-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-transform disabled:opacity-50">
                {isSyncing ? 'Synchronizing...' : 'Save Clinical Sector'}
              </button>
           </form>
        </div>
      )}

      {/* Specialist Modal (Doctor) */}
      {isDoctorModalOpen && editingDoctor && (
        <div className="fixed inset-0 bg-brand-secondary/90 backdrop-blur-2xl z-[600] flex items-center justify-center p-4">
           <form onSubmit={handleSaveDoctor} className="bg-white rounded-[4rem] w-full max-w-2xl p-8 md:p-14 shadow-2xl space-y-10 animate-in zoom-in duration-300 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                 <h3 className="text-3xl font-bold text-brand-secondary font-serif">Specialist Profile</h3>
                 <button type="button" onClick={() => setIsDoctorModalOpen(false)} className="p-3 text-slate-400 hover:text-red-500 transition-all"><X size={32}/></button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                <div className="md:col-span-5 flex flex-col items-center">
                   <div className="relative group">
                      <div className="w-40 h-40 md:w-52 md:h-52 rounded-[2.5rem] overflow-hidden border-8 border-slate-50 shadow-2xl relative bg-slate-100">
                         {isUploading && (
                           <div className="absolute inset-0 bg-brand-secondary/60 flex items-center justify-center z-20">
                              <Loader2 className="animate-spin text-white" size={40} />
                           </div>
                         )}
                         <img 
                           src={editingDoctor.image || 'https://via.placeholder.com/400?text=Upload+Photo'} 
                           className="w-full h-full object-cover" 
                           alt="Preview" 
                         />
                      </div>
                   </div>
                </div>

                <div className="md:col-span-7 space-y-6">
                   <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Option 1: Upload from PC</p>
                      <button 
                        type="button"
                        disabled={isUploading}
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-3 bg-slate-50 border-2 border-dashed border-slate-200 py-6 rounded-2xl hover:border-brand-primary hover:bg-white transition-all group"
                      >
                         <Upload size={24} className="text-slate-300 group-hover:text-brand-primary" />
                         <span className="text-xs font-bold text-slate-500 group-hover:text-brand-primary">
                           {isUploading ? 'Transferring File...' : 'Select File From Computer'}
                         </span>
                      </button>
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                   </div>

                   <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Option 2: Direct Image Link</p>
                      <div className="relative">
                         <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                         <input 
                           className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-xs font-bold focus:ring-4 focus:ring-brand-primary/5 focus:bg-white transition-all" 
                           value={editingDoctor.image || ''} 
                           onChange={e => setEditingDoctor({...editingDoctor, image: e.target.value})} 
                           placeholder="https://example.com/doctor-photo.jpg" 
                         />
                      </div>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Specialist Name</label>
                    <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold focus:bg-white transition-all" value={editingDoctor.name || ''} onChange={e => setEditingDoctor({...editingDoctor, name: e.target.value})} placeholder="Dr. Jane Smith" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Clinical Specialty</label>
                    <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold focus:bg-white transition-all" value={editingDoctor.specialty || ''} onChange={e => setEditingDoctor({...editingDoctor, specialty: e.target.value})} placeholder="Gynecologist" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Department</label>
                    <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold focus:bg-white cursor-pointer" value={editingDoctor.departmentId || ''} onChange={e => setEditingDoctor({...editingDoctor, departmentId: e.target.value})}>
                        <option value="">Choose Sector</option>
                        {data.departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Consultation Fee</label>
                    <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold focus:bg-white transition-all" value={editingDoctor.fee || ''} onChange={e => setEditingDoctor({...editingDoctor, fee: e.target.value})} placeholder="PKR 1500/-" />
                 </div>
              </div>

              <button 
                type="submit" 
                disabled={isUploading || isSyncing}
                className="w-full bg-brand-tertiary text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-xl active:scale-95 transition-all disabled:opacity-50"
              >
                {isSyncing ? 'Syncing Cloud...' : 'Save specialist Profile'}
              </button>
           </form>
        </div>
      )}

      {/* Appointment Modal */}
      {isAptModalOpen && selectedApt && (
        <div className="fixed inset-0 bg-brand-secondary/90 backdrop-blur-2xl z-[600] flex items-center justify-center p-4">
           <form onSubmit={handleUpdateApt} className="bg-white rounded-[4rem] w-full max-w-2xl p-10 md:p-16 shadow-2xl space-y-8 animate-in zoom-in duration-300">
              <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                 <h3 className="text-3xl font-bold text-brand-secondary font-serif">Visit # {selectedApt.id}</h3>
                 <button type="button" onClick={() => setIsAptModalOpen(false)} className="p-3 text-slate-400 hover:text-red-500 transition-all"><X size={32}/></button>
              </div>
              <div className="grid grid-cols-2 gap-8 text-sm">
                 <div><p className="text-slate-400 font-bold uppercase text-[9px] mb-1">Patient</p><p className="font-black text-brand-secondary">{selectedApt.patientName}</p></div>
                 <div><p className="text-slate-400 font-bold uppercase text-[9px] mb-1">TID Reference</p><p className="font-black text-brand-primary uppercase tracking-widest">{selectedApt.transactionId || 'N/A'}</p></div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-brand-secondary ml-2">Clinical Status</label>
                 <select name="status" defaultValue={selectedApt.status} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold">
                    <option value="Pending">Pending Review</option>
                    <option value="Confirmed">Confirmed Appointment</option>
                    <option value="Completed">Completed Visit</option>
                    <option value="Cancelled">Cancelled</option>
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-brand-secondary ml-2">Portal Message to Patient</label>
                 <textarea name="adminMessage" defaultValue={selectedApt.adminMessage} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none h-32 resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Update Visit</button>
           </form>
        </div>
      )}

      {/* Bank Account Modal */}
      {isDonationModalOpen && editingDonation && (
        <div className="fixed inset-0 bg-brand-secondary/90 backdrop-blur-2xl z-[600] flex items-center justify-center p-4">
           <form onSubmit={handleSaveDonation} className="bg-white rounded-[4rem] w-full max-w-xl p-10 md:p-16 shadow-2xl space-y-8 animate-in zoom-in duration-300">
              <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                 <h3 className="text-3xl font-bold text-brand-secondary font-serif">Bank Details</h3>
                 <button type="button" onClick={() => setIsDonationModalOpen(false)} className="p-3 text-slate-400 hover:text-red-500 transition-all"><X size={32}/></button>
              </div>
              <div className="space-y-4">
                <input required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" value={editingDonation.bankName || ''} onChange={e => setEditingDonation({...editingDonation, bankName: e.target.value})} placeholder="Bank Name" />
                <input required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" value={editingDonation.accountTitle || ''} onChange={e => setEditingDonation({...editingDonation, accountTitle: e.target.value})} placeholder="Account Title" />
                <input required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" value={editingDonation.iban || ''} onChange={e => setEditingDonation({...editingDonation, iban: e.target.value})} placeholder="IBAN Number" />
                <input required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" value={editingDonation.accountNumber || ''} onChange={e => setEditingDonation({...editingDonation, accountNumber: e.target.value})} placeholder="Account Number" />
                <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" value={editingDonation.logo || ''} onChange={e => setEditingDonation({...editingDonation, logo: e.target.value})} placeholder="Bank Logo URL (optional)" />
              </div>
              <button type="submit" className="w-full bg-brand-tertiary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Save Bank Account</button>
           </form>
        </div>
      )}

      {/* Message View Modal */}
      {isMessageModalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-brand-secondary/90 backdrop-blur-2xl z-[600] flex items-center justify-center p-4">
           <div className="bg-white rounded-[4rem] w-full max-w-xl p-10 md:p-16 shadow-2xl space-y-8 animate-in zoom-in duration-300">
              <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                 <div>
                    <h3 className="text-3xl font-bold text-brand-secondary font-serif">{selectedMessage.subject}</h3>
                    <p className="text-xs text-slate-400 mt-1">From: {selectedMessage.name}</p>
                 </div>
                 <button onClick={() => setIsMessageModalOpen(false)} className="p-3 text-slate-400 hover:text-red-500 transition-all"><X size={32}/></button>
              </div>
              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                 <p className="text-slate-700 leading-relaxed font-medium italic">"{selectedMessage.message}"</p>
              </div>
              <div className="flex justify-between text-[10px] font-black uppercase text-slate-300 tracking-widest">
                 <span>{selectedMessage.email}</span>
                 <span>{selectedMessage.date}</span>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
