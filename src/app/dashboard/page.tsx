'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CalendarView from '@/components/CalendarView';
import BookingModal from '@/components/BookingModal';

export default function Dashboard() {
  const [weekStart, setWeekStart] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from the backend
  async function fetchBookings() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await res.json();
    setBookings(data);
  }

  // Logout function
  async function logout() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    window.location.href = '/';
  }

  // Fetch bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="h-screen">
      <Navbar onAdd={() => setShowModal(true)} onLogout={logout} />

      {/* Calendar view */}
      <CalendarView bookings={bookings} refreshBookings={fetchBookings} />

      {showModal && (
        <BookingModal onClose={() => setShowModal(false)} onBookingAdded={fetchBookings} />
      )}
    </div>
  );
}
