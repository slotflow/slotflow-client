import { userFetchBookings } from "@/utils/apis/user.api";
import CommonTable from "@/components/common/CommonTable";
import { FetchBookingsResponse } from "@/utils/interface/api/commonApiInterface";
import { useUserBookingActions } from "@/hooks/userHooks/useUserBookingActions";
import { UserBookingsTableColumns } from "@/components/table/tableColumns/UserBookingsTableColumn";

const UserBookingsPage = () => {

    const { 
        handleUserCancelBooking, 
        handleUserJoinCall, 
        handleNavigateToBookingDetailPage,
        handleReviewAddFormToggle
    } = useUserBookingActions();
    const columns = UserBookingsTableColumns(
        handleUserCancelBooking, 
        handleUserJoinCall, 
        handleNavigateToBookingDetailPage,
        handleReviewAddFormToggle
    );

    return (
        <CommonTable<FetchBookingsResponse>
            fetchApiFunction={userFetchBookings}
            queryKey='bookings'
            column={columns}
            columnsCount={6}
        />
    );
}

export default UserBookingsPage