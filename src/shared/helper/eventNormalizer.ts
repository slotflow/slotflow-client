export const normalizeGoogleEvents = (googleEvents: any[]) => {
    return googleEvents.map((event) => {
        const rawStart = event.start?.dateTime || event.start?.date;
        const rawEnd = event.end?.dateTime || event.end?.date;
        const start = rawStart
            ? new Date(rawStart).toISOString().split(".")[0]
            : undefined;

        const end = rawEnd
            ? new Date(rawEnd).toISOString().split(".")[0]
            : undefined;

        return {
            ...event,
            start,
            end,
        };
    });
};
