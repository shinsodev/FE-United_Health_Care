import { NextRequest, NextResponse } from "next/server"

// GET: Fetch all specialties
export async function GET(req: Request) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_USER}/auth/register-google`, {
            method: 'GET',
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Unable to sign up with Google' }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error while sign up with Google:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}