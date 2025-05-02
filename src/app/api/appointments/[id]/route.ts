// app/api/appointments/[id]/route.ts
export async function PATCH(request: Request, { params }: any) {
    const { id } = params;
    const url = new URL(request.url);
    const status = url.searchParams.get("status");

    if (!status) {
        return new Response(JSON.stringify({ error: "Missing status query parameter" }), { status: 400 });
    }

    try {
        const res = await fetch(`https://appointment-service-e6za.onrender.com/api/v1/appointments/${id}?status=${status}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        if (!res.ok) {
            return new Response(JSON.stringify({ error: data }), { status: res.status });
        }

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message || "Unknown error" }), { status: 500 });
    }
}
