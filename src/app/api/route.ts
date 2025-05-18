import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_COINCAP_REST_ROUTE}/assets?limit=20`, {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_COINCAP_KEY}`,
    },
    cache: 'no-store',
    next: {
      revalidate: 0
    }
  })
  const data = await res.json()
  return NextResponse.json({ data })
}