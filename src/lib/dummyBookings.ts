import { Booking } from '@/app/types/booking';

export const bookings: Booking[] = [
  {
    id: 1,
    title: 'Tennis Training',
    start: new Date(2026, 2, 23, 10, 0),
    end: new Date(2026, 2, 23, 11, 0),
  },
  {
    id: 2,
    title: 'Project Meeting',
    start: new Date(2026, 2, 24, 14, 0),
    end: new Date(2026, 2, 24, 15, 30),
  },
];
