<template>
    <p class="text-xl mt-2 text-center">
      <span v-if="result === 'correct'" class="text-green-500">✔️ Correct</span>
      <span v-if="result === 'wrong'" class="text-red-500">❌ Wrong</span>
      <span v-if="feedback && result === ''" class="text-yellow-300">{{ feedback }}</span>
    </p> 
</template>

<script setup>
  const props = defineProps({
    result: String,
    feedback: String
  })
</script>
