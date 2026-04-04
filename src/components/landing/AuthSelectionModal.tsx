import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import booking from '@/assets/svgs/booking.svg';
import service from '@/assets/svgs/service.svg';
import { HandleRoleSelectionFunction } from "@/shared/interface/commonInterface";
import { useModalAnimation } from "@/hooks/systemHooks/useModalAnimation";
import { roleRoutes } from "@/shared/utils/constants";

interface AuthSelectionModalProps {
  onClose: () => void;
}

const AuthSelectionModal: React.FC<AuthSelectionModalProps> = ({ onClose }) => {

  const navigate = useNavigate();
  const { modalRef, closeModal } = useModalAnimation({ onClose });

  const handleRoleSelection = useCallback<HandleRoleSelectionFunction>(
    (url: string) => {
      navigate(url);
      closeModal();
    },
    [navigate, closeModal]
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--background)] p-6 rounded-2xl shadow-xl w-[90%] max-w-3xl text-center"
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            onClick={() => handleRoleSelection(roleRoutes.user)}
            className="cursor-pointer flex flex-col items-center justify-center rounded-2xl border p-6 h-64 hover:border-[var(--mainColor)] hover:shadow-xl transition-all duration-300"
          >
            <img
              src={booking}
              alt="Book Appointment"
              className="h-24 w-24 mb-4 transition-transform group-hover:scale-110"
            />
            <h3 className="text-lg font-semibold">
              Book an Appointment
            </h3>
            <p className="text-sm mt-2">
              Schedule a service or consultation.
            </p>
          </div>

          <div
            onClick={() => handleRoleSelection(roleRoutes.provider)}
            className="cursor-pointer flex flex-col items-center justify-center rounded-2xl border p-6 h-64 hover:border-[var(--mainColor)] hover:shadow-xl transition-all duration-300"
          >
            <img
              src={service}
              alt="Provide Service"
              className="h-24 w-24 mb-4 transition-transform group-hover:scale-110"
            />
            <h3 className="text-lg font-semibold">
              Provide Service
            </h3>
            <p className="text-sm mt-2">
              List your services and manage bookings.
            </p>
          </div>
        </div>

        <Button
          title="Close"
          variant="destructive"
          onClick={closeModal}
          className="mt-6 text-sm cursor-pointer"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default AuthSelectionModal;
