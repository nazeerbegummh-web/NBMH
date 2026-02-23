
import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  Send, 
  Ambulance, 
  Heart,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { SiteData, ContactMessage } from '../types';

const Contact: React.FC<{ data: SiteData; updateData: (d: SiteData) => void }> = ({ data, updateData }) => {
  const { branding } = data;
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate API delay
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: 'unread'
      };

      updateData({
        ...data,
        messages: [newMessage, ...(data.messages || [])]
      });

      setFormStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="bg-[#fcfaf7] min-h-screen">
      {/* Hero Header */}
      <section className="bg-brand-secondary py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-primary/30 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <p className="text-brand-tertiary font-black uppercase tracking-[0.4em] text-[10px] mb-4">Get In Touch</p>
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 italic">Contact <span className="text-brand-tertiary">NBMH</span></h1>
          <p className="text-white/70 text-lg font-light max-w-2xl mx-auto">
            Available 24/7 for specialist emergency care and patient support in Rawalpindi.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details & Cards */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-brand-secondary font-bold text-3xl font-serif">Reach Out to Our <span className="text-brand-primary">Expert Team</span></h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                Whether you have a general inquiry, need to book a surgery, or require immediate emergency assistance, our dedicated staff is here to help you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Emergency Card */}
              <div className="bg-red-50 border border-red-100 p-6 rounded-[2rem] space-y-4 group hover:shadow-xl hover:shadow-red-900/5 transition-all">
                <div className="w-12 h-12 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                   <Ambulance size={24} />
                </div>
                <div>
                   <h4 className="text-red-900 font-black text-[10px] uppercase tracking-widest mb-1">24/7 Emergency</h4>
                   <a href={`tel:${branding.phone}`} className="text-lg font-bold text-brand-primary hover:underline">{branding.phone}</a>
                </div>
              </div>

              {/* General Inquiry Card */}
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-[2rem] space-y-4 group hover:shadow-xl hover:shadow-brand-secondary/5 transition-all">
                <div className="w-12 h-12 bg-brand-secondary text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                   <PhoneCall size={24} />
                </div>
                <div>
                   <h4 className="text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-1">Reception</h4>
                   <a href="tel:03315425152" className="text-lg font-bold text-brand-secondary hover:underline">0331-5425152</a>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-[#fcfaf7] border border-[#f0e6d2] p-6 rounded-[2rem] space-y-4 group hover:shadow-xl hover:shadow-brand-tertiary/5 transition-all">
                <div className="w-12 h-12 bg-brand-tertiary text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                   <Mail size={24} />
                </div>
                <div>
                   <h4 className="text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-1">Email Hospital</h4>
                   <a href="mailto:info@nbmh.com.pk" className="text-sm font-bold text-brand-secondary hover:underline break-all">info@nbmh.com.pk</a>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-[2rem] space-y-4 group hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-slate-800 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                   <Clock size={24} />
                </div>
                <div>
                   <h4 className="text-slate-800 font-black text-[10px] uppercase tracking-widest mb-1">Working Hours</h4>
                   <p className="text-sm font-bold text-slate-600">Specialist: 24/7<br/>OPD: 9AM - 11PM</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm flex items-start gap-6">
               <div className="shrink-0 p-4 bg-slate-50 text-brand-tertiary rounded-2xl"><MapPin size={28}/></div>
               <div className="space-y-1">
                  <h4 className="text-brand-secondary font-black text-[10px] uppercase tracking-widest">Facility Location</h4>
                  <p className="text-brand-secondary font-bold leading-relaxed">{branding.address}</p>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 -z-10"></div>
               
               <div className="mb-10 space-y-2">
                  <h3 className="text-3xl font-bold text-brand-secondary font-serif">Send Us a <span className="text-brand-tertiary">Direct Message</span></h3>
                  <p className="text-slate-500 font-medium text-sm">Fill out the form below and our medical team will get back to you within 24 hours.</p>
               </div>

               {formStatus === 'sent' ? (
                 <div className="py-20 text-center space-y-6 animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-100 text-brand-tertiary rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-xl">
                       <ShieldCheck size={40} />
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-2xl font-bold text-brand-secondary">Message Received!</h4>
                       <p className="text-slate-500 font-medium">Thank you for contacting NBMH. We'll be in touch very soon.</p>
                    </div>
                    <button onClick={() => setFormStatus('idle')} className="text-brand-tertiary font-bold uppercase tracking-widest text-[10px] hover:underline">Send Another Message</button>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                          <input 
                            required 
                            type="text" 
                            placeholder="Your Name" 
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-tertiary outline-none transition-all font-medium" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                          <input 
                            required 
                            type="email" 
                            placeholder="your@email.com" 
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-tertiary outline-none transition-all font-medium" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                       <select 
                        required 
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-tertiary outline-none transition-all font-medium appearance-none"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                       >
                          <option value="">Choose Subject</option>
                          <option value="Appointment">Appointment Query</option>
                          <option value="Donation">Donation Inquiry</option>
                          <option value="Surgery">Surgery Consultation</option>
                          <option value="Feedback">Feedback / Suggestions</option>
                          <option value="Other">Other Information</option>
                       </select>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Message</label>
                       <textarea 
                        required 
                        placeholder="How can we help you today?" 
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-tertiary outline-none transition-all font-medium h-40 resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                       ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={formStatus === 'sending'}
                      className="w-full bg-brand-secondary text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-primary transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-50"
                    >
                      {formStatus === 'sending' ? 'Sending Message...' : <><Send size={18} /> Deliver Message</>}
                    </button>
                 </form>
               )}
            </div>
          </div>
        </div>

        {/* Google Map Implementation */}
        <div className="mt-20 space-y-8">
           <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-brand-secondary font-serif">Find Us in <span className="text-brand-tertiary">Bahria Town PH 8</span></h2>
              <p className="text-slate-500 font-medium text-sm">Open 24/7 for Specialist Emergency Services</p>
           </div>
           
           <div className="w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-200 relative group">
              <iframe 
                title="NBMH Full Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.349903473987!2d73.09283637466665!3d33.49227244709254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dff314cfbefbc1%3A0xdcbe24d6173d11e1!2sNazeer%20Begum%20Memorial%20Hospital!5e0!3m2!1sen!2s!4v1769786907311!5m2!1sen!2s" 
                className="w-full h-full grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-brand-secondary text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-2xl flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                 <MapPin size={16} className="text-brand-tertiary" /> Open in Google Maps <ChevronRight size={14}/>
              </div>
           </div>
        </div>
      </div>

      {/* Trust & Safety Section */}
      <section className="bg-white py-20 border-t border-slate-100">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
               <div className="w-16 h-16 bg-slate-50 text-brand-tertiary rounded-2xl flex items-center justify-center mx-auto"><ShieldCheck size={32}/></div>
               <h4 className="text-xl font-bold text-brand-secondary">Board Certified</h4>
               <p className="text-slate-500 text-sm leading-relaxed">All our specialists are verified medical professionals with extensive local and international experience.</p>
            </div>
            <div className="space-y-4">
               <div className="w-16 h-16 bg-slate-50 text-brand-tertiary rounded-2xl flex items-center justify-center mx-auto"><Heart size={32}/></div>
               <h4 className="text-xl font-bold text-brand-secondary">Ethical Care</h4>
               <p className="text-slate-500 text-sm leading-relaxed">Dedicated to affordable and compassionate healthcare for all members of our community.</p>
            </div>
            <div className="space-y-4">
               <div className="w-16 h-16 bg-slate-50 text-brand-tertiary rounded-2xl flex items-center justify-center mx-auto"><MessageSquare size={32}/></div>
               <h4 className="text-xl font-bold text-brand-secondary">Priority Support</h4>
               <p className="text-slate-500 text-sm leading-relaxed">Our clinical staff and administration are committed to providing timely updates on your health queries.</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Contact;
