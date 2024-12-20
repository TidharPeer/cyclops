<template>
  <div class="h-[calc(100%-5rem)] justify-center">
    <Line :data="chartData" :options="chartOptions" />
  </div>
  <div class="flex flex-col gap-5">
    <div class="flex items-center gap-5">
      <div class="text-lg text-gray-500">
        Volume: <span class="text-gray-700">{{ stock.volume }}</span>
      </div>
      <div class="text-lg text-gray-500">
        High: <span class="text-gray-700">{{ stock.high }}</span>
      </div>
      <div class="text-lg text-gray-500">
        Low: <span class="text-gray-700">{{ stock.low }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Line } from 'vue-chartjs';
  import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
  import { Stock } from '../types/stock';

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const { stock } = defineProps<{
    stock: Stock
  }>();

  const chartData = {
    labels: stock.historicalData.map(data => data.date),
    datasets: [{
      label: `${stock.symbol} - ${stock.companyName}`,
      data: stock.historicalData.map(data => data.price),
      tension: 0.2,
    }]
  };

  const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
  };
</script>
