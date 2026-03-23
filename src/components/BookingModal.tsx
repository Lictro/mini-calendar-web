'use client';

import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import Button from './ui/Button';
import 'react-datepicker/dist/react-datepicker.css';

interface BookingModalProps {
  onClose: () => void;
  onBookingAdded: () => void;
}

export default function BookingModal({ onClose, onBookingAdded }: BookingModalProps) {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!startTime || !endTime) {
      setError('Start time and end time are required.');
      return;
    }

    if (startTime > endTime) {
      setError('Start Time cannot be after End Time.');
      return;
    }

    setLoading(true);

    try {
      // Send booking data to the backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        }),
      });

      // Handle response
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Error adding booking');
      } else {
        setTitle('');
        onBookingAdded();
        onClose();
      }
    } catch (err) {
      console.error(err);
      setError('Error adding booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-[#1E1F20] text-[#FAFAFA] p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-5">Add Booking</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TITLE INPUT */}
          <input
            type="text"
            placeholder="Title"
            className="w-full p-3 rounded-lg bg-[#292A2C] text-[#FAFAFA] placeholder-[#7B7B7B] focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* DATE PICKERS FOR TIMES */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <ReactDatePicker
                placeholderText="Start Time"
                selected={startTime}
                onChange={(date: Date | null) => setStartTime(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full p-3 rounded-lg bg-[#292A2C] text-[#FAFAFA] placeholder-[#7B7B7B] focus:outline-none"
              />
            </div>
            <div className="w-1/2">
              <ReactDatePicker
                placeholderText="End Time"
                selected={endTime}
                onChange={(date: Date | null) => setEndTime(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full p-3 rounded-lg bg-[#292A2C] text-[#FAFAFA] placeholder-[#7B7B7B] focus:outline-none"
              />
            </div>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-400 px-3 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="solid" type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Booking'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
