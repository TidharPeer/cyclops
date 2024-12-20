import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Stock } from '@/types/stock';

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'failed';

export const useStockStore = defineStore('stock', () => {
  // state
  const stocks = ref<Stock[]>([]);
  const status = ref<LoadingStatus>('idle');
  const error = ref<string | null>(null);

  // getters
  const isLoading = computed(() => status.value === 'loading');
  const hasError = computed(() => status.value === 'failed');
  const getStocks = computed(() => stocks.value);

  // actions
  const setStocks = (newStocks: Stock[]) => {
    stocks.value = newStocks;
  };

  const setStatus = (newStatus: LoadingStatus) => {
    status.value = newStatus;
  };

  const setError = (newError: string | null) => {
    error.value = newError;
  };

  return {
    // state
    stocks,
    status,
    error,
    // getters
    isLoading,
    hasError,
    getStocks,
    // actions
    setStocks,
    setStatus,
    setError,
  };
}); 