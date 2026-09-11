import {
  FetchBookingsResponse,
} from '@/shared/types/api/booking';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/appStore';
import { useBooking } from '@/hooks/useUserBooking';
import { queryKeys } from '@/shared/utils/constants';
import { fetchBookings } from '@/services/apis/booking';
import ConfirmAlert from '@/components/alert/ConfirmAlert';
import { useJVideoCall } from '@/hooks/useJVideoCall';
import DataFetchingError from '@/components/error/DataFetchingError';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';
import BookingsTableColumn from '@/components/table/tableColumns/BookingsTableColumn';

const ListBookingsPage = () => {
  
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  const {
    handleNavigateToBookingsDetailPage
  } = useRoleBasedNavigation();

  const {
    handleReviewAddFormToggle,
    changeAppointmentStatus,
    statusChangingAppointmentId,
    cancelBooking,
    isCancelling
  } = useBooking();

  const { JoinCallLobby } = useJVideoCall();

  const handleUserCancelBooking = async (bookingId: string) => {
    toast(
      ({ closeToast }) => (
        <ConfirmAlert
          message="Are you sure you want to cancel this booking?"
          deleteHandler={(options) => cancelBooking({ bookingId }, options)}
          isDeleting={isCancelling}
          closeToast={closeToast}
          btnTitle="Cancel booking button"
          btnText="Cancel"
        />
      ),
      { autoClose: false },
    );
  };

  if (!authUser) {
    return <DataFetchingError message="No user found" />;
  }

  const columns = BookingsTableColumn(
    JoinCallLobby,
    handleNavigateToBookingsDetailPage,
    authUser.role,
    handleReviewAddFormToggle,
    handleUserCancelBooking,
    changeAppointmentStatus,
    statusChangingAppointmentId
  );

  return (
    <div className="p-4">
      <PaginatedDataTable<FetchBookingsResponse>
        fetchApiFunction={(params) => fetchBookings({ ...params })}
        columnsCount={6}
        column={columns}
        queryKey={[queryKeys.BOOKINGS]}
      />
    </div>
  );
};

export default ListBookingsPage;
