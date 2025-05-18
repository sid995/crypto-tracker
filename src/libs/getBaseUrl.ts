import { headers } from 'next/headers'

export async function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

  const host = (await headers()).get('host')
  return host?.startsWith('http') ? host : `http://${host}`
}