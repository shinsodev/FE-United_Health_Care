// import { NextResponse } from 'next/server';

// const API_URL = 'https://appointment-service-e6za.onrender.com';

// // PUT: Update an existing specialty by ID
// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     const body = await req.json();
//     const res = await fetch(`${API_URL}/specialties/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
//       body: JSON.stringify(body),
//     });

//     if (!res.ok) {
//       const text = await res.text(); // Get raw response for debugging
//       console.error(`PUT ${API_URL}/specialties/${id} failed with status ${res.status}: ${text}`);
//       return NextResponse.json({ error: 'Unable to update specialty' }, { status: res.status });
//     }

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('Error while updating specialty:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

// // DELETE: Delete a specialty by ID
// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     const res = await fetch(`${API_URL}/specialties/${id}`, {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
//     });

//     if (!res.ok) {
//       const text = await res.text(); // Get raw response for debugging
//       console.error(`DELETE ${API_URL}/specialties/${id} failed with status ${res.status}: ${text}`);
//       return NextResponse.json({ error: 'Unable to delete specialty' }, { status: res.status });
//     }

//     return NextResponse.json({ message: 'Specialty deleted successfully' });
//   } catch (error) {
//     console.error('Error while deleting specialty:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
