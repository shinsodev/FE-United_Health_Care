import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

// GET: Fetch all specialties
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_USER}/users/my-info`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Unable to get information user' }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error while getting information user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

