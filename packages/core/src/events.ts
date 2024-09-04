export interface CalendarEvent {
  id: string;
  name: string;
  date: Date;
  metadata?: Record<string, any>;
}
