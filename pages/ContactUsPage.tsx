
import React from 'react';
import { Mail, MessageSquare, Phone, MapPin, Send } from 'lucide-react';

const ContactUsPage: React.FC = () => {
  const supportEmail = "fast85852@gmail.com";

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-4xl font-black text-slate-900">Contact Us</h1>
        <p className="text-slate-500 text-lg font-medium">We're here to help you find your perfect home.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-start gap-6 group hover:border-blue-200 transition-colors">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xl mb-1">Email Support</h3>
              <p className="text-slate-500 mb-4">Our team typically responds within 24 hours.</p>
              <a href={`mailto:${supportEmail}`} className="text-blue-600 font-black text-lg hover:underline break-all">
                {supportEmail}
              </a>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-start gap-6 group hover:border-green-200 transition-colors">
            <div className="p-4 bg-green-50 text-green-600 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-all">
              <MessageSquare size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xl mb-1">WhatsApp Chat</h3>
              <p className="text-slate-500 mb-4">Chat with us for quick property verifications.</p>
              <button className="bg-green-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-600 transition-all">
                Start Chat
              </button>
            </div>
          </div>
        </div>

        {/* Support Message */}
        <div className="bg-slate-900 text-white p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-3xl font-black mb-6 leading-tight italic">
            Need Help <br/> Listing Your Home?
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed font-medium">
            If you are having trouble uploading photos or setting up your location, 
            feel free to reach out to our team directly. We are available 24/7.
          </p>
          <a 
            href={`mailto:${supportEmail}`} 
            className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-center hover:bg-slate-100 transition-all flex items-center justify-center gap-3"
          >
            <Send size={18} />
            Email Support Now
          </a>
        </div>
      </div>
      
      <div className="mt-16 text-center text-slate-400 text-sm font-bold uppercase tracking-widest">
        &copy; 2024 GetHome Rental App. All rights reserved.
      </div>
    </div>
  );
};

export default ContactUsPage;
