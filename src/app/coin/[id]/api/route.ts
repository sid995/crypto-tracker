import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_COINCAP_REST_ROUTE}/assets/${id}`, {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_COINCAP_KEY}`
    }
  });
  const data = await response.json();
  return NextResponse.json({ data })
}