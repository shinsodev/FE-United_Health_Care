import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } } // Destructure params correctly
) {
  const id = params.id; // Access params.id
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL_USER}/users/delete/${id}`;

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const res = await fetch(apiUrl, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${session.token}`, },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to delete user with ID ${id}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL_USER}/users/${id}`;

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ code: 404, message: "User not found" }, { status: 404 });
      }
      return NextResponse.json(
        { error: `Failed to fetch user with ID ${id}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}