
import React, { useState } from 'react';
import { Lock, Heart } from 'lucide-react';

const AdminLogin: React.FC<{ setIsAdmin: (v: boolean) => void }> = ({ setIsAdmin }) => {
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdmin(true);
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 text-center space-y-8">
        <div className="mx-auto w-16 h-16 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-xl">
          <Heart size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-brand-secondary">Admin Portal</h1>
          <p className="text-slate-500">Enter credentials to manage the hospital data.</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
            <input 
              type="password" 
              placeholder="Admin Password"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-brand-secondary text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-primary transition-all shadow-lg"
          >
            Access Dashboard
          </button>
        </form>
        <p className="text-xs text-slate-400">Restricted access for NBMH staff only.</p>
      </div>
    </div>
  );
};

export default AdminLogin;
