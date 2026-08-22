import {
  ValidateRoomId,
  FetchBookingsResponse,
  changeAppointmentStatusRequest,
} from '@/shared/types/api/booking';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/appStore';
import { useBooking } from '@/hooks/useUserBooking';
import { fetchBookings } from '@/services/apis/booking';
import ConfirmAlert from '@/components/alert/ConfirmAlert';
import DataFetchingError from '@/components/error/DataFetchingError';
import PaginatedDataTable from '@/components/table/PaginatedDataTable';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';
import BookingsTableColumn from '@/components/table/tableColumns/BookingsTableColumn';

const ListBookingsPage = () => {
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  const { JoinCallHandler, handleNavigateToBookingsDetailPage } = useRoleBasedNavigation();

  const { handleReviewAddFormToggle, changeAppointmentStatusHandler, cancelBookingHandler } =
    useBooking();

  // function to handle change appointment status by provider
  const handleChangeAppointmentStatus = async (data: changeAppointmentStatusRequest) => {
    const res = await changeAppointmentStatusHandler(data);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  // function to handle user cancel booking
  const handleUserCancelBooking = async (bookingId: string) => {
    // need to add the confirm alert
    toast(
      ({ closeToast }) => (
        <ConfirmAlert
          message="Are you sure you want to cancel this booking?"
          entityId={bookingId}
          deleteHandler={cancelBookingHandler}
          closeToast={closeToast}
          errorMessage="Booking canceling failed"
          successMessage="Review deleted successfully"
          btnTitle="Cancel booking button"
          btnText="Cancel"
        />
      ),
      { autoClose: false },
    );
  };

  const handleJoinCall = async (data: ValidateRoomId) => {
    const result = await JoinCallHandler(data);
    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
    }
  };

  if (!authUser) {
    return <DataFetchingError message="No user found" />;
  }

  const columns = BookingsTableColumn(
    handleJoinCall,
    handleNavigateToBookingsDetailPage,
    authUser.role,
    handleReviewAddFormToggle,
    handleUserCancelBooking,
    handleChangeAppointmentStatus,
  );

  // can implement a custom filter and pass as query params

  return (
    <div className="p-4">
      <PaginatedDataTable<FetchBookingsResponse>
        fetchApiFunction={(params) => fetchBookings({ ...params })}
        columnsCount={6}
        column={columns}
        queryKey="bookings"
      />
    </div>
  );
};

export default ListBookingsPage;
