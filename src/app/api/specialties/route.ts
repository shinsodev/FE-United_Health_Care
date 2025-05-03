// import { NextResponse } from 'next/server';

// const API_URL = 'https://appointment-service-e6za.onrender.com';

// // GET: Fetch all specialties
// export async function GET(req: Request) {
//   const url = `${API_URL}/specialties`;

//   try {
//     const res = await fetch(url, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
//     });

//     if (!res.ok) {
//       return NextResponse.json({ error: 'Unable to fetch the list of specialties' }, { status: res.status });
//     }

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('Error while fetching the list of specialties:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

// // POST: Create a new specialty
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const res = await fetch(`${API_URL}/specialties`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
//       body: JSON.stringify(body),
//     });

//     if (!res.ok) {
//       return NextResponse.json({ error: 'Unable to create specialty' }, { status: res.status });
//     }

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('Error while creating specialty:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
