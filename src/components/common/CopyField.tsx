import { useCopy } from '@/hooks/useCopy';
import { Check, Copy } from 'lucide-react';
import { CupyFieldProps } from '@/shared/types/component';

const CopyableId = ({ 
  value, 
  label 
}: CupyFieldProps) => {

  const { copied, copy } = useCopy(2000);

  return (
    <div className="flex items-center gap-2 group">
      {label && <span className="text-xs text-slate-500 w-28 shrink-0">{label}</span>}
      <code className="px-2 py-1 bg-slate-100 dark:bg-muted/20 border border-slate-200 dark:border-border rounded font-mono text-xs text-slate-800 dark:text-slate-200 truncate">
        {value}
      </code>
      <button
        onClick={() => copy(value)}
        className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        title="Copy ID"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
};

export default CopyableId;
