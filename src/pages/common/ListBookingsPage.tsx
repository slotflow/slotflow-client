import React from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/appStore";
import { useBooking } from "@/hooks/useUserBooking";
import { fetchBookings } from "@/shared/apis/booking";
import CommonTable from "@/components/table/CommonTable";
import { useRoleBasedNavigation } from "@/hooks/useRoleBasedNavigation";
import { BookingsTableColumn } from "@/components/table/tableColumns/BookingsTableColumn";
import { changeAppointmentStatusRequest, FetchBookingsResponse, ValidateRoomId } from "@/shared/interface/api/booking";

const ListBookingsPage: React.FC = () => {

  const authUser = useSelector((state: RootState) => state.auth.authUser);

  const {
    JoinCallHandler,
    handleNavigateToBookingsDetailPage
  } = useRoleBasedNavigation();

  const {
    handleReviewAddFormToggle,
    changeAppointmentStatusHandler,
    cancelBookingHandler
  } = useBooking();

  // function to handle change appointment status by provider
  const handleChangeAppointmentStatus = async (data: changeAppointmentStatusRequest) => {
    const res = await changeAppointmentStatusHandler(data);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  }

  // function to handle user cancel booking
  const handleUserCancelBooking = async (bookingId: string) => {
    // need to add the confirm alert
    const res = await cancelBookingHandler(bookingId);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  }

  // 
  const handleJoinCall = async (data: ValidateRoomId) => {
    const result = await JoinCallHandler(data);
    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
    }
  }

  const columns = BookingsTableColumn(
    handleJoinCall,
    handleNavigateToBookingsDetailPage,
    authUser?.role!,
    handleReviewAddFormToggle,
    handleUserCancelBooking,
    handleChangeAppointmentStatus,
  );

  // can implement a custom filter and pass as query paramas

  return (
    <CommonTable<FetchBookingsResponse>
      fetchApiFunction={(params) =>
        fetchBookings({ ...params })
      }
      columnsCount={6}
      column={columns}
      queryKey="bookings"
    />
  );
};

export default ListBookingsPage;
