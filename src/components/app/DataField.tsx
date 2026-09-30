import { Button } from '../ui/button';
import React, { useState } from 'react';
import { Check, Copy, X } from 'lucide-react';
import { DataFieldProps } from '@/shared/types/component';
import DataShimmer from '@/components/shimmers/DataShimmer';
import { formatDate } from '@/shared/utils/helper/formatDate';
import { formatDuration } from '@/shared/utils/helper/formatDuration';

const DataField = ({
  label,
  value,
  Icon,
  canCopy,
  isBoolean,
  link,
  isPrice,
  isTime,
  isDate,
  tags,
  isImage,
  isLoading = false,
  shimmerWidth = 'w-28',
}: DataFieldProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(value));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-between text-xs p-3 rounded-lg border border-slate-100 dark:border-border/50 bg-slate-50/50 dark:bg-muted/20">
        <span className="text-foreground font-medium flex items-center gap-2">
          {Icon && <Icon className="w-3.5 h-3.5 text-slate-400" />} {label}
        </span>
        <DataShimmer w={shimmerWidth} h="h-4" />
      </div>
    );
  }

  const isLongValue = typeof value === 'string' && value.trim().length > 60;
  let displayValue: React.ReactNode;

  if (value === null || value === undefined || (typeof value === 'string' && !value.trim())) {
    displayValue = 'Not Available'
  } else if (isBoolean) {
    displayValue = value ? (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
        <X className="w-3 h-3 text-rose-600 dark:text-rose-400" />
      </span>
    );
  } else if (isPrice) {
    displayValue = `₹ ${value} INR`;
  } else if (canCopy && typeof value === 'string') {
    displayValue = (
      <div className="flex items-center gap-2 group">
        <code className="px-2 py-1 bg-slate-100 dark:bg-muted/20 border border-slate-200 dark:border-border rounded font-mono text-xs text-slate-800 dark:text-slate-200 break-all">
          {value}
        </code>
        <Button
          size='icon'
          variant='ghost'
          onClick={handleCopy}
          className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
          title="Copy ID"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </Button>
      </div>
    );
  } else if (isDate) {
    displayValue = formatDate(value as Date);
  } else if (link && typeof value === 'string') {
    displayValue = (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium break-all"
      >
        Open Url
      </a>
    );
  } else if (isTime) {
    displayValue = formatDuration(value as number);
  } else if (tags && Array.isArray(value)) {
    displayValue = (value as string[]).join(', ');
  } else if (isImage && typeof value === 'string') {
    displayValue = (
      <img
        src={value}
        alt={label}
        className="rounded-md h-8 w-8 object-cover border border-slate-200 dark:border-border"
      />
    );
  } else {
    displayValue = value as React.ReactNode;
  }

  if (isLongValue) {
    return (
      <div className="flex flex-col gap-1.5 text-xs p-3 rounded-lg border border-slate-100 dark:border-border/50 bg-slate-50/50 dark:bg-muted/20">
        <span className="text-foreground font-medium flex items-center gap-2">
          {Icon && <Icon className="w-3.5 h-3.5 text-foreground shrink-0" />} {label}
        </span>
        <span className="font-medium text-muted-foreground break-words leading-relaxed pl-5">
          {displayValue}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 text-xs p-3 rounded-lg border border-slate-100 dark:border-border/50 bg-slate-50/50 dark:bg-muted/20">
      <span className="text-foreground font-medium flex items-center gap-2 shrink-0">
        {Icon && <Icon className="w-3.5 h-3.5 text-foreground shrink-0" />} {label}
      </span>
      <span className="font-medium text-muted-foreground text-right truncate">
        {displayValue}
      </span>
    </div>
  );
};

export default DataField;