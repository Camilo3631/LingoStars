<template>
  <section class="p-4 sm:p-6 md:p-9 w-full max-w-[340px] sm:max-w-md md:max-w-lg mx-auto text-center space-y-6 rounded-lg text-white bg-slate-600 mt-16">
      
  <!-- Header con mascota -->
  <HeaderRoute :gameOver="isGameOver || gameWon" @resetGame="resetGame" />
    

    <!-- Vidas -->
    <LivesDisplay :lives="lives" />

    <!-- Frase actual -->
    <SentenceInput
      v-if="!gameWon && currentLevel.sentences.length > 0"
      :sentence="currentSentence"
      v-model="userAnswer"
      :disabled="lives === 0 || gameWon"
      @submit="checkAnswer"
    />

    <!-- Feedback -->
    <Feedback
      :result="gameWon ? '' : optionResult"
      :feedback="feedback"
    />

    <!-- Opciones -->
    <OptionsReference
      v-if="!gameWon && currentSentence.options.length > 0"
      :options="shuffledOptions"
    />

    <!-- Descarga del trofeo solo si ganaste -->
    <a
      v-if="gameWon"
      :href="trophyUrl"
      download="Trofeo_es.png"
      class="block mt-4 text-yellow-400 hover:text-yellow-200 no-underline"
    >
      📥 Descargar Trofeo
    </a>

  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { levelsByLanguage } from '../data/levels.js'

import HeaderRoute from '@/components/HeaderRoute.vue'
import LivesDisplay from '@/components/LivesDisplay.vue'
import SentenceInput from '@/components/SentenceInput.vue'
import Feedback from '@/components/Feedback.vue'
import OptionsReference from '@/components/OptionsReference.vue'

// --- Estado base ---
const currentLanguage = ref('es')
const STORAGE_KEY = `gameProgress_${currentLanguage.value}`

const MAX_LIVES = 12

const LevelIndex = ref(0)
const sentenceIndex = ref(0)
const lives = ref(3)
const currentStreak = ref(0)

const userAnswer = ref('')
const optionResult = ref('')
const feedback = ref('')
const isGameOver = ref(false)
const gameWon = ref(false)

// --- Imagen del trofeo ---
import trophyImg from '@/assets/Trofeo_es.png'
const trophyUrl = trophyImg

// --- Levels por idioma ---
const levels = computed(() => levelsByLanguage[currentLanguage.value] || [])

// --- Nivel actual ---
const currentLevel = computed(() => levels.value[LevelIndex.value] || { name: '', sentences: [] })

// --- Frase actual ---
const currentSentence = computed(() =>
  currentLevel.value.sentences[sentenceIndex.value] || { full: '', missing: '', options: [] }
)

// --- Opciones mezcladas ---
const shuffledOptions = computed(() =>
  [...currentSentence.value.options].sort(() => Math.random() - 0.5)
)

const addLife = () => {
   if (lives.value < MAX_LIVES) {
    lives.value++
   }
}

// --- Guardar y leer progreso ---
const saveProgress = () => {
  const progress =  {
      LevelIndex: LevelIndex.value,
      sentenceIndex: sentenceIndex.value,
      lives: lives.value,
      currentStreak: currentStreak.value
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

const readProgress = () => {
   const progress = JSON.parse(localStorage.getItem(STORAGE_KEY))
   if (progress) {
         LevelIndex.value = progress.LevelIndex
         sentenceIndex.value = progress.sentenceIndex
         lives.value = Math.min(progress.lives, MAX_LIVES)
         currentStreak.value = progress.currentStreak
   }
}

// --- Comprobar respuesta ---
const  checkAnswer = () => {
  if (isGameOver.value || gameWon.value || !currentSentence.value.missing) return

  const answer = userAnswer.value.trim().toLowerCase()
  const correct = currentSentence.value.missing.toLowerCase()

  if (answer === correct) {
    optionResult.value = 'correct'
    currentStreak.value++
    feedback.value = '¡Correcto! ✅'
  } else {
    optionResult.value = 'wrong'
    currentStreak.value = 0
    lives.value--

    if (lives.value === 0) {
      optionResult.value = ''
      feedback.value = 'Game Over ❌'
      isGameOver.value = true
      saveProgress() // guarda progreso final al perder
      return
    }

    feedback.value = 'Incorrecto ❌'
  }

  saveProgress()

  setTimeout(() => {
    if (!isGameOver.value && !gameWon.value) nextSentence()
  }, 1000)
}

// --- Pasar frase o nivel ---
const  nextSentence = () =>  {
  if (isGameOver.value || gameWon.value) return

  if (sentenceIndex.value < currentLevel.value.sentences.length - 1) {
    sentenceIndex.value++
  } else if (LevelIndex.value < levels.value.length - 1) {
    LevelIndex.value++
    sentenceIndex.value = 0
    addLife()
  } else {
    feedback.value = '¡Has completado todos los niveles! 🏆'
    gameWon.value = true
    return
  }

  userAnswer.value = ''
  optionResult.value = ''
  feedback.value = ''

  saveProgress()
}

// --- Reset del juego ---
const resetGame = () => {
  if (gameWon.value) {
    // Solo al tocar la mascota después de ganar
    localStorage.removeItem(STORAGE_KEY)
    LevelIndex.value = 0
    sentenceIndex.value = 0
    lives.value = 3
    currentStreak.value = 0
    userAnswer.value = ''
    optionResult.value = ''
    feedback.value = ''
    isGameOver.value = false
    gameWon.value = false
  } else if (isGameOver.value) {
    // Reinicio al perder, mantiene progreso
    LevelIndex.value = 0
    sentenceIndex.value = 0
    lives.value = 3
    currentStreak.value = 0
    userAnswer.value = ''
    optionResult.value = ''
    feedback.value = ''
    isGameOver.value = false
    saveProgress()
  }
}

// --- Watchers ---
watch(currentStreak, (v) => {
  if (v > 0 && v % 5 === 0) {
    addLife()
  }
  saveProgress()
})

// --- Cargar progreso al iniciar ---
onMounted(() => {
   readProgress()
   if (lives.value <= 0) {
    feedback.value = 'Game Over ❌'
    isGameOver.value = true
   }
})
</script>
