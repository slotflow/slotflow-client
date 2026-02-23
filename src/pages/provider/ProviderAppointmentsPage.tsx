import CommonTable from '@/components/common/CommonTable';
import { providerFetchBookingAppoinments } from '@/utils/apis/provider.api';
import { FetchBookingsResponse } from '@/utils/interface/api/commonApiInterface';
import { useProviderAppointmentActions } from '@/hooks/providerHooks/useProviderAppointmentActions';
import { ProviderAppointmentsBookingTableColumns } from '@/components/table/tableColumns/ProviderAppointmentsTableColumn';

const ProviderAppointmentsPage = () => {

  const {
    handleChangeAppointmentStatus,
    handleProviderJoinCall,
    handleNavigateToAppointmentDetailPage
  } = useProviderAppointmentActions();

  const columns = ProviderAppointmentsBookingTableColumns(
    handleChangeAppointmentStatus,
    handleProviderJoinCall,
    handleNavigateToAppointmentDetailPage
  );

  return (
    <CommonTable<FetchBookingsResponse>
      fetchApiFunction={(params) =>
        providerFetchBookingAppoinments({ ...params, online: false })
      }
      queryKey='appointments'
      column={columns}
      columnsCount={6}
    />
  )
}

export default ProviderAppointmentsPage