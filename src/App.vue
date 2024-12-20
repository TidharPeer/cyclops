<script setup lang="ts">
const route = useRoute()

useHead({
  title: () => route.meta.title || 'CyclopS',
  meta: [
    {
      property: 'og:title',
      content: () => route.meta.title,
    },
    {
      name: 'twitter:title',
      content: () => route.meta.title,
    },
  ],
})
</script>
<template>
  <router-view />
</template>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  main {
    max-width: 100%;
  }

  #app {
    width: 100%;
    height: 100%;
  }

</style>
