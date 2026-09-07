import { Award, Check, Shield, ShieldCheck, ShieldAlert } from 'lucide-react';
import React from 'react';
import { StatusBadgeProps, StatusBadgeType } from '@/shared/types/common';

const BADGE_CONFIG: Record<
  StatusBadgeType,
  { label: string; styles: string; icon?: React.ReactNode }
> = {
  active: {
    label: 'Active',
    styles:
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800',
    icon: <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />,
  },
  blocked: {
    label: 'Blocked',
    styles:
      'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800',
    icon: <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />,
  },
  verified: {
    label: 'Verified',
    styles:
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800',
    icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />,
  },
  unverified: {
    label: 'Unverified',
    styles:
      'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700',
    icon: <Shield className="w-3.5 h-3.5 text-slate-400" />,
  },
  pending: {
    label: 'Pending',
    styles:
      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800',
    icon: <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />,
  },
  standard: {
    label: 'Standard',
    styles: 'bgtext-slate-600 border-slate-200 dark:text-slate-400 dark:border-slate-700',
    icon: <Check className="w-3.5 h-3.5 text-green-400" />,
  },
  updating: {
    label: 'Updating...',
    styles:
      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800',
    icon: <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />,
  },
  trusted: {
    label: 'Trusted Provider',
    styles:
      'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-400 dark:border-indigo-800 font-semibold',
    icon: <Award className="w-3.5 h-3.5 text-indigo-500" />,
  },
  normal: {
    label: 'Normal',
    styles:
      'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700 font-medium',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ type, label, icon, className = '' }) => {
  const config = BADGE_CONFIG[type];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.styles} ${className}`}
    >
      {icon ?? config.icon}
      {label ?? config.label}
    </span>
  );
};

export default StatusBadge;
