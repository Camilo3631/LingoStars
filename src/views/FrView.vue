<template>
    <section class="p-4 sm:p-6 md:p-9 w-full mx-w-[340px] sm:mx-w-md md:max-w-lg mx-auto text-center space-y-6 rounded-lg text-white bg-slate-600 mt-16">
      <HeaderRoute/>

      <LivesDisplay :lives="lives"/>

      <!-- Mostrar nivel solo si hay -->

    <!--- <LevelDisplay v-if="currentLevel.name" :levelName="currentLevel.name" /> -->


      <SentenceInput
        v-if="currentLevel.sentences.length > 0"
        :sentence="currentSentence"
        v-model="userAnswer"
        :disabled="lives === 0"
        @submit="checkAnswer"
       />

        <Feedback :result="optionResult" :feedback="feedback"/>

  
      <OptionsReference v-if="currentSentence.options.length > 0" :options="shuffledOptions" />

    </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { levelsByLanguage } from '@/data/levels';

import SentenceInput from '@/components/SentenceInput.vue';
import HeaderRoute from '@/components/HeaderRoute.vue';
import OptionsReference from '@/components/OptionsReference.vue';
import LivesDisplay from '@/components/LivesDisplay.vue';
import Feedback from '@/components/Feedback.vue';


// --- Estado base ---
const currentLanguage = ref('fr')
const LevelIndex = ref(0)
const sentenceIndex = ref(0)
const lives = ref(3)
const currentStreak = ref(0)

const userAnswer = ref('')
const optionResult = ref('')
const feedback = ref('')

// --- Levels por idioma ---
const levels = computed(() => levelsByLanguage[currentLanguage.value] || [])

// --- Nivel actual (vacío si se termina el juego) ---
const currentLevel = computed(() => {
  if (LevelIndex.value < 0 || LevelIndex.value >= levels.value.length) {
     return { name: '', sentences: [] }
  } 
  return levels.value[LevelIndex.value]
})

// --- Frase actual ---
const currentSentence = computed(() => 
  currentLevel.value.sentences[sentenceIndex.value] || { full: '', missing: '', options: [] }
)

// --- Opciones mezcladas ---
const shuffledOptions = computed(() => 
    [...currentSentence.value.options].sort(() => Math.random() -0.5)
)

// --- Comprobar respuesta ---
const checkAnswer = () => {
    if (lives.value === 0 || !currentSentence.value.missing) return

    const answer = userAnswer.value.trim().toLowerCase()
    const correct = currentSentence.value.missing.toLowerCase()

    if (answer === correct) {
        optionResult.value = 'correct'
        currentStreak.value++
        feedback.value = '|Correcto! ✅'
     } else {
      optionResult.value = 'wrong'
      lives.value--
      currentStreak.value = 0
      feedback.value = 'Incorrecto ❌'
     }


    setTimeout(nextSentence, 1000)
}

// --- Pasar frase o nivel ---
const nextSentence = () => {
    if (sentenceIndex.value < currentLevel.value.sentences.length - 1) {
       sentenceIndex.value++
       optionResult.value = ''
       feedback.value = ''   
    } else if (LevelIndex.value < levels.value.length - 1) {
      LevelIndex.value++
      sentenceIndex.value = 0
      lives.value++
      feedback.value = ''
      optionResult.value = ''
    } else {
      // Último nivel completado
      LevelIndex.value = -1
      sentenceIndex.value = 0
      optionResult.value = ''
      feedback.value = '!Has completado todos los niveles!  🏆'
    }

    userAnswer.value = ''
}

// --- Watchers ---
watch(lives, (v) => {
  if (v === 0) feedback.value = 'Game Over ❌'
})

watch(currentStreak, (v) => {
  if (v > 0 && v % 5 === 0) lives.value++
})

</script>
