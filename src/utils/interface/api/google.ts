import { GoogleCalendarEvent } from "../commonInterface";

export type BookingFetchingFromCalendar = Array<Pick<GoogleCalendarEvent, "id" | "summary" | "description" | "start" | "end" | "creator" | "organizer" | "iCalUID" | "reminders" | "eventType" | "extendedProperties"> >;