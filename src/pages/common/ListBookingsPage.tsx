import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/appStore";
import { cancelBooking, changeAppointmentStatus, fetchBookings } from "@/shared/apis/booking";
import CommonTable from "@/components/table/CommonTable";
import { useRoleBasedNavigation } from "@/hooks/commonHooks/useRoleBasedNavigation";
import { useBooking } from "@/hooks/useUserBooking";
import { BookingsTableColumn } from "@/components/table/tableColumns/BookingsTableColumn";
import { changeAppointmentStatusRequest, FetchBookingsResponse } from "@/shared/interface/api/booking";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ListBookingsPage: React.FC = () => {

  const queryClient = useQueryClient();
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  const {
    handleJoinCall,
    handleNavigateToBookingsDetailPage
  } = useRoleBasedNavigation();

  const { 
    handleReviewAddFormToggle 
  } = useBooking();

  // function to handle change appointment status by provider
  const handleChangeAppointmentStatus = ({ 
    appointmentId, appointmentStatus 
  }: changeAppointmentStatusRequest) => {
    changeAppointmentStatus({ appointmentId, appointmentStatus })
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          queryClient.invalidateQueries({ queryKey: ["bookings"] });
        }
      })
      .catch(() => {
        toast.error("Please try again");
      });
  }

  // function to handle user cancel booking
  const handleUserCancelBooking = (
    bookingId: string
  ) => {
    // need to add the confirm alert
    cancelBooking(bookingId)
      .then((res) => {
        if (res.success) {
          queryClient.invalidateQueries({ queryKey: ["bookings"] });
          toast.success(res.message);
        }
      })
      .catch(() => {
        toast.error("Please try again");
      });
  }

  const columns = BookingsTableColumn(
    handleJoinCall,
    handleNavigateToBookingsDetailPage,
    authUser?.role!,
    handleReviewAddFormToggle,
    handleUserCancelBooking,
    handleChangeAppointmentStatus,
  );

  return (
    <CommonTable<FetchBookingsResponse>
      fetchApiFunction={(params) =>
        fetchBookings({ ...params, online: true })
      }
      columnsCount={6}
      column={columns}
      queryParams={{ online: true }}
      queryKey="bookings"
    />
  );
};

export default ListBookingsPage;
