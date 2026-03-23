import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AuthCallback() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (!code) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback?code=${code}`, {
      method: 'GET',
      credentials: 'include',
    }).then(() => {
      router.push('/dashboard');
    });
  }, [code]);

  return <p>Logging in...</p>;
}
