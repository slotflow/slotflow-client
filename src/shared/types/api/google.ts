import { GoogleCalendarEvent } from '../common';

// response type of fetching appointments from google calendar
export type BookingFetchingFromCalendar = Array<
  Pick<
    GoogleCalendarEvent,
    | 'id'
    | 'summary'
    | 'description'
    | 'start'
    | 'end'
    | 'creator'
    | 'organizer'
    | 'iCalUID'
    | 'reminders'
    | 'eventType'
    | 'extendedProperties'
  >
>;
