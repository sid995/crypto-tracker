import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_COINCAP_REST_ROUTE}/assets/${id}`, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_COINCAP_KEY}`
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch asset data' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (err) {
    console.error('Error fetching asset:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}