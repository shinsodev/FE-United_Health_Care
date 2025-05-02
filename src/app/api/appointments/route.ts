export async function GET() {
    const res = await fetch("https://appointment-service-e6za.onrender.com/api/v1/appointments");
    const data = await res.json();

    return Response.json(data);
}
