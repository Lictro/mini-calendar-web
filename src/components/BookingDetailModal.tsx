'use client';

import React from 'react';
import Button from './ui/Button';
import { TrashIcon } from '@phosphor-icons/react';

type Booking = {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
};

type Props = {
  booking: Booking | null;
  onClose: () => void;
  onDelete: (id: number) => void;
};

export default function BookingDetailModal({ booking, onClose, onDelete }: Props) {
  if (!booking) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1E1F20] text-[#E8EAED] rounded-2xl p-8 w-full max-w-md shadow-2xl border border-[#2A2B2D]"
      >
        {/* TITLE */}
        <h2 className="text-2xl font-semibold mb-6 text-[#FAFAFA]">Booking Details</h2>

        {/* CONTENT */}
        <div className="space-y-5 text-base">
          <div className="flex gap-1">
            <p className="text-[#9AA0A6] text-lg mb-1">Title:</p>
            <p className="font-medium text-lg">{booking.title}</p>
          </div>

          <div className="flex gap-1">
            <p className="text-[#9AA0A6] text-lg mb-1">Start:</p>
            <p className="text-lg">{new Date(booking.startTime).toLocaleString()}</p>
          </div>

          <div className="flex gap-1">
            <p className="text-[#9AA0A6] text-lg mb-1">End:</p>
            <p className="text-lg">{new Date(booking.endTime).toLocaleString()}</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-10">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>

          <Button variant="danger" onClick={() => onDelete(booking.id)}>
            <TrashIcon size={20} />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
