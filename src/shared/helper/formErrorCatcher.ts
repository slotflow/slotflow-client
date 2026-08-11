import { toast } from 'react-toastify';
import type { FieldErrors, Path, UseFormSetFocus, FieldValues } from 'react-hook-form';

export const handleFormError =
  <T extends FieldValues>(setFocus: UseFormSetFocus<T>) =>
  (errors: FieldErrors<T>): void => {
    const firstErrorField = Object.keys(errors)[0];

    if (!firstErrorField) {
      toast.error('Please fix the highlighted fields.');
      return;
    }

    const errorValue = errors[firstErrorField];

    if (Array.isArray(errorValue)) {
      const firstErrorIndex = errorValue.findIndex(
        (error) => error !== undefined,
      );

      if (firstErrorIndex !== -1) {
        setFocus(
          `${firstErrorField}.${firstErrorIndex}` as Path<T>,
        );
      }
    } else {
      setFocus(firstErrorField as Path<T>);
    }

    toast.error('Please fix the highlighted fields.');
  };