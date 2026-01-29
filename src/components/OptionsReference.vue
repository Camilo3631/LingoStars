<template>
    <div class="flex justify-center mt-2 space-x-3">
      <span v-for="option in options" :key="option"
        class="border px-3 py-1 rounded bg-slate-900 text-white opacity-70 cursor-default">
        {{ option }}
      </span>
    </div>
</template> 


<script setup>
  const props = defineProps({ options: Array})
</script>