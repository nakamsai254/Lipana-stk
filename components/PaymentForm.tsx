
import React, { useState } from 'react';
import { WifiPlan } from '../types';
import { APP_CONFIG } from '../constants';
import { initiateStkPush } from '../services/lipanaService';

interface PaymentFormProps {
  selectedPlan: WifiPlan;
  onSuccess: (phone: string) => void;
  onCancel: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ selectedPlan, onSuccess, onCancel }) => {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'initiating' | 'awaiting-pin' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 9) {
      setError('Please enter a valid M-Pesa phone number.');
      return;
    }

    setStatus('initiating');
    setError(null);

    const result = await initiateStkPush(phone, selectedPlan.price);

    if (result.success) {
      setStatus('awaiting-pin');
      
      // Since this is a simple demo without a backend for webhooks, 
      // we simulate the success check after 8 seconds (typical user PIN entry time)
      setTimeout(() => {
        onSuccess(phone);
      }, 8000);
    } else {
      setStatus('error');
      setError(result.message);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-auto animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Secure Checkout</h2>
          <div className="flex items-center space-x-2 mt-1">
            <img src="https://lipana.dev/favicon.ico" className="w-4 h-4 rounded" alt="Lipana" />
            <p className="text-slate-500 text-sm font-medium">via Lipana.dev</p>
          </div>
        </div>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="bg-slate-50 rounded-2xl p-4 mb-6 flex items-center justify-between border border-slate-100">
        <div>
          <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Plan</span>
          <span className="text-slate-800 font-bold">{selectedPlan.name}</span>
        </div>
        <div className="text-right">
          <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Total</span>
          <span className="text-xl font-black text-indigo-600">{selectedPlan.price} {APP_CONFIG.currency}</span>
        </div>
      </div>

      {status === 'awaiting-pin' ? (
        <div className="text-center py-8 space-y-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 relative">
             <div className="absolute inset-0 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
             </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800">Check your phone</h3>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
            An M-Pesa prompt has been sent to <span className="font-bold text-indigo-600">{phone}</span>. 
            Enter your PIN to complete payment.
          </p>
          <div className="pt-4">
            <button 
              onClick={() => setStatus('idle')}
              className="text-indigo-600 text-sm font-bold hover:underline"
            >
              Wait, I didn't see it? Try again
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
              M-Pesa Number
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium transition-colors group-focus-within:text-indigo-500">+254</span>
              <input
                type="tel"
                id="phone"
                autoFocus
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                placeholder="712345678"
                className="w-full pl-16 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-semibold text-lg"
                required
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-widest">Phone format: 07xx or 7xx</p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl flex items-start space-x-3 border border-red-100 animate-in shake-in duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'initiating'}
            className={`w-full py-5 rounded-2xl text-white font-bold text-lg shadow-xl shadow-indigo-100 transition-all flex items-center justify-center space-x-3 ${
              status === 'initiating' ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'
            }`}
          >
            {status === 'initiating' ? (
              <>
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Initiating M-Pesa...</span>
              </>
            ) : (
              <span>Pay {selectedPlan.price} {APP_CONFIG.currency} with M-Pesa</span>
            )}
          </button>
        </form>
      )}

      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center space-x-4 grayscale opacity-60">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png" className="h-6" alt="M-Pesa" />
        <div className="h-4 w-[1px] bg-slate-200"></div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PCI DSS Compliant</span>
      </div>
    </div>
  );
};
