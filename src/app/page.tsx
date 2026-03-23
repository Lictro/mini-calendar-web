import LoginButton from '@/components/LoginButton';
import './globals.css';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#131314] text-[#E8EAED] flex items-center justify-center px-6">
      <main className="flex flex-col items-center text-center gap-6 max-w-xl">
        {/* TITLE */}
        <h1 className="text-5xl font-semibold text-[#FAFAFA] tracking-tight">Mini Calendar</h1>

        {/* SUBTITLE */}
        <p className="text-lg text-[#9AA0A6] leading-relaxed">
          Plan your time effortlessly and manage bookings without conflicts.
        </p>

        {/* LOGIN BUTTON */}
        <LoginButton />
      </main>
    </div>
  );
}
