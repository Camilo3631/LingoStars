<template>
  <p class="text-lg sm:text-2xl md:text-3xl text-center max-auto">
    <span v-for="n in lives" :key="n" class="text-red-500">❤️</span>
  </p>
</template>

<script setup>

const props = defineProps({ lives: Number });

</script>