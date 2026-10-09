export const sizeClasses = {
  xs: { box: 'size-6', text: 'text-xs' },
  sm: { box: 'size-8', text: 'text-xs' },
  md: { box: 'size-10', text: 'text-sm' },
  lg: { box: 'size-12', text: 'text-base' },
  xl: { box: 'size-16', text: 'text-xl' },
  '2xl': { box: 'size-20', text: 'text-2xl' },
  '3xl': { box: 'size-24', text: 'text-3xl' },
} as const;

export const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const;
