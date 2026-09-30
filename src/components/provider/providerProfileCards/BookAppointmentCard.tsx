import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from '@/components/ui/card';
import { PaymentProcessType } from '@/shared/types/enums';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { formatDate } from '@/shared/utils/helper/formatDate';
import { formatString } from '@/shared/utils/helper/formatString';
import { BookAppointmentCardProps } from '@/shared/types/component';
import { setPaymentSelectionOpen } from '@/app/store/slices/paymentSlice';

const BookAppointmentCard = ({ isLoading, isError, data }: BookAppointmentCardProps) => {

  const dispatch = useDispatch<AppDispatch>();
  const bookingData = useSelector((state: RootState) => state.payment?.bookingData);

  const handleBookAppointment = () => {
    dispatch(setPaymentSelectionOpen(PaymentProcessType.BOOKING));
  };

  return (
    <Card className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      <div className="bg-primary/5 p-6 flex flex-col justify-center items-center text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Standard Rate
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-extrabold text-foreground">
            {isLoading ? (
              <div className="shimmer w-20 h-8 rounded-md"></div>
            ) : isError ? (
              <p className="text-red-500 font-normal text-xl">Error Fetching price</p>
            ) : !data ? (
              <p className="text-gray-500 font-normal text-xl">Price not available</p>
            ) : (
              `₹ ${data}`
            )}
          </span>
          <span className="text-sm font-medium text-muted-foreground">INR</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">All inclusive consultation fee</p>
      </div>
      {bookingData && (
        <div className="mx-6 mt-4 overflow-hidden rounded-xl border bg-card/50 p-4 shadow-sm backdrop-blur-sm space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-border/60">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Booking Overview
            </p>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary capitalize">
              {formatString(bookingData.selectedServiceMode)}
            </span>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-normal">Date</span>
              <span className="font-semibold text-foreground tracking-tight">
                {formatDate(bookingData.date)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-normal">Time</span>
              <span className="font-semibold text-foreground tracking-tight">
                {bookingData.slot}
              </span>
            </div>
          </div>
        </div>
      )}
      <CardContent className="p-6 space-y-4">
        <Button
          title="Book appointment"
          variant="default"
          className='w-full'
          disabled={isLoading || isError || !data}
          onClick={handleBookAppointment}
        >
          Book Appointment
          <ArrowRight className="size-4" />
        </Button>
        <p className="text-[11px] text-center text-muted-foreground">
          Secure bookings with instantaneous confirmation
        </p>
      </CardContent>
    </Card>
  );
};

export default BookAppointmentCard;
