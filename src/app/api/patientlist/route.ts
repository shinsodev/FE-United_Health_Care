import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  // Extract page and size from query parameters
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "0";
  const size = searchParams.get("size") || "10";


  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL_USER}/users/all-patients?page=${page}&size=${size}`;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: { Authorization: `Bearer ${session.token}` },
    });
    if (!res.ok) {
      return NextResponse.json(
        {
          status: res.status,
          message: "Failed to fetch patient list",
          error: `API responded with status: ${res.status}`,
        },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching patient list:", error);

    return NextResponse.json(
      {
        status: 500,
        message: "Error fetching patient list",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
