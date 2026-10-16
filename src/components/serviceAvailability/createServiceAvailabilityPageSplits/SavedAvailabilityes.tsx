import { useState } from 'react';
import { Day } from '@/shared/types/enums';
import { Copy, Trash, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatString } from '@/shared/utils/helper/formatString';
import { SavedAvailabilitiesProps } from '@/shared/types/component';

const ALL_DAYS_ORDER = [
  Day.SUNDAY,
  Day.MONDAY,
  Day.TUESDAY,
  Day.WEDNESDAY,
  Day.THURSDAY,
  Day.FRIDAY,
  Day.SATURDAY,
];

const SavedAvailabilities = ({
  availabilities,
  removeAvailability,
  onCopyLastAvailability,
}: SavedAvailabilitiesProps) => {
  const [dismissedForDay, setDismissedForDay] = useState<Day | null>(null);

  if (!availabilities || availabilities.length === 0) {
    return null;
  }

  const lastAdded = availabilities[availabilities.length - 1];
  const savedDaysSet = new Set(availabilities.map((a) => a.day));
  const nextUnassignedDay = ALL_DAYS_ORDER.find((d) => !savedDaysSet.has(d));
  const isBannerVisible: boolean | undefined =
    nextUnassignedDay && lastAdded && onCopyLastAvailability && dismissedForDay !== lastAdded.day;

  return (
    <div className="space-y-4 mt-10">
      {isBannerVisible && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
          <div className="space-y-0.5">
            <p className="font-semibold">
              Copy {formatString(lastAdded.day)}'s schedule to {formatString(nextUnassignedDay)}?
            </p>
            <p className="text-xs text-blue-700">
              Avoid duplicate entry by reusing the exact time range and slots.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {onCopyLastAvailability && nextUnassignedDay && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onCopyLastAvailability(nextUnassignedDay, lastAdded)}
              >
                <Copy className="size-4" />
                Copy to {formatString(nextUnassignedDay)}
              </Button>
            )}

            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label="Dismiss copy banner"
              onClick={() => setDismissedForDay(lastAdded.day)}
            >
              <X className="size-4" />
              Cancel
            </Button>
          </div>
        </div>
      )}

      <label className="block text-sm font-semibold">Saved Daily Availabilities</label>
      <ul className="space-y-2">
        {availabilities.map((availability) => (
          <div
            className="flex items-center justify-between gap-2 w-full md:w-1/2"
            key={availability.day}
          >
            {availability.isAvailable ? (
              <li className="flex-1 p-2 border border-gray-300 rounded-md text-sm truncate">
                {formatString(availability.day)} - {availability.startTime} to{' '}
                {availability.endTime}
              </li>
            ) : (
              <li className="flex-1 p-2 border border-gray-300 rounded-md text-sm truncate">
                {formatString(availability.day)} - Not Available
              </li>
            )}
            <Button
              title="Delete availability"
              variant="destructive"
              size="icon"
              type="button"
              onClick={() => removeAvailability(availability.day)}
            >
              <Trash className="size-4" />
            </Button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SavedAvailabilities;
