import Header from '@/components/Header';

export default function CoinDetailLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse">
              </div>
              <div>
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mt-2 animate-pulse"></div>
              </div>
            </div>
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>

          {/* Content skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Price ticker skeleton */}
            <div className="flex flex-col items-center space-y-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow animate-pulse">
              <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>

            {/* Market info skeleton */}
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
              <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>

              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Explorer link skeleton */}
          <div className="mt-6 text-center">
            <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse"></div>
          </div>
        </div>
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
          <p>Data provided by CoinCap API</p>
        </div>
      </footer>
    </div>
  );
}
