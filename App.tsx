import React, { useState, useEffect } from 'react';
import { WifiPlan, UserSession } from './types';
import { WIFI_PLANS, APP_CONFIG } from './constants';
import { PlanCard } from './components/PlanCard';
import { PaymentForm } from './components/PaymentForm';
import { AiAssistant } from './components/AiAssistant';

const App: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<WifiPlan | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [session, setSession] = useState<UserSession>({ isConnected: false });

  // Load session from storage if any
  useEffect(() => {
    const saved = localStorage.getItem('wifi_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const expiry = new Date(parsed.expiryTime);
        if (expiry > new Date()) {
          setSession({ ...parsed, expiryTime: expiry });
        } else {
          localStorage.removeItem('wifi_session');
        }
      } catch (e) {
        localStorage.removeItem('wifi_session');
      }
    }
  }, []);

  const calculateRemainingTime = () => {
    if (!session.expiryTime) return "";
    const diff = session.expiryTime.getTime() - new Date().getTime();
    if (diff <= 0) return "Expired";
    
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${h}h ${m}m remaining`;
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-[520px] bg-indigo-600 rounded-b-[120px] -z-10 shadow-2xl"></div>
      
      {/* Header */}
      <header className="pt-10 pb-16 px-6 container mx-auto">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="bg-white p-2.5 rounded-2xl shadow-xl transition-transform group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            </div>
            <span className="text-white text-3xl font-black tracking-tight">SmartWiFi</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {session.isConnected ? (
              <div className="bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/20 flex items-center space-x-3 shadow-lg">
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
                <span className="text-white font-bold text-sm tracking-wide">CONNECTED</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-white/80 text-sm font-semibold uppercase tracking-widest">
                 <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                 <span>Awaiting Login</span>
              </div>
            )}
          </div>
        </nav>

        <div className="max-w-4xl text-center md:text-left mx-auto md:mx-0">
          <h1 className="text-5xl sm:text-7xl font-black text-white leading-[1.1] mb-8 drop-shadow-sm">
            Fast Internet. <br />
            <span className="text-indigo-200">Instant Access.</span>
          </h1>
          <p className="text-xl text-indigo-100/90 max-w-2xl leading-relaxed mb-10 font-medium">
            Join thousands of users enjoying high-speed connectivity. Simply choose your preferred data plan below and get started in seconds.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 pb-24">
        {session.isConnected ? (
          <div className="bg-white rounded-[48px] p-8 sm:p-14 shadow-2xl border border-slate-100 -mt-12 overflow-hidden relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <span className="text-indigo-600 font-black tracking-[0.2em] uppercase text-xs mb-4 block">ACTIVE SESSION</span>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-8 tracking-tight">Enjoy your unlimited high-speed data.</h2>
                
                <div className="space-y-8">
                  <div className="flex items-center space-x-5 group">
                    <div className="bg-indigo-100 p-4 rounded-3xl transition-colors group-hover:bg-indigo-600 group-hover:text-white text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Time Remaining</p>
                      <p className="text-slate-900 font-extrabold text-2xl tracking-tight">{calculateRemainingTime()}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-5 group">
                    <div className="bg-purple-100 p-4 rounded-3xl transition-colors group-hover:bg-purple-600 group-hover:text-white text-purple-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Current Package</p>
                      <p className="text-slate-900 font-extrabold text-2xl tracking-tight">{session.activePlan?.name}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-wrap gap-4">
                  <button className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 text-sm uppercase tracking-widest">
                    Manage Account
                  </button>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('wifi_session');
                      setSession({ isConnected: false });
                    }}
                    className="bg-slate-100 text-slate-600 px-10 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all active:scale-95 text-sm uppercase tracking-widest"
                  >
                    Disconnect
                  </button>
                </div>
              </div>

              <div className="relative animate-in zoom-in duration-700">
                <div className="bg-slate-50/80 backdrop-blur-md rounded-[48px] p-10 border border-slate-200/60 aspect-square flex flex-col items-center justify-center text-center shadow-inner">
                  <div className="w-56 h-56 bg-white rounded-full flex items-center justify-center shadow-2xl mb-8 border-[12px] border-indigo-50 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-indigo-200/50 animate-[spin_20s_linear_infinite]"></div>
                    <div className="absolute inset-4 rounded-full border-2 border-indigo-600/10 animate-[pulse_3s_ease-in-out_infinite]"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  </div>
                  <h4 className="text-slate-900 font-black text-2xl tracking-tight">Signal: Excellent</h4>
                  <p className="text-slate-500 font-medium text-sm max-w-[240px] mt-3 leading-relaxed">Your device is linked to our Nairobi Industrial Area hub.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 -mt-16">
              {WIFI_PLANS.map((plan, index) => (
                <div key={plan.id} className="animate-in fade-in slide-in-from-bottom-8 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                  <PlanCard 
                    plan={plan} 
                    isSelected={selectedPlan?.id === plan.id}
                    onSelect={(p) => setSelectedPlan(p)}
                  />
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <button
                disabled={!selectedPlan}
                onClick={() => setShowCheckout(true)}
                className={`px-16 py-6 rounded-[32px] text-xl font-black transition-all shadow-2xl uppercase tracking-widest ${
                  selectedPlan 
                    ? 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 active:scale-95' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                Buy Selected Plan
              </button>
              <p className="text-slate-400 text-sm mt-6 font-bold uppercase tracking-[0.2em]">Pick a data bundle to connect</p>
            </div>
          </>
        )}
      </main>

      <AiAssistant />

      {/* Payment Modal */}
      {showCheckout && selectedPlan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="animate-in zoom-in-95 duration-300">
            <PaymentForm 
              selectedPlan={selectedPlan}
              onCancel={() => setShowCheckout(false)}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 pt-20 pb-10 px-6 mt-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16 border-b border-slate-800 pb-16">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
                <span className="text-white text-2xl font-black tracking-tight">SmartWiFi</span>
              </div>
              <p className="text-slate-400 text-sm leading-loose font-medium">
                We empower communities with seamless, high-speed wireless connectivity built on a scalable, premium infrastructure.
              </p>
            </div>
            
            <div className="md:pl-12">
              <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-8">Navigation</h4>
              <ul className="space-y-5 text-slate-400 text-sm font-semibold">
                <li><a href="#" className="hover:text-indigo-400 transition-colors flex items-center space-x-2"><span>Network Status</span> <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div></a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Client Area</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Coverage Map</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-8">Headquarters</h4>
              <p className="text-slate-400 text-sm mb-6 leading-loose font-medium">
                Pioneer House, 4th Floor<br />
                Mombasa Road, Nairobi<br />
                {APP_CONFIG.location}
              </p>
              <div className="bg-indigo-900/30 p-4 rounded-2xl border border-indigo-500/20">
                <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">Direct Support</p>
                <p className="text-white font-black text-sm">{APP_CONFIG.supportEmail}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
            <p>© 2024 SmartWiFi Global. Proudly built in Kenya.</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <div className="flex items-center space-x-2">
                 <span className="text-slate-600">Core Engine:</span>
                 <span className="text-green-500">v4.2.0-STABLE</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;