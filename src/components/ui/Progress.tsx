import React from 'react';
import { cn } from '../../lib/utils';

interface ProgressProps {
  value?: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value = 0, className }) => {
  return (
    <div className={cn("w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden border border-slate-300 dark:border-slate-600", className)}>
      <div
        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500 ease-out shadow-sm"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}; 