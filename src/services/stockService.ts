import { useStockStore } from '@/stores/stockStore';
import mockData from '@/assets/mockData';

export const fetchStocks = async () => {
  const store = useStockStore();

  store.setStatus('loading');

  try {
    // Simulating API delay with mock data
    await new Promise(resolve => setTimeout(resolve, 1000));
    const stocks = mockData.stocks.sort((a, b) => a.companyName.localeCompare(b.companyName));;

    store.setStocks(stocks);
    store.setStatus('success');
  } catch (error) {
    store.setError(error instanceof Error ? error.message : 'Failed to fetch stocks');
    store.setStatus('failed');
  }
};
