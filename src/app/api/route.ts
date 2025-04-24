import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login-google`);
    return response
}