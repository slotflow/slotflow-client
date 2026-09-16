import React from 'react';
import { Button } from '../ui/button';
import { LoaderCircle } from 'lucide-react';
import { defaultBtnClass } from '@/shared/utils/constants';
import { AuthFormsButtonProps } from '@/shared/types/component';

export const FormButton = React.memo(
  ({ text, loading = false, disabled, title, className }: AuthFormsButtonProps) => {
    return (
      <Button
        title={title}
        variant="default"
        type="submit"
        disabled={disabled}
        className={`${defaultBtnClass} ${className}`}
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
