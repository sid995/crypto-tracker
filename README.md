# Crypto Tracker

A responsive, server-rendered cryptocurrency tracking application built with Next.js, TypeScript, Redux, and TailwindCSS.

## Features

- Server-side rendering for better performance and SEO
- Responsive design for desktop and mobile devices
- Real-time price updates using the CoinCap API
- Top 20 cryptocurrencies listed by market cap
- Detailed coin pages with key statistics
- Price ticker that updates every few seconds

## Technology Stack

- **Framework**: Next.js 15.3.2 with TypeScript
- **Styling**: TailwindCSS
- **State Management**: Redux (with Redux Toolkit)
- **Data Source**: CoinCap API

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

To build the application for production, run:

```bash
npm run build
npm start
```

## Implementation Details

- Uses Next.js App Router for server-side rendering
- Implements real-time updates with `setInterval()` to simulate Server-Sent Events
- Redux store with slices for managing cryptocurrency data
- Responsive UI with TailwindCSS
- Reusable components for crypto cards, price tickers, etc.
