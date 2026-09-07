// import IconText from './IconText';
// import { Copy } from 'lucide-react';
// import { Button } from '../ui/button';
// import { toast } from 'react-toastify';
// import { DataFieldProps } from '@/shared/types/component';
// import { formateDate } from '@/shared/utils/helper/formatter';
// import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
// import { formatBoolean, formatDuration } from '@/shared/utils/helper/formatter';

// const DataField = ({
//   label,
//   value,
//   Icon,
//   canCopy,
//   isBoolean,
//   link,
//   isPrice,
//   isRadioGroup,
//   isTime,
//   isDate,
//   selectedRadioValue,
//   onRadioChange,
//   tags,
//   isImage,
// }: DataFieldProps) => {
//   let displayValue: React.ReactNode;

//   if (value === null || value === undefined || (typeof value === 'string' && !value.trim())) {
//     displayValue = <IconText text="No Data Found" className="text-primary/50" />;
//   } else if (isRadioGroup && Array.isArray(value)) {
//     return (
//       <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
//         <div className="p-2 rounded-md bg-background text-primary border shadow-sm">
//           {Icon && <Icon className="w-4 h-4" />}
//         </div>
//         <div>
//           <p className="text-xs text-muted-foreground font-medium">{label}</p>
//           <RadioGroup value={selectedRadioValue} onValueChange={onRadioChange} className="flex">
//             {value.map((item) => (
//               <div key={item} className="flex items-center space-x-2">
//                 <RadioGroupItem value={item} id={item} />
//                 <label htmlFor={item} className="text-sm font-medium leading-none">
//                   {item}
//                 </label>
//               </div>
//             ))}
//           </RadioGroup>
//         </div>
//       </div>
//     );
//   } else if (isBoolean) {
//     displayValue = formatBoolean(value as boolean);
//   } else if (isPrice) {
//     displayValue = `₹ ${value as string} INR`;
//   } else if (canCopy && typeof value === 'string') {
//     return (
//       <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
//         <div className="p-2 rounded-md bg-background text-primary border shadow-sm">
//           {Icon && <Icon className="w-4 h-4" />}
//         </div>
//         <div>
//           <p className="text-xs text-muted-foreground font-medium">{label}</p>
//           <span className="text-sm font-semibold text-foreground">
//             {value}{' '}
//             {value !== 'Not Yet provided' && (
//               <Button
//                 variant="ghost"
//                 className="p-0 hover:bg-0 text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
//                 onClick={() => {
//                   navigator.clipboard.writeText(value);
//                   toast.success('Copied');
//                 }}
//               >
//                 <Copy />
//               </Button>
//             )}
//           </span>
//         </div>
//       </div>
//     );
//   } else if (isDate) {
//     displayValue = formateDate(value as Date);
//   } else if (link && typeof value === 'string') {
//     displayValue = (
//       <a
//         href={value}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-blue-500 hover:underline"
//       >
//         Open Url
//       </a>
//     );
//   } else if (isTime) {
//     displayValue = formatDuration(value as number);
//   } else if (tags) {
//     displayValue = (value as string[]).map((tag: string) => tag + ', ');
//   } else if (isImage) {
//     displayValue = (
//       <img src={value as string} alt={label} className="rounded-md h-10 w-10 object-cover" />
//     );
//   } else {
//     displayValue = value as string;
//   }

//   return (
//     <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
//       <div className="p-2 rounded-md bg-background text-primary border shadow-sm">
//         {Icon && <Icon className="w-4 h-4" />}
//       </div>
//       <div>
//         <p className="text-xs text-muted-foreground font-medium">{label}</p>
//         <p className="text-sm font-semibold text-foreground">{displayValue}</p>
//       </div>
//     </div>
//   );
// };

// export default DataField;

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { DataFieldProps } from '@/shared/types/component';
import DataShimmer from '@/components/shimmers/DataShimmer';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { formateDate, formatBoolean, formatDuration } from '@/shared/utils/helper/formatter';

const DataField = ({
  label,
  value,
  Icon,
  canCopy,
  isBoolean,
  link,
  isPrice,
  isRadioGroup,
  isTime,
  isDate,
  selectedRadioValue,
  onRadioChange,
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

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-between text-xs p-3 rounded-lg border border-slate-100 dark:border-border/50 bg-slate-50/50 dark:bg-muted/20">
        <span className="text-slate-500 font-medium flex items-center gap-2">
          {Icon && <Icon className="w-3.5 h-3.5 text-slate-400" />} {label}
        </span>
        <DataShimmer w={shimmerWidth} h="h-4" />
      </div>
    );
  }

  // 2. Radio Group Format
  if (isRadioGroup && Array.isArray(value)) {
    return (
      <div className="flex items-center justify-between text-xs p-3 rounded-lg border border-slate-100 dark:border-border/50 bg-slate-50/50 dark:bg-muted/20">
        <span className="text-slate-500 font-medium flex items-center gap-2">
          {Icon && <Icon className="w-3.5 h-3.5 text-slate-400" />} {label}
        </span>
        <RadioGroup value={selectedRadioValue} onValueChange={onRadioChange} className="flex gap-3">
          {value.map((item) => (
            <div key={item} className="flex items-center space-x-1.5">
              <RadioGroupItem value={item} id={item} />
              <label
                htmlFor={item}
                className="text-xs font-medium leading-none text-slate-800 dark:text-slate-200"
              >
                {item}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  }

  // 3. Process Display Value
  let displayValue: React.ReactNode;

  if (value === null || value === undefined || (typeof value === 'string' && !value.trim())) {
    displayValue = <span className="text-slate-400">N/A</span>;
  } else if (isBoolean) {
    displayValue = formatBoolean(value as boolean);
  } else if (isPrice) {
    displayValue = `₹ ${value} INR`;
  } else if (canCopy && typeof value === 'string') {
    displayValue = (
      <div className="flex items-center gap-2 group">
        {label && <span className="text-xs text-slate-500 w-28 shrink-0">{label}</span>}
        <button
          onClick={handleCopy}
          className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          title="Copy ID"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
        <code className="px-2 py-1 bg-slate-100 dark:bg-muted/20 border border-slate-200 dark:border-border rounded font-mono text-xs text-slate-800 dark:text-slate-200 truncate">
          {value}
        </code>
      </div>
    );
  } else if (isDate) {
    displayValue = formateDate(value as Date);
  } else if (link && typeof value === 'string') {
    displayValue = (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
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

  // 4. Regular Stripe-like Row Render
  return (
    <div className="flex items-center justify-between text-xs p-3 rounded-lg border border-slate-100 dark:border-border/50 bg-slate-50/50 dark:bg-muted/20">
      <span className="text-slate-500 font-medium flex items-center gap-2">
        {Icon && <Icon className="w-3.5 h-3.5 text-slate-400" />} {label}
      </span>
      <span className="font-medium text-slate-800 dark:text-slate-200">{displayValue}</span>
    </div>
  );
};

export default DataField;
