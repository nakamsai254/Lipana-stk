
import React, { useState, useEffect } from 'react';
import { WifiPlan, UserSession } from './types';
import { WIFI_PLANS, APP_CONFIG } from './constants';
import { PlanCard } from './components/PlanCard';
import { PaymentForm } from './components/PaymentForm';

const App: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<WifiPlan | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [session, setSession] = useState<UserSession>({ isConnected: false });

  // Load session from storage if any
  useEffect(() => {
    const saved = localStorage.getItem('wifi_session');
    if (saved) {
      const parsed = JSON.parse(saved);
      const expiry = new Date(parsed.expiryTime);
      if (expiry > new Date()) {
        setSession({ ...parsed, expiryTime: expiry });
      } else {
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
    <div className="min-h-screen relative flex flex-col">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-indigo-600 rounded-b-[100px] -z-10 shadow-inner"></div>
      
      {/* Header */}
      <header className="pt-8 pb-12 px-6 container mx-auto">
        <nav className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-xl shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            </div>
            <span className="text-white text-2xl font-black tracking-tight">SmartWiFi</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {session.isConnected ? (
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white font-medium text-sm">Connected</span>
              </div>
            ) : (
              <span className="text-white/80 text-sm font-medium">Ready for Connection</span>
            )}
          </div>
        </nav>

        <div className="max-w-3xl text-center md:text-left mx-auto md:mx-0">
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-6">
            Smart WiFi <br />
            <span className="text-indigo-200">Simplified Billing.</span>
          </h1>
          <p className="text-lg text-indigo-100 max-w-xl leading-relaxed mb-8">
            Manage your high-speed internet access with our premium billing portal. Choose a plan and get online instantly.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 pb-20">
        {session.isConnected ? (
          <div className="bg-white rounded-[40px] p-8 sm:p-12 shadow-2xl border border-slate-100 -mt-10 overflow-hidden relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-2 block">Current Status</span>
                <h2 className="text-4xl font-black text-slate-900 mb-6">Device Connected</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-100 p-3 rounded-2xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm font-medium">Session Duration</p>
                      <p className="text-slate-900 font-bold text-lg">{calculateRemainingTime()}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 p-3 rounded-2xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm font-medium">Active Plan</p>
                      <p className="text-slate-900 font-bold text-lg">{session.activePlan?.name}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex space-x-4">
                  <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
                    Account Dashboard
                  </button>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('wifi_session');
                      setSession({ isConnected: false });
                    }}
                    className="bg-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95"
                  >
                    Disconnect
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="bg-slate-50 rounded-[30px] p-8 border border-slate-200 aspect-square flex flex-col items-center justify-center text-center">
                  <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 border-8 border-indigo-50 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-indigo-200 animate-[spin_10s_linear_infinite]"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  </div>
                  <h4 className="text-slate-800 font-bold text-xl">Stable Connection</h4>
                  <p className="text-slate-500 text-sm max-w-[200px] mt-2 leading-relaxed">Network status is currently optimal across all nodes.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-10">
              {WIFI_PLANS.map(plan => (
                <PlanCard 
                  key={plan.id} 
                  plan={plan} 
                  isSelected={selectedPlan?.id === plan.id}
                  onSelect={(p) => setSelectedPlan(p)}
                />
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                disabled={!selectedPlan}
                onClick={() => setShowCheckout(true)}
                className={`px-12 py-5 rounded-3xl text-xl font-bold transition-all shadow-2xl ${
                  selectedPlan 
                    ? 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700 active:scale-95' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                Proceed to Checkout
              </button>
              <p className="text-slate-400 text-sm mt-4 font-medium">Select a data plan to get started</p>
            </div>
          </>
        )}
      </main>

      {/* Payment Modal */}
      {showCheckout && selectedPlan && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <PaymentForm 
            selectedPlan={selectedPlan}
            onCancel={() => setShowCheckout(false)}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 pt-16 pb-8 px-6 mt-12">
        <div className="container mx-auto text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-slate-800 pb-12">
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
                <span className="text-white text-xl font-bold">SmartWiFi</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Reliable wireless connectivity for modern workspaces and community hotspots.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Network Map</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Information</h4>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                Nairobi Industrial Area, Node 12<br />
                {APP_CONFIG.location}
              </p>
              <p className="text-indigo-400 text-sm font-bold">{APP_CONFIG.supportEmail}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
            <p>© 2024 SmartWiFi Portal. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span>Status: <b className="text-green-500 uppercase tracking-widest text-[10px]">Online</b></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
