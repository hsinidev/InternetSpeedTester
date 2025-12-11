import React, { useState } from 'react';
import InfoIcon from './icons/InfoIcon';

type Tab = 'About' | 'Contact' | 'Guide' | 'Privacy' | 'Terms' | 'DMCA';

const InfoModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('About');

  if (!isOpen) return null;

  const tabs: Tab[] = ['About', 'Contact', 'Guide', 'Privacy', 'Terms', 'DMCA'];
  const websiteName = "doodax.com";
  const contactEmail = "hsini.web@gmail.com";

  const renderContent = () => {
    switch (activeTab) {
      case 'About':
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">About {websiteName}</h3>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
              <p className="text-gray-300 leading-relaxed mb-4">
                Welcome to <strong>{websiteName}</strong>, the premier destination for accurate and reliable internet connectivity testing. Founded with the mission to empower users with transparent network data, we have developed a state-of-the-art HTML5-based speed testing engine that works across all devices without the need for Flash or Java plugins.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our infrastructure leverages a global network of high-performance servers (powered by Cloudflare) to ensure that whether you are in New York, Tokyo, or London, your speed test results reflect the true potential of your internet connection. We believe in a free and open internet, offering this tool completely free of charge.
              </p>
            </div>
          </div>
        );
      case 'Contact':
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">Contact Us</h3>
            <p className="text-gray-300">
              We value your feedback, suggestions, and inquiries. Whether you are experiencing technical issues, have a business proposal, or simply want to say hello, our team is ready to assist you.
            </p>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 shadow-lg mt-6 text-center">
                <div className="w-16 h-16 bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Get in Touch</h4>
                <p className="text-gray-400 mb-6">For general support, DMCA requests, and business inquiries:</p>
                <a href={`mailto:${contactEmail}`} className="inline-block px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-cyan-900/50">
                  {contactEmail}
                </a>
                <p className="text-gray-500 text-sm mt-6">
                    Response time: 24-48 hours (Mon-Fri)
                </p>
            </div>
          </div>
        );
      case 'Guide':
         return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">User Guide</h3>
            <div className="space-y-6">
                <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                    <h4 className="text-lg font-bold text-cyan-300 mb-2 flex items-center"><span className="w-6 h-6 bg-cyan-900/50 rounded-full flex items-center justify-center text-xs mr-2 border border-cyan-500/30">1</span> Preparation</h4>
                    <p className="text-gray-300 text-sm">Before starting, close other tabs, stop ongoing downloads, and ensure no other device on your network is streaming 4K video for the most accurate result. Connect via Ethernet if possible.</p>
                </section>
                <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                    <h4 className="text-lg font-bold text-cyan-300 mb-2 flex items-center"><span className="w-6 h-6 bg-cyan-900/50 rounded-full flex items-center justify-center text-xs mr-2 border border-cyan-500/30">2</span> The Test Process</h4>
                    <p className="text-gray-300 text-sm">Click the large "Start Test" button. The app will first test latency (Ping), then download speed, and finally upload speed. Do not close the tab during this process.</p>
                </section>
                <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                    <h4 className="text-lg font-bold text-cyan-300 mb-2 flex items-center"><span className="w-6 h-6 bg-cyan-900/50 rounded-full flex items-center justify-center text-xs mr-2 border border-cyan-500/30">3</span> Interpreting Results</h4>
                    <ul className="list-disc list-inside text-gray-300 text-sm mt-2 space-y-2">
                        <li><strong>Ping:</strong> Lower is better. Below 20ms is optimal for gaming.</li>
                        <li><strong>Download:</strong> Higher is better. 25 Mbps+ for 4K streaming.</li>
                        <li><strong>Upload:</strong> Higher is better. Critical for Zoom/Teams calls.</li>
                    </ul>
                </section>
            </div>
          </div>
        );
      case 'Privacy':
        return (
          <div className="space-y-6 animate-fade-in">
             <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg flex items-start gap-3">
                <svg className="w-6 h-6 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <p className="text-red-200 text-sm"><strong>Legal Caution:</strong> We are committed to transparency. Please read this policy carefully regarding data collection and Google compliance.</p>
            </div>

            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">Privacy Policy</h3>
            <p className="text-gray-400 text-sm">Effective Date: May 22, 2024</p>
            
            <p className="text-gray-300">
                At <strong>{websiteName}</strong>, we take your privacy seriously. This policy outlines what data we collect, how we use it, and your rights.
            </p>
            
            <div className="space-y-4">
                <h4 className="text-xl font-semibold text-white">1. Data Collection & Usage</h4>
                <p className="text-gray-300 text-sm">
                    We do <strong>not</strong> collect personally identifiable information (PII) such as your name, physical address, or phone number. When you run a test, we may temporarily log:
                </p>
                <ul className="list-disc list-inside text-gray-400 text-sm ml-4">
                    <li>IP Address (anonymized after processing)</li>
                    <li>Network telemetry data (Speed, Latency, Jitter)</li>
                    <li>Browser type and Device type</li>
                </ul>
                <p className="text-gray-300 text-sm">
                   This data is used strictly for statistical analysis, system optimization, and to provide the service.
                </p>

                <h4 className="text-xl font-semibold text-white mt-4">2. Cookies & Local Storage</h4>
                <p className="text-gray-300 text-sm">
                    We use standard cookies and local storage to ensure the website functions correctly (e.g., remembering your dark mode preference). You can disable cookies in your browser settings.
                </p>

                <h4 className="text-xl font-semibold text-white mt-4">3. Third-Party Services</h4>
                <p className="text-gray-300 text-sm">
                    We use Cloudflare for content delivery and network security. Their privacy policy governs their data handling. We do not sell your data to third-party advertisers.
                </p>
            </div>
          </div>
        );
       case 'Terms':
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">Terms of Service</h3>
            
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-300">
                    By accessing and using <strong>{websiteName}</strong>, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
            </div>

            <h4 className="text-xl font-semibold text-white mt-4">1. Acceptable Use</h4>
            <p className="text-gray-300 text-sm">
                This service is provided "as is" for personal and non-commercial use. You agree not to use automated scripts, bots, or any method to abuse the server resources, skew test results, or perform Denial of Service (DoS) attacks.
            </p>

            <h4 className="text-xl font-semibold text-white mt-4">2. Disclaimer of Warranties</h4>
            <p className="text-gray-300 text-sm">
                We make no warranties, expressed or implied, regarding the accuracy, reliability, or availability of the speed test results. Network conditions fluctuate, and results should be treated as estimates, not legally binding certifications.
            </p>

            <h4 className="text-xl font-semibold text-white mt-4">3. Limitation of Liability</h4>
            <p className="text-gray-300 text-sm">
                In no event shall {websiteName} or its owners be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the service.
            </p>
          </div>
        );
      case 'DMCA':
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">DMCA Policy</h3>
            <p className="text-gray-300">
                <strong>{websiteName}</strong> respects the intellectual property rights of others. We comply with the Digital Millennium Copyright Act (DMCA).
            </p>
            
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <h4 className="text-lg font-bold text-white mb-4">Filing a Complaint</h4>
                <p className="text-gray-300 mb-4">
                    If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible on this site, please notify our copyright agent with:
                </p>
                <ol className="list-decimal list-inside text-gray-400 space-y-2 mb-6 text-sm">
                    <li>Electronic signature of the copyright owner.</li>
                    <li>Description of the copyrighted work.</li>
                    <li>URL of where the material is located on our site.</li>
                    <li>Your address, telephone number, and email.</li>
                    <li>A statement of good faith belief that the use is unauthorized.</li>
                </ol>
                <div className="border-t border-gray-600 pt-4">
                    <p className="text-sm text-gray-400 mb-1">Send notices to:</p>
                     <a href={`mailto:${contactEmail}`} className="text-cyan-400 font-bold hover:underline text-lg">{contactEmail}</a>
                </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-5xl h-[90vh] bg-[#0f172a] border border-cyan-500/20 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <header className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-900/80 backdrop-blur">
          <div className="flex items-center space-x-3">
             <div className="p-2 bg-cyan-900/30 rounded-lg">
                <InfoIcon className="w-6 h-6 text-cyan-400" />
             </div>
            <div>
                <h2 className="text-xl font-bold text-white tracking-wide">Information Center</h2>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Legal & Guides</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
            aria-label="Close Modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar Navigation */}
          <nav className="flex-shrink-0 w-full md:w-64 bg-[#020617] border-b md:border-b-0 md:border-r border-gray-800 overflow-x-auto md:overflow-y-auto">
            <ul className="flex flex-row md:flex-col p-4 gap-2">
              {tabs.map(tab => (
                <li key={tab} className="flex-shrink-0">
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-between group
                      ${activeTab === tab 
                        ? 'bg-gradient-to-r from-cyan-900/50 to-transparent border-l-4 border-cyan-400 text-white' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200 border-l-4 border-transparent'
                      }`}
                  >
                    <span className="text-sm font-semibold tracking-wide">{tab === 'Privacy' ? 'Privacy Policy' : tab === 'Terms' ? 'Terms of Service' : tab}</span>
                    {activeTab === tab && (
                        <svg className="w-4 h-4 ml-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Main Content Area */}
          <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-[#0b1120] scroll-smooth custom-scrollbar">
            <div className="max-w-3xl mx-auto">
                {renderContent()}
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-800 text-center">
                 <p className="text-xs text-gray-600">
                    &copy; 2024 {websiteName}. All rights reserved. Content protected by DMCA.
                 </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;