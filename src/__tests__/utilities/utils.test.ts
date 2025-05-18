import { formatPrice, formatLargeNumber, formatPercentage } from '@/utilities/utils';

describe('Utility Functions', () => {
  describe('formatPrice', () => {
    const testCases = [
      { input: '1234.56', expected: '$1,234.56', description: 'standard price' },
      { input: '0.0000345', expected: '$0.000035', description: 'very small price' },
      { input: '1000000', expected: '$1,000,000.00', description: 'large price' },
      { input: '0', expected: '$0.00', description: 'zero' },
      { input: '0.00000001', expected: '$0.000000', description: 'extremely small price' },
    ];

    testCases.forEach(({ input, expected, description }) => {
      test(`formats ${description} correctly`, () => {
        expect(formatPrice(input)).toBe(expected);
      });
    });

    test('handles invalid input gracefully', () => {
      expect(formatPrice('invalid')).toBe('$NaN');
      expect(formatPrice('')).toBe('$NaN');
      expect(formatPrice(undefined as unknown as string)).toBe('$NaN');
      expect(formatPrice(null as unknown as string)).toBe('$NaN');
    });

    test('respects maxDecimals parameter', () => {
      expect(formatPrice('1234.5678', 4)).toBe('$1,234.5678');
    });
  });

  describe('formatLargeNumber', () => {
    const testCases = [
      { input: '1234567890123', expected: '1.23T', description: 'trillions' },
      { input: '1234567890', expected: '1.23B', description: 'billions' },
      { input: '1234567', expected: '1.23M', description: 'millions' },
      { input: '12345', expected: '12.35K', description: 'thousands' },
      { input: '123', expected: '123.00', description: 'small number' },
    ];

    testCases.forEach(({ input, expected, description }) => {
      test(`formats ${description} correctly`, () => {
        expect(formatLargeNumber(input)).toBe(expected);
      });
    });

    test('handles invalid input', () => {
      expect(formatLargeNumber('invalid')).toBe('NaN');
      expect(formatLargeNumber('')).toBe('NaN');
      expect(formatLargeNumber(undefined as unknown as string)).toBe('NaN');
      expect(formatLargeNumber(null as unknown as string)).toBe('NaN');
    });
  });

  describe('formatPercentage', () => {
    const testCases = [
      { input: '5.6789', expected: '+5.68%', description: 'positive percentage' },
      { input: '-3.456', expected: '-3.46%', description: 'negative percentage' },
      { input: '0', expected: '+0.00%', description: 'zero' },
      { input: '0.001', expected: '+0.00%', description: 'small positive' },
      { input: '-0.001', expected: '-0.00%', description: 'small negative' },
    ];

    testCases.forEach(({ input, expected, description }) => {
      test(`formats ${description} correctly`, () => {
        expect(formatPercentage(input)).toBe(expected);
      });
    });

    test('handles invalid input', () => {
      expect(formatPercentage('invalid')).toBe('NaN%');
      expect(formatPercentage('')).toBe('NaN%');
      expect(formatPercentage(undefined as unknown as string)).toBe('NaN%');
      expect(formatPercentage(null as unknown as string)).toBe('NaN%');
    });
  });
});