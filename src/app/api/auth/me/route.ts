export async function GET(req: Request) {
  const cookie = req.headers.get('cookie') || '';

  const res = await fetch(`http://localhost:8080/auth/me`, {
    headers: { cookie },
    credentials: 'include',
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
