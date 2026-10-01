import { useState } from 'react';
import { UseTimezoneReturn } from '@/shared/types/hooks';
import { useTimezoneSelect, ITimezone } from 'react-timezone-select';

export const useTimezone = (): UseTimezoneReturn => {
    const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    );

    const { parseTimezone } = useTimezoneSelect({
        labelStyle: 'original',
        displayValue: 'GMT',
    });

    // Extract string value if selectedTimezone is an object or string
    const timezoneString =
        typeof selectedTimezone === 'object' && selectedTimezone !== null
            ? selectedTimezone.value
            : String(selectedTimezone);

    const parsed = parseTimezone(timezoneString);

    return {
        selectedTimezone,
        setSelectedTimezone,
        parsed,
    };
};