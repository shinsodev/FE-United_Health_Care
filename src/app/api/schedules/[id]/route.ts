import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Make sure id is a string, not a Promise
    if (!params || !params.id) {
      return NextResponse.json(
        { error: "Doctor ID is required" },
        { status: 400 }
      );
    }

    const id = params.id;

    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://appointment-service-e6za.onrender.com";
    const apiUrl = `${API_BASE_URL}/api/v1/doctor-schedules/doctor/${id}`;

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!res.ok) {
      return NextResponse.json(
        { data: { items: [] } }, // Return empty items instead of error
        { status: 200 } // Return 200 to avoid breaking the frontend
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching doctor schedules:`, error);
    return NextResponse.json(
      { data: { items: [] } }, // Return empty items on error
      { status: 200 } // Return 200 to avoid breaking the frontend
    );
  }
}
