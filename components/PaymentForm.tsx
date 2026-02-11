import React from 'react';
import { WifiPlan } from '../types';
import { APP_CONFIG } from '../constants';

interface PaymentFormProps {
  selectedPlan: WifiPlan;
  onCancel: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ selectedPlan, onCancel }) => {
  const PAYMENT_LINK = "https://lipana.dev/pay/club-18";

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-auto animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Checkout</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Ready to get online?</p>
        </div>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Selected Plan</span>
          {/* Fix: Replaced undefined 'plan.color' with 'selectedPlan.color' */}
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-sm ${planColorToClass(selectedPlan.color)}`}>
             {selectedPlan.duration}
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-1">{selectedPlan.name}</h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">{selectedPlan.description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <span className="text-slate-600 font-semibold">Total Amount</span>
          <span className="text-2xl font-black text-indigo-600">{selectedPlan.price} {APP_CONFIG.currency}</span>
        </div>
      </div>

      <div className="space-y-4">
        <a
          href={PAYMENT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-xl shadow-indigo-100 transition-all flex items-center justify-center space-x-3 active:scale-[0.98]"
        >
          <span>Pay via Lipana</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
        
        <p className="text-[10px] text-center text-slate-400 font-bold leading-relaxed uppercase tracking-widest px-4">
          Secured by Lipana Payment Gateway
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center space-x-4 grayscale opacity-40">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png" className="h-5" alt="M-Pesa" />
        <div className="h-4 w-[1px] bg-slate-200"></div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Instant Access</span>
      </div>
    </div>
  );
};

// Helper to ensure colors match provided constant keys
function planColorToClass(color: string) {
  return color || 'bg-indigo-600';
}