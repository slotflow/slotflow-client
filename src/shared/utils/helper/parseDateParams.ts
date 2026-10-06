import { parse } from 'date-fns';
import { tz } from '@date-fns/tz';

export const parseDateParam = (
    value: string | null,
    timeZone: string
): Date | undefined => {

    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return undefined;
    }

    try {
        const parsedDate = parse(value, 'yyyy-MM-dd', new Date(), {
            in: tz(timeZone),
        });

        if (isNaN(parsedDate.getTime())) {
            return undefined;
        }

        return parsedDate;
    } catch {
        return undefined;
    }
};