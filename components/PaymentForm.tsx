
import React, { useState } from 'react';
import { WifiPlan, PaymentResponse } from '../types';
import { APP_CONFIG } from '../constants';

interface PaymentFormProps {
  selectedPlan: WifiPlan;
  onSuccess: (phone: string) => void;
  onCancel: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ selectedPlan, onSuccess, onCancel }) => {
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError('Please enter a valid M-Pesa phone number.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    // Simulation of Lipana.dev STK Push
    // In a real app, this would be a fetch to your backend which calls lipana.dev/api/v1/stk
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate Success
      onSuccess(phone);
    } catch (err) {
      setError('Payment failed. Please try again or check your balance.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-auto animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Secure Checkout</h2>
          <p className="text-slate-500 text-sm">Paying via M-Pesa (Lipana.dev)</p>
        </div>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="bg-slate-50 rounded-2xl p-4 mb-6 flex items-center justify-between">
        <div>
          <span className="block text-xs font-bold text-slate-400 uppercase">Selected Plan</span>
          <span className="text-slate-800 font-bold">{selectedPlan.name} ({selectedPlan.duration})</span>
        </div>
        <span className="text-xl font-black text-indigo-600">{selectedPlan.price} {APP_CONFIG.currency}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1">
            M-Pesa Number
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">+254</span>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
              placeholder="712345678"
              className="w-full pl-16 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium"
              required
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center space-x-2 ${
            isProcessing ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
          }`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Checking Phone...</span>
            </>
          ) : (
            <span>Pay {selectedPlan.price} {APP_CONFIG.currency} Now</span>
          )}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-slate-400 leading-relaxed">
        By clicking pay, you will receive an STK Push on your phone to authorize the payment. Your connection will start immediately after confirmation.
      </p>
    </div>
  );
};
