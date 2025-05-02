import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Extract page and size from query parameters
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const size = searchParams.get("size") || "10";

  try {
    const apiUrl = `https://appointment-service-e6za.onrender.com/api/v1/doctors?page=${page}&size=${size}`;

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // Ensure fresh data on each request
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          status: res.status,
          message: "Failed to fetch doctors list",
          error: `API responded with status: ${res.status}`,
        },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching doctors list:", error);

    // Return error response without fallback data
    return NextResponse.json(
      {
        status: 500,
        message: "Error fetching doctors list",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
