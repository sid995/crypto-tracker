import { NextResponse } from 'next/server'

export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_COINCAP_KEY) {
      console.error('API key is not configured');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
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
      console.error(`API responded with status: ${res.status}`);
      return NextResponse.json(
        { error: 'Failed to fetch data from CoinCap API' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}