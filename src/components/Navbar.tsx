'use client';

import { CalendarPlusIcon, SignOutIcon } from '@phosphor-icons/react';
import Button from './ui/Button';

export default function Navbar({ onAdd, onLogout }: { onAdd: () => void; onLogout: () => void }) {
  return (
    <div className="h-16 flex items-center justify-between px-6 bg-[#1B1B1B] border-b border-[#2A2A2A]">
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-semibold text-[#FAFAFA]">Mini Calendar</h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <Button onClick={onAdd}>
          <CalendarPlusIcon size={20} />
          Add Booking
        </Button>

        <Button onClick={onLogout}>
          <SignOutIcon size={20} />
          Logout
        </Button>
      </div>
    </div>
  );
}
