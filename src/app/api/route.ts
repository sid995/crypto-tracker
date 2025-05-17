import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_COINCAP_REST_ROUTE}/assets`, {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_COINCAP_KEY}`
    }
  })
  const data = await res.json()
  return NextResponse.json({ data })
}