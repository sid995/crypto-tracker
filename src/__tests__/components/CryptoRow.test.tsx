import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CryptoRow } from '@/components/CryptoRow';
import cryptoReducer from '@/store/features/cryptoSlice';
import { useAppSelector } from '@/store/hooks';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush
  })
}));

const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;

jest.mock('@/store/hooks', () => ({
  useAppSelector: jest.fn()
}));

const mockStore = configureStore({
  reducer: {
    crypto: cryptoReducer
  }
});

describe('CryptoRow', () => {
  const mockAsset = {
    id: 'bitcoin',
    rank: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    supply: '19500000',
    maxSupply: '21000000',
    marketCapUsd: '1200000000000',
    volumeUsd24Hr: '30000000000',
    priceUsd: '60000.00',
    changePercent24Hr: '2.5',
    vwap24Hr: '59500'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppSelector.mockImplementation(() => mockAsset);
  });

  test('renders basic asset information correctly', () => {
    render(
      <Provider store={mockStore}>
        <table>
          <tbody>
            <CryptoRow id="bitcoin" />
          </tbody>
        </table>
      </Provider>
    );

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('formats price and market cap correctly', () => {
    render(
      <Provider store={mockStore}>
        <table>
          <tbody>
            <CryptoRow id="bitcoin" />
          </tbody>
        </table>
      </Provider>
    );

    expect(screen.getByText('$60,000.00')).toBeInTheDocument();

    const marketCapCell = screen.getByText((content, element) => {
      return element?.textContent === '$1.20T';
    });
    expect(marketCapCell).toBeInTheDocument();
  });

  test('displays positive price change in green', () => {
    render(
      <Provider store={mockStore}>
        <table>
          <tbody>
            <CryptoRow id="bitcoin" />
          </tbody>
        </table>
      </Provider>
    );

    const changeElement = screen.getByText('+2.50%');
    expect(changeElement).toHaveClass('text-green-500');
  });

  test('displays negative price change in red', () => {
    const negativeAsset = {
      ...mockAsset,
      changePercent24Hr: '-2.5'
    };
    mockUseAppSelector.mockImplementation(() => negativeAsset);

    render(
      <Provider store={mockStore}>
        <table>
          <tbody>
            <CryptoRow id="bitcoin" />
          </tbody>
        </table>
      </Provider>
    );

    const changeElement = screen.getByText('-2.50%');
    expect(changeElement).toHaveClass('text-red-500');
  });

  test('navigates to detail page when clicked', () => {
    render(
      <Provider store={mockStore}>
        <table>
          <tbody>
            <CryptoRow id="bitcoin" />
          </tbody>
        </table>
      </Provider>
    );

    fireEvent.click(screen.getByText('Bitcoin'));
    expect(mockPush).toHaveBeenCalledWith('/coin/bitcoin');
  });

  test('handles missing asset gracefully', () => {
    mockUseAppSelector.mockImplementation(() => null);

    render(
      <Provider store={mockStore}>
        <table>
          <tbody>
            <CryptoRow id="nonexistent" />
          </tbody>
        </table>
      </Provider>
    );

    expect(screen.queryByText('Bitcoin')).not.toBeInTheDocument();
  });

  test('shows price flash animation on price change', () => {
    const { rerender } = render(
      <Provider store={mockStore}>
        <table>
          <tbody>
            <CryptoRow id="bitcoin" />
          </tbody>
        </table>
      </Provider>
    );

    const updatedAsset = {
      ...mockAsset,
      priceUsd: '61000.00'
    };
    mockUseAppSelector.mockImplementation(() => updatedAsset);

    rerender(
      <Provider store={mockStore}>
        <table>
          <tbody>
            <CryptoRow id="bitcoin" />
          </tbody>
        </table>
      </Provider>
    );

    const row = screen.getByText('Bitcoin').closest('tr');
    expect(row).toHaveClass('bg-green-200');
  });
});
