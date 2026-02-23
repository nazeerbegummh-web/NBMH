
import React from 'react';
import { BlogPost } from '../types';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blogs: React.FC<{ blogs: BlogPost[] }> = ({ blogs }) => {
  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-5xl font-bold text-slate-900 leading-tight">Latest from <span className="text-brand-secondary underline decoration-blue-100 underline-offset-8">Our Hospital</span></h1>
            <p className="text-xl text-slate-600">
              Stay updated with the latest medical news, health tips from our experts, and success stories from our patients.
            </p>
          </div>
          <div className="flex gap-4">
            {['All', 'News', 'Health Tips', 'Success Story'].map((cat) => (
              <button key={cat} className="px-6 py-2 rounded-full text-sm font-bold border border-slate-200 hover:bg-brand-secondary hover:text-white transition-all">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogs.map((blog) => (
            <article key={blog.id} className="group cursor-pointer">
              <div className="overflow-hidden rounded-3xl mb-6 aspect-video">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-brand-secondary">
                  <span>{blog.category}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="text-slate-400">{blog.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-brand-secondary transition-colors leading-tight">
                  {blog.title}
                </h3>
                <p className="text-slate-600 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="flex items-center gap-2 font-bold text-sm">
                  Read Article <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
