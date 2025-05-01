export async function GET() {
    const res = await fetch("https://appointment-service-e6za.onrender.com/appointments");
    const data = await res.json();

    return Response.json(data);
}
