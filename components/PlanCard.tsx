
import React from 'react';
import { WifiPlan } from '../types';
import { APP_CONFIG } from '../constants';

interface PlanCardProps {
  plan: WifiPlan;
  isSelected: boolean;
  onSelect: (plan: WifiPlan) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, isSelected, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(plan)}
      className={`relative cursor-pointer transition-all duration-300 transform rounded-2xl p-6 flex flex-col justify-between border-2 ${
        isSelected 
          ? 'border-indigo-600 ring-4 ring-indigo-50/50 scale-[1.02] shadow-xl' 
          : 'border-white hover:border-indigo-200 hover:shadow-lg bg-white shadow-sm'
      }`}
    >
      {isSelected && (
        <div className="absolute top-4 right-4 bg-indigo-600 text-white p-1 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      <div>
        <div className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold mb-4 ${plan.color}`}>
          {plan.duration}
        </div>
        <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
        <p className="text-sm text-slate-500 mt-2 mb-4 leading-relaxed">{plan.description}</p>
        
        <div className="flex items-center space-x-2 text-indigo-600 font-medium text-sm mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>{plan.speed}</span>
        </div>
      </div>

      <div className="flex items-baseline space-x-1">
        <span className="text-3xl font-black text-slate-900">{plan.price}</span>
        <span className="text-slate-500 font-bold uppercase tracking-wider text-sm">{APP_CONFIG.currency}</span>
      </div>
    </div>
  );
};
