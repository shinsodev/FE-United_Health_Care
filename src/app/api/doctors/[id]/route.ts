import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const apiUrl = `https://appointment-service-e6za.onrender.com/api/v1/doctors/${id}`;

  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // Ensure fresh data on each request
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch doctor with ID ${id}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching doctor with ID ${id}:`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
