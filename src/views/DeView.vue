<template>
   <section class="p-4 max-w-lg mx-auto text-center space-y-6 rounded-lg text-white bg-slate-600 mt-8 border border-slate-500 shadow-lg">
  <HeaderRoute/>

     <LivesDisplay :lives="lives"/>

    <OptionsReference :options="shuffledOptions" />
  </section>
</template>


<script setup>
import { ref, computed } from 'vue'

const currentSentence = ref({
  options: ['in', 'on', 'under']
})


const currentLanguage = ref('de')

const shuffledOptions = computed(() => 
   currentSentence.value.options.slice().sort(() => Math.random() - 0.5)
)
import HeaderRoute from '@/components/HeaderRoute.vue';
import OptionsReference from '@/components/OptionsReference.vue';
import LivesDisplay from '@/components/LivesDisplay.vue'

const lives = ref(3)

</script>


