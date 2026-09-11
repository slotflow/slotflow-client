import { Button } from '../ui/button';
import { LoaderCircle } from 'lucide-react';
import { ConfirmDeleteProps } from '@/shared/types/component';

const ConfirmAlert = ({
  message,
  deleteHandler,
  isDeleting,
  closeToast,
  btnTitle,
  btnText,
}: ConfirmDeleteProps) => {

  const handleDelete = () => {
    deleteHandler({
      onSuccess: () => {
        closeToast?.();
      },
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <p>{message}</p>
      <div className="flex gap-2">
        {isDeleting ? (
          <div className="flex justify-center items-center">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : (
          <>
            <Button title={btnTitle} size="sm" variant="destructive" onClick={handleDelete}>
              Yes, {btnText}
            </Button>

            <Button title="Cancel" size="sm" variant="ghost" onClick={closeToast}>
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmAlert;
