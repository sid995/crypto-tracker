import { NextResponse } from 'next/server'

export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_COINCAP_KEY) {
      throw new Error('API key is not configured');
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_COINCAP_REST_ROUTE}/assets?limit=20`, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_COINCAP_KEY}`,
      },
      cache: 'no-store',
      next: {
        revalidate: 0
      }
    });

    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cryptocurrency data' },
      { status: 500 }
    );
  }
}