import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const apiUrl = `https://appointment-service-e6za.onrender.com/appointments/patient/${id}`;

    try {
        const res = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch data' }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching patient appointments:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
