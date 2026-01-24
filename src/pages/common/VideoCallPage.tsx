import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/appStore";
import CommonTable from "@/components/common/CommonTable";
import { userFetchBookings } from "@/utils/apis/user.api";
import { providerFetchBookingAppoinments } from "@/utils/apis/provider.api";
import { useProviderAppointmentActions } from "@/hooks/providerHooks/useProviderAppointmentActions";
import { UserOnlineBookingTableColumn } from "@/components/table/tableColumns/UserOnlineBookingsTableColumn";
import { ProviderOnlineBookingTableColumn } from "@/components/table/tableColumns/ProviderOnlineBookingsTableColumn";
import { FetchOnlineBookingsForProviderResponse, FetchOnlineBookingsForUserResponse } from "@/utils/interface/api/commonApiInterface";
import { useUserBookingActions } from "@/hooks/userHooks/useUserBookingActions";

const VideoCallPage: React.FC = () => {

  const { authUser } = useSelector((state: RootState) => state.auth);

  const {
    handleProviderJoinCall,
    handleNavigateToAppointmentDetailPage
  } = useProviderAppointmentActions();

  const {
    handleNavigateToBookingDetailPage,
    handleUserJoinCall,
  } = useUserBookingActions();

  const providerColumns = ProviderOnlineBookingTableColumn(
    handleProviderJoinCall,
    handleNavigateToAppointmentDetailPage
  );

  const userColumns = UserOnlineBookingTableColumn(
    handleUserJoinCall,
    handleNavigateToBookingDetailPage
  );

  return (
    authUser?.role === "PROVIDER" ? (
      <CommonTable<FetchOnlineBookingsForProviderResponse>
        fetchApiFunction={(params) =>
          providerFetchBookingAppoinments({ ...params, online: true })
        }
        columnsCount={6}
        column={providerColumns}
        queryKey="onlineBookings"
      />
    ) : (
      <CommonTable<FetchOnlineBookingsForUserResponse>
        fetchApiFunction={(params) =>
          userFetchBookings({ ...params, online: true })
        }
        columnsCount={6}
        column={userColumns}
        queryKey="onlineBookings"
      />
    )
  );
};

export default VideoCallPage;
