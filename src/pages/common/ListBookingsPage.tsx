import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/appStore";
import { fetchBookings } from "@/utils/apis/booking";
import CommonTable from "@/components/common/CommonTable";
import { useRoleBasedNavigation } from "@/hooks/commonHooks/useRoleBasedNavigation";
import { useUserBookingActions } from "@/hooks/userHooks/useUserBooking";
import { BookingsTableColumn } from "@/components/table/tableColumns/BookingsTableColumn";
import { useProviderAppointment } from "@/hooks/providerHooks/useProviderAppointment";
import { FetchBookingsResponse } from "@/utils/interface/api/booking";

const ListBookingsPage: React.FC = () => {

  const authUser = useSelector((state: RootState) => state.auth.authUser);

  const {
    handleChangeAppointmentStatus
  } = useProviderAppointment();

  const {
    handleJoinCall,
    handleNavigateToBookingsDetailPage
  } = useRoleBasedNavigation();

  const { handleUserCancelBooking, handleReviewAddFormToggle } = useUserBookingActions();

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
