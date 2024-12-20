<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <h1 class="flex grow-0 shrink-0 basis-20 justify-center items-center">Stocks Dashboard</h1>

    <!-- Content -->
    <div class="flex-auto flex flex-col overflow-auto p-10">
      <!-- Loading State -->
      <div v-if="stockStore.isLoading" class="flex justify-center items-center h-full">
        Loading stocks...
      </div>

      <!-- Error State -->
      <div v-else-if="stockStore.hasError" class="flex justify-center items-center h-full text-red-500">
        {{ stockStore.error }}
      </div>

      <!-- Stock List -->
      <template v-else>
        <div class="flex flex-col" v-if="!selectedStock">
          <div class="flex gap-10 mb-6">
            <input placeholder="Search stock" @input="onSearch" :value="query" />
            <select name="stocks" @change="onSelectStock">
              <option value="">Select a stock</option>
              <option v-for="stock in stockStore.getStocks" :value="stock.symbol">{{ stock.companyName }}</option>
            </select>
          </div>
          <div class="flex min-h-12 hover:bg-gray-200 hover:cursor-pointer items-center pl-2" v-for="stock in filteredStocks" :key="stock.symbol" @click="selectStock(stock)">
            <div class="min-w-32">{{ stock.symbol }}</div>
            <div class="min-w-52">{{ stock.companyName }}</div>
            <div class="min-w-32">${{ stock.currentPrice }}</div>
            <div :class="stock.percentageChange >= 0 ? 'text-green-400' : 'text-red-400'">%{{ stock.percentageChange }}</div>
          </div>
        </div>
        <div class="flex flex-col gap-6 h-full w-full" v-if="selectedStock">
          <button class="w-fit" @click="selectStock(null)">Back</button>
          <div class="w-full h-full flex flex-col gap-10">
            <Chart :stock="selectedStock" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { MAX_DISPLAYED, Stock } from "@/types/stock";
  import { useStockStore } from "@/stores/stockStore";
  import { fetchStocks } from "@/services/stockService";
  import Chart from "@/components/Chart.vue";

  const stockStore = useStockStore();
  const selectedStock = ref<Stock | null>(null);
  const query = ref("");

  const filteredStocks = computed(() => (
    stockStore.getStocks
      .filter(stock =>
        stock.companyName.toLowerCase().includes(query.value.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(query.value.toLowerCase())).slice(0, MAX_DISPLAYED)
  ));

  onMounted(async () => {
    await fetchStocks();
  });

  const selectStock = (currStock: Stock) => {
    selectedStock.value = currStock;
  }

  const onSearch = (e: Event) => {
    query.value = (e.target as HTMLInputElement).value;
  }

  const onSelectStock = (e: Event) => {
    const { value } = (e.target as HTMLSelectElement);
    const theStock = stockStore.getStocks.find(s => s.symbol === value);
    if (theStock) {
      selectedStock.value = theStock;
    }
  }
</script>
