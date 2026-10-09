import SelectField from '../../form/SelectField';
import { Day, ServiceMode } from '@/shared/types/enums';
import { AvailabilityDataSelectionFieldsProps } from '@/shared/types/component';
import { ProviderServiceAvailabilityFormType } from '@/shared/validators/zod/providerZod';
import {
  daysOfWeekOptions,
  isAvailableOptions,
  serviceDurationsOptions,
} from '@/shared/utils/constants/selectOptionsConstants';

const AvailabilityDataSelectionFields = ({
  isModeSelected,
  toggleMode,
  isAvailable,
  control,
}: AvailabilityDataSelectionFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <SelectField<ProviderServiceAvailabilityFormType, Day>
          label="Select Day"
          id="day"
          control={control}
          options={daysOfWeekOptions}
          required
        />
        <SelectField<ProviderServiceAvailabilityFormType, boolean>
          label="Select Availability"
          id="isAvailable"
          control={control}
          options={isAvailableOptions}
          required
        />
        {isAvailable && (
          <SelectField<ProviderServiceAvailabilityFormType, number>
            label="Slot Duration (Minutes)"
            id="duration"
            control={control}
            options={serviceDurationsOptions}
            required
          />
        )}
      </div>
      {isAvailable && (
        <div className="pt-2">
          <h6 className="text-sm font-semibold mb-2">
            Select Service Modes <span className="text-red-500">*</span>
          </h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              className={`cursor-pointer w-full text-xs font-medium text-center border rounded-md py-2.5 transition-all duration-200 ${
                isModeSelected(ServiceMode.ONLINE)
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
              onClick={() => toggleMode(ServiceMode.ONLINE)}
            >
              Online
            </button>

            <button
              type="button"
              className={`cursor-pointer w-full text-xs font-medium text-center border rounded-md py-2.5 transition-all duration-200 ${
                isModeSelected(ServiceMode.OFFLINE)
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
              onClick={() => toggleMode(ServiceMode.OFFLINE)}
            >
              Offline
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AvailabilityDataSelectionFields;
