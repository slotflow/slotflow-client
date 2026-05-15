import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBookingDetails } from '@/shared/apis/booking';
import { formatDateWithTime } from '@/shared/helper/formatter';
import DataFetchingError from '@/components/error/DataFetchingError';
import DetailField from '@/components/app/DetailField';
import { Booking } from '@/shared/interface/entityInterface/bookingInterface';
import ProfileDetailsShimmer from '@/components/shimmers/DataFieldShimmer';

const BookingDetailPage: React.FC = () => {

  const { bookingId } = useParams<{ bookingId: Booking["_id"] }>();
  console.log("bookingId : ", bookingId)

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
    { label: "Booked On", value: data?.appointmentDate, isDate: true },
    { label: "Booking At", value: data?.createdAt, isDate: true },
    { label: "Service Mode", value: data?.appointmentMode },
    { label: "Booking Status", value: data?.appointmentStatus },
    { label: "Slot Time", value: data?.appointmentTime },
    { label: "Room Id", value: data?.videoCallRoomId },
    { label: "Provider Username", value: data?.serviceProviderId.username },
    { label: "Provider Email", value: data?.serviceProviderId.email },
    { label: "Customer Username", value: data?.userId.username },
    { label: "Customer Email", value: data?.userId.email },
  ];

  return (
    <div className="w-full p-2 mx-auto mt-0 md:flex justify-start flex-grow bg">
      {isError && error ? (
        <DataFetchingError message={(error as Error).message} />
      ) : isLoading ? (
        <ProfileDetailsShimmer row={14} />
      ) : data ? (
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-4">Subscription Details</h2>
          <table className="table-auto border-collapse border  w-full">
            <tbody>
              {dataMap.map((item) => (
                <DetailField key={item.label} {...item} />
              ))}

              <tr className="border-b">
                <td colSpan={2} className="p-4 font-bold text-purple-400">
                  Time Map
                </td>
              </tr>

              <tr className="border-b">
                <td className="p-4 font-medium w-4/12 capitalize">Customer Joined</td>
                <td className="p-4 w-8/12">
                  {data?.onlineTrack?.user
                    ? data.onlineTrack.user.joined
                      ? "✅ Yes"
                      : "❌ No"
                    : "No data found"}
                </td>
              </tr>

              <tr className="border-b">
                <td className="p-4 font-medium w-4/12 capitalize">Customer Join Time</td>
                <td className="p-4 w-8/12">
                  {data?.onlineTrack?.user
                    ? data.onlineTrack.user.joinedTime
                      ? formatDateWithTime(data.onlineTrack.user.joinedTime)
                      : "No data found"
                    : "No data found"}
                </td>
              </tr>

              <tr className="border-b">
                <td className="p-4 font-medium w-4/12 capitalize">Customer Left Call</td>
                <td className="p-4 w-8/12">
                  {data?.onlineTrack?.user
                    ? data.onlineTrack.user.leftCallTime
                      ? formatDateWithTime(data.onlineTrack.user.leftCallTime)
                      : "No data found"
                    : "No data found"}
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-medium w-4/12 capitalize">Provider Joined</td>
                <td className="p-4 w-8/12">
                  {data?.onlineTrack?.provider
                    ? data.onlineTrack.provider.joined
                      ? "✅ Yes"
                      : "❌ No"
                    : "No data found"}
                </td>
              </tr>

              <tr className="border-b">
                <td className="p-4 font-medium w-4/12 capitalize">Provider Join Time</td>
                <td className="p-4 w-8/12">
                  {data?.onlineTrack?.provider
                    ? data.onlineTrack.provider.joinedTime
                      ? formatDateWithTime(data.onlineTrack.provider.joinedTime)
                      : "No data found"
                    : "No data found"}
                </td>
              </tr>

              <tr className="border-b">
                <td className="p-4 font-medium w-4/12 capitalize">Provider Left Call</td>
                <td className="p-4 w-8/12">
                  {data?.onlineTrack?.provider
                    ? data.onlineTrack.provider.leftCallTime
                      ? formatDateWithTime(data.onlineTrack.provider.leftCallTime)
                      : "No data found"
                    : "No data found"}
                </td>
              </tr>


              <tr className="border-b">
                <td colSpan={2} className="p-4 font-semibold text-purple-400">
                  Status History
                </td>
              </tr>

              {data?.statusTrack && data.statusTrack.length > 0 ? (
                data.statusTrack.map((track, index, arr) => {
                  const isLast = index === arr.length - 1;
                  return (
                    <tr key={index} className={`${!isLast ? "border-b" : ""}`}>
                      <td className="p-4 font-medium w-4/12 capitalize">
                        {track.appointmentStatus}
                      </td>
                      <td className="p-4 w-8/12">
                        {track.time ? formatDateWithTime(track.time) : "No time recorded"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={2} className="p-4 text-center text-gray-500">
                    No status history found
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      ) : (
        <DataFetchingError message="No data found" />
      )}
    </div>
  )
}

export default BookingDetailPage;