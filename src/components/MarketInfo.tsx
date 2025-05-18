import { useAppSelector } from "@/store/hooks";
import { CryptoAsset } from "@/libs/types";
import { formatLargeNumber, formatPercentage } from "@/libs/utils";


export default function MarketInfo() {
  const coin: CryptoAsset | null = useAppSelector((state) => state.crypto.selectedAsset);

  const isPositive = parseFloat(coin?.changePercent24Hr || '0') >= 0;

  if (!coin) {
    return <div></div>;
  }


  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Market Stats</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Market Cap</span>
          <span className="font-medium">${formatLargeNumber(coin.marketCapUsd)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">24h Volume</span>
          <span className="font-medium">${formatLargeNumber(coin.volumeUsd24Hr)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">24h Change</span>
          <span className={`font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {formatPercentage(coin.changePercent24Hr)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Supply</span>
          <span className="font-medium">{formatLargeNumber(coin.supply)} {coin.symbol}</span>
        </div>

        {coin.maxSupply && (
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Max Supply</span>
            <span className="font-medium">{formatLargeNumber(coin.maxSupply)} {coin.symbol}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Rank</span>
          <span className="font-medium">#{coin.rank}</span>
        </div>
      </div>
    </div>
  );
}