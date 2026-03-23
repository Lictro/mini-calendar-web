'use client';

import { GoogleLogoIcon } from '@phosphor-icons/react';
import Button from './ui/Button';

export default function LoginButton() {
  // Handle Google OAuth login
  const handleLogin = () => {
    const redirectUri = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`;

    const googleAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `response_type=code` +
      `&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}` +
      `&scope=openid profile email https://www.googleapis.com/auth/calendar.readonly` +
      `&redirect_uri=${redirectUri}` +
      `&access_type=offline` +
      `&prompt=consent`;

    window.location.href = googleAuthUrl;
  };

  return (
    <Button onClick={handleLogin} className="rounded-full px-7 py-3 text-base mt-2">
      <GoogleLogoIcon size={20} weight="bold" />
      Continue with Google
    </Button>
  );
}
