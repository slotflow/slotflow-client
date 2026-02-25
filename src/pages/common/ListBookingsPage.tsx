import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/appStore";
import { fetchBookings } from "@/utils/apis/booking.api";
import CommonTable from "@/components/common/CommonTable";
import { useCommonHook } from "@/hooks/commonHooks/useCommonActions";
import { useUserBookingActions } from "@/hooks/userHooks/useUserBookingActions";
import { BookingsTableColumn } from "@/components/table/tableColumns/BookingsTableColumn";
import { useProviderAppointmentActions } from "@/hooks/providerHooks/useProviderAppointmentActions";
import { FetchBookingsResponse } from "@/utils/interface/api/bookingApiInterface";

const ListBookingsPage: React.FC = () => {

  const authUser = useSelector((state: RootState) => state.auth.authUser);

  const {
    handleChangeAppointmentStatus
  } = useProviderAppointmentActions();

  const {
    handleJoinCall,
    handleNavigateToBookingsDetailPage
  } = useCommonHook();

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
      queryKey="onlineBookings"
    />
  );
};

export default ListBookingsPage;
