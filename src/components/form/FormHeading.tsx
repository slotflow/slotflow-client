import React from 'react';
import { AuthFormsHeadingProps } from '@/shared/types/component';
import { CardDescription, CardHeader, CardTitle } from '../ui/card';
import logo from '../../assets/logos/company/slotflowLogoTransparent.png';

const FormHeading = React.memo(({ title, description }: AuthFormsHeadingProps) => {
  return (
    <CardHeader className="p-0 pb-6 text-center space-y-4">
      <div className="mx-auto flex items-center justify-center">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative flex items-center justify-center size-16 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-sm p-2.5">
            <img src={logo} alt="Slotflow Logo" className="size-full object-contain" />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
          {title}
        </CardTitle>

        {description && (
          <CardDescription className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
            {description}
          </CardDescription>
        )}
      </div>
    </CardHeader>
  );
});

export default FormHeading;
