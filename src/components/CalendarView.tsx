'use client';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import BookingDetailModal from './BookingDetailModal';

const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type CalendarBooking = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  startTime: string;
  endTime: string;
};

export default function CalendarView({
  bookings,
  refreshBookings,
}: {
  bookings: any[];
  refreshBookings: () => void;
}) {
  const [selectedBooking, setSelectedBooking] = useState<CalendarBooking | null>(null);

  // Map backend bookings to calendar events
  const events: CalendarBooking[] = bookings.map((b) => ({
    id: b.id,
    title: b.title,
    start: new Date(b.startTime),
    end: new Date(b.endTime),
    startTime: b.startTime,
    endTime: b.endTime,
  }));

  // Delete booking function
  async function deleteBooking(id: number) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    setSelectedBooking(null);
    refreshBookings();
  }

  return (
    <div className="h-[calc(100vh-64px)] p-4 bg-[#131314]">
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        views={['week']}
        selectable
        dayLayoutAlgorithm="no-overlap"
        style={{ height: '100%' }}
        formats={{
          eventTimeRangeFormat: () => '', // Hide time range in event display
        }}
        onSelectEvent={
          (event) => setSelectedBooking(event as CalendarBooking) // Set selected booking for modal
        }
      />

      <BookingDetailModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onDelete={deleteBooking}
      />
    </div>
  );
}
