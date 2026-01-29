<template>
      <section class="p-4 max-w-lg mx-auto text-center space-y-6 rounded-lg text-white bg-slate-600 mt-8 border border-slate-500 shadow-lg">
  <HeaderRoute/>

   <!-- Aquí va el juego -->
     <LivesDisplay :lives="lives"/>

    <OptionsReference :options="shuffledOptions"/>
   </section>
</template>


<script setup>
import { ref, computed } from 'vue'

import HeaderRoute from '@/components/HeaderRoute.vue';
import OptionsReference from '@/components/OptionsReference.vue';
import LivesDisplay from '@/components/LivesDisplay.vue';

// Datos de ejemplo (normalmente los importas desde levels.js)
const currentLanguage = ref('it')

const currentSentence = ref({
  options: ['in', 'on', 'under]']
})

// computed para mezclar options
const shuffledOptions = computed(() => 
   currentSentence.value.options.slice().sort(() => Math.random() - 0.5)
)

const lives = ref(3)

</script>
