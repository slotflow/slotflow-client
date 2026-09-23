import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from '@/components/ui/card';
import { defaultBtnClass } from '@/shared/utils/constants';
import { formatDate } from '@/shared/utils/helper/formatDate';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { BookAppointmentCardProps } from '@/shared/types/component';
import { setPaymentSelectionOpen } from '@/app/store/slices/paymentSlice';

const BookAppointmentCard = ({ isLoading, isError, data }: BookAppointmentCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const bookingData = useSelector((state: RootState) => state.payment?.bookingData);
  const handleBookAppointment = () => {
    dispatch(setPaymentSelectionOpen(true));
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
        <div className="mx-6 mt-4 p-4 rounded-lg border bg-muted/40 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Selected Appointment
          </p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium text-foreground">{formatDate(bookingData.date)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Time</span>
            <span className="font-medium text-foreground">{bookingData.slot}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Mode</span>
            <span className="font-medium text-foreground">{bookingData.selectedServiceMode}</span>
          </div>
        </div>
      )}
      <CardContent className="p-6 space-y-4">
        <Button
          variant="default"
          className={defaultBtnClass + ' w-full'}
          disabled={isLoading || isError || !data}
          onClick={handleBookAppointment}
        >
          Book Appointment
          <ArrowRight className="w-4 h-4" />
        </Button>
        <p className="text-[11px] text-center text-muted-foreground">
          Secure bookings with instantaneous confirmation
        </p>
      </CardContent>
    </Card>
  );
};

export default BookAppointmentCard;
