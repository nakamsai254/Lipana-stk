
import React, { useState } from 'react';
import { WifiPlan } from '../types';
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
    if (!phone || phone.length < 9) {
      setError('Please enter a valid phone number.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    // TODO: Introduce your new payment logic here
    try {
      // Simulation of a payment request
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSuccess(phone);
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-auto animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Checkout</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Complete your purchase to get online</p>
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
            Phone Number
          </label>
          <div className="relative group">
            <input
              type="tel"
              id="phone"
              autoFocus
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 0712345678"
              className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-semibold text-lg"
              required
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl flex items-start space-x-3 border border-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-5 rounded-2xl text-white font-bold text-lg shadow-xl shadow-indigo-100 transition-all flex items-center justify-center space-x-3 ${
            isProcessing ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'
          }`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <span>Confirm Payment</span>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
        Secure Transaction Processing
      </p>
    </div>
  );
};
