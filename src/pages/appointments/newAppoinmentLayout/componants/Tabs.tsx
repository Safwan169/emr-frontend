'use client';
import React from 'react';
import { Check } from 'lucide-react';

type Step = {
  number: number;
  label: string;
};

type Props = {
  currentStep: number;
};

const steps: Step[] = [
  { number: 1, label: 'Select Doctor' },
  { number: 2, label: 'Choose Date & Time' },
  { number: 3, label: 'Appointment Details' },
  { number: 4, label: 'Review & Confirm' },
];

export default function StepTabsExact({ currentStep }: Props) {
  return (
    <div className="flex items-center gap-4 w-full">
      {steps.map((step, idx) => {
        const isDone = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <div
            key={step.number}
            className="flex-1 bg-white  rounded-xl px-4 py-6 flex items-center space-x-3"
          >
            {/* Circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${isDone ? 'bg-blue-800 text-white' : isActive ? 'border rounded-full' : 'border border-gray-300 text-gray-500'}`}
            >
              {isDone ? <Check className="w-4 h-4" /> : step.number}
            </div>

            {/* Label */}
            <div
              className={`text-base font-semibold
                ${isActive?'text-black' : isDone ? 'text-blue-800' : 'text-gray-400'}`}
            >
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
