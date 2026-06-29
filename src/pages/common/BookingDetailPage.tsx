import {
  Info,
  Hash,
  Mail,
  User,
  Clock,
  Video,
  LogIn,
  LogOut,
  XCircle,
  Calendar,
  CheckCircle,
} from "lucide-react";
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DataField from '@/components/app/DataField';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { fetchBookingDetails } from '@/shared/apis/booking';
import { formatDateWithTime } from '@/shared/helper/formatter';
import DataFetchingError from '@/components/error/DataFetchingError';
import ProfileDetailsShimmer from '@/components/shimmers/DataFieldShimmer';
import { Booking } from '@/shared/interface/entityInterface/bookingInterface';

const BookingDetailPage: React.FC = () => {

  const { bookingId } = useParams<{ bookingId: Booking["_id"] }>();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => {
      const res = await fetchBookingDetails(bookingId!);
      return res.data;
    },
    queryKey: ["booking", bookingId],
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!bookingId
  });

  const dataMap = [
    { label: "Booked On", value: data?.appointmentDate, isDate: true, Icon: Calendar },
    { label: "Booking At", value: data?.createdAt, isDate: true, Icon: Clock },
    { label: "Service Mode", value: data?.appointmentMode, Icon: Video },
    { label: "Booking Status", value: data?.appointmentStatus, Icon: Info },
    { label: "Slot Time", value: data?.appointmentTime, Icon: Clock },
    { label: "Room Id", value: data?.videoCallRoomId, Icon: Hash },
    { label: "Provider Username", value: data?.serviceProviderId.username, Icon: User },
    { label: "Provider Email", value: data?.serviceProviderId.email, Icon: Mail },
    { label: "Customer Username", value: data?.userId.username, Icon: User },
    { label: "Customer Email", value: data?.userId.email, Icon: Mail },
  ];

  return (
    <div className="p-4">
      <PageHeader
        title="Booking Details"
        description="Detailed view of booking"
      />
      {isError && error ? (
        <DataFetchingError message={(error as Error).message} />
      ) : isLoading ? (
        <ProfileDetailsShimmer row={14} />
      ) : data ? (
        <div className="">
          <Card>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {dataMap.map((item) => (
                  <DataField key={item.label} {...item} />
                ))}
              </div>

              <div className="border-b">
                <h4 className="p-4 font-bold text-purple-400">
                  Time Map
                </h4>
              </div>

              <DataField
                label="Customer Joined"
                value={data?.onlineTrack?.user?.joined ? "✅ Yes" : "❌ No"}
                Icon={data?.onlineTrack?.user?.joined ? CheckCircle : XCircle}
              />

              <DataField
                label="Customer Join Time"
                value={data?.onlineTrack?.user?.joinedTime}
                isDate
                Icon={LogIn}
              />

              <DataField
                label="Customer Left Call"
                value={data?.onlineTrack?.user?.leftCallTime}
                isDate
                Icon={LogOut}
              />

              <DataField
                label="Provider Joined"
                value={data?.onlineTrack?.provider?.joined ? "✅ Yes" : "❌ No"}
                Icon={data?.onlineTrack?.provider?.joined ? CheckCircle : XCircle}
              />

              <DataField
                label="Provider Join Time"
                value={data?.onlineTrack?.provider?.joinedTime}
                isDate
                Icon={LogIn}
              />

              <DataField
                label="Provider Left Call"
                value={data?.onlineTrack?.provider?.leftCallTime}
                isDate
                Icon={LogOut}
              />
              <div className="border-b">
                <h4 className="p-4 font-bold text-purple-400">
                  Status History
                </h4>
              </div>

              {data?.statusTrack && data.statusTrack.length > 0 ? (
                data.statusTrack.map((track, index) => {
                  return (
                    <DataField
                      key={index}
                      label={track.appointmentStatus}
                      value={track.time ? formatDateWithTime(track.time) : "No time recorded"}
                      Icon={Info}
                    />
                  );
                })
              ) : (
                <DataField label="No status history" value="No status history" />
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <DataFetchingError message="No data found" />
      )}
    </div >
  )
}

export default BookingDetailPage;