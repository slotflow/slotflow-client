import React from 'react';
import { Button } from '../ui/button';
import { LoaderCircle } from 'lucide-react';
import { AuthFormsButtonProps } from '@/shared/interface/componentInterface';

export const FormButton = React.memo(
  ({ text, loading = false, disabled, title }: AuthFormsButtonProps) => {
    return (
      <Button
        title={title}
        variant="default"
        type="submit"
        disabled={disabled}
        className="border-1 w-full flex items-center justify-center cursor-pointer bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] hover:text-white transition-colors border-[var(--mainColor)] dark:text-white"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <LoaderCircle className="animate-spin size-4" />
            <span>{text}</span>
          </span>
        ) : (
          text
        )}
      </Button>
    );
  },
);
