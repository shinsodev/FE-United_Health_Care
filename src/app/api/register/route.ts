
import { NextResponse } from 'next/server';

// POST: Create a new specialty
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_USER}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log(res)
    if (!res.ok) {
      return NextResponse.json({ error: 'Unable to register patient' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error while register patient  specialty:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}