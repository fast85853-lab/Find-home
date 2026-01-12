
import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 bg-blue-100 text-blue-600 rounded-2xl mb-2">
          <Shield size={32} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
        <p className="text-slate-500 font-medium">Last updated: February 2024</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-sm space-y-10 leading-relaxed text-slate-600">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <FileText className="text-blue-600" /> 1. Introduction
          </h2>
          <p>
            Welcome to GetHome. We value your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, and share information when you use our 
            rental home application.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Eye className="text-blue-600" /> 2. Information We Collect
          </h2>
          <p>To provide you with the best rental experience, we collect various types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Information:</strong> Name, email address, profile photo, and bio.</li>
            <li><strong>Property Data:</strong> Details of properties you list, including city, area, address, images, and utility status (Bijli/Gas).</li>
            <li><strong>Contact Details:</strong> Phone numbers and WhatsApp contact info provided for property inquiries.</li>
            <li><strong>Usage Data:</strong> How you interact with our app, searches, and favorite listings.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Lock className="text-blue-600" /> 3. How We Use Your Data
          </h2>
          <p>Your data is used solely to facilitate the home rental process:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Displaying listings to potential renters.</li>
            <li>Enabling direct communication between owners and seekers via Phone/WhatsApp.</li>
            <li>Improving our search algorithms and user experience.</li>
            <li>Security verification and preventing fraudulent listings.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Shield className="text-blue-600" /> 4. Data Protection
          </h2>
          <p>
            We implement industry-standard security measures to safeguard your information. Your contact 
            details are only shown to users who are browsing your listings. We never sell your personal 
            data to third-party advertisers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Shield size={20} className="text-blue-600" /> 5. Your Rights
          </h2>
          <p>
            You have the right to access, modify, or delete your profile and property listings at any time. 
            For any data-related requests, please contact our support team.
          </p>
        </section>

        <div className="pt-8 border-t border-slate-100 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            By using GetHome, you agree to these terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
