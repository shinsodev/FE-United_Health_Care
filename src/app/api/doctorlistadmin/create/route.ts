import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

// POST: Create a new specialty
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const body = await req.json();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_USER}/users/create-doctor`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.token}` },
            body: JSON.stringify(body),
        });
        console.log(res)
        if (!res.ok) {
            return NextResponse.json({ error: 'Unable to create doctor' }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error while creating doctor:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}