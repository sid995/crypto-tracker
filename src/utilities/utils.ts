/**
 * Format a USD price with the appropriate number of decimal places
 * @param priceString The price as a string
 * @param maxDecimals Maximum number of decimal places to show
 * @returns Formatted price string
 */
export const formatPrice = (priceString: string, maxDecimals = 2): string => {
  const price = parseFloat(priceString);

  // For very small values (less than $0.01), show more decimal places
  if (price < 0.01 && price > 0) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 6,
      maximumFractionDigits: 6
    }).format(price);
  }

  // For normal values
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: maxDecimals
  }).format(price);
};

/**
 * Format a large number with abbreviations (K, M, B, T)
 * @param valueString The value as a string
 * @returns Formatted value with abbreviation
 */
export const formatLargeNumber = (valueString: string): string => {
  const value = parseFloat(valueString);

  if (value >= 1e12) {
    return (value / 1e12).toFixed(2) + 'T';
  }
  if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B';
  }
  if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + 'M';
  }
  if (value >= 1e3) {
    return (value / 1e3).toFixed(2) + 'K';
  }

  return value.toFixed(2);
};

/**
 * Format percentage change
 * @param percentString The percentage as a string
 * @returns Formatted percentage with sign
 */
export const formatPercentage = (percentString: string): string => {
  const percent = parseFloat(percentString);
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
}; 