# Crypto Tracker

A real-time cryptocurrency tracking application built with Next.js, Redux Toolkit, and Tailwind CSS. The application provides live updates of cryptocurrency prices, market caps, and other key metrics with a beautiful, responsive UI that supports both light and dark modes.

## Features

- Real-time cryptocurrency price updates (5-second intervals)
- Price change animations (green/red flashing on price updates)
- Sorting by various metrics (price, volume, change %)
- Filtering by name or symbol
- Detailed view for individual cryptocurrencies
- Responsive design with mobile support
- Dark/Light mode with system preference detection and persistence
- Server-side rendering for better SEO and initial load performance

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A CoinCap API key (get one from [CoinCap](https://coincap.io/))

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:sid995/crypto-tracker.git
   cd crypto-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```env
   NEXT_PUBLIC_COINCAP_REST_ROUTE=https://rest.coincap.io/v3
   NEXT_PUBLIC_COINCAP_KEY=
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture/Approach

### Tech Stack

- **Next.js 15**: For server-side rendering and routing
- **Redux Toolkit**: For state management with RTK Query
- **Tailwind CSS**: For styling and dark mode support
- **TypeScript**: For type safety and better developer experience

### Key Components

1. **State Management**

   - Uses Redux Toolkit's Entity Adapter for normalized state
   - Real-time updates handled through polling
   - Optimistic updates for better UX

2. **Theme Management**

   - Client-side theme detection and persistence
   - System preference detection
   - Hydration-safe implementation

3. **Data Flow**

   - Server-side initial data fetch
   - Client-side polling for updates
   - Optimistic UI updates for price changes

4. **Component Structure**
   ```
   src/
   ├── app/            # Next.js app router pages
   ├── components/     # Reusable components
   ├── store/          # Redux store and slices
   ├── libs/           # Utility functions
   └── utilities/      # Helper functions and types
   ```

### Features Implementation

1. **Real-time Updates**

   - Uses interval-based polling (5s)
   - Price change animations for visual feedback
   - Optimistic updates for better UX

2. **Sorting and Filtering**

   - Client-side implementation for instant feedback
   - Memoized selectors for performance
   - Multiple sort fields support

3. **Theme Toggle**
   - Persisted preferences in localStorage
   - System preference detection
   - Hydration-safe implementation

## Assumptions and Trade-offs

### Assumptions

1. **API Reliability**

   - CoinCap API is assumed to be reliable and maintain consistent data structure
   - Rate limits are assumed to be sufficient for 5s polling
   - Warning: API response for basic plan doesn't have updated data everytime api is called. The correct data is provided after every 6-8 api calls(30-40s).

2. **User Experience**

   - Users prefer real-time updates over reduced data usage
   - Dark mode preference should persist across sessions

3. **Browser Support**
   - Modern browser features are available (localStorage, matchMedia)
   - JavaScript is enabled

### Trade-offs

1. **Polling vs WebSocket**

   - Chose polling for simplicity and reliability
   - Trade-off: Higher server load vs implementation complexity
   - Note: Polling is used in this project as websocket is not available in basic plan.

2. **Client-side Sorting/Filtering**

   - Implemented on client for instant feedback
   - Trade-off: Memory usage vs server load

3. **Theme Implementation**

   - Used class-based approach over CSS variables
   - Trade-off: Flexibility vs simplicity

4. **Data Freshness**

   - 5-second polling interval
   - Trade-off: Data freshness vs API rate limits

5. **Bundle Size**
   - Included full Redux toolkit
   - Trade-off: Bundle size vs development speed

## Future Improvements

1. **Performance**

   - Implement virtual scrolling for large lists
   - Add WebSocket support for real-time updates
   - Optimize bundle size

2. **Features**

   - Add portfolio tracking
   - Implement price alerts
   - Add more detailed charts and analytics
   - Add more sorting/filtering options

3. **User Experience**
   - Add more animation and transitions
   - Implement skeleton loading states
   - Add error boundaries and fallbacks

## Testing

Run the test suite:

```bash
npm run test
```

The project includes:

- Unit tests for utilities and components
- Integration tests for data flow
- Snapshot tests for UI components

## License

MIT
