<template>
  <div
    class="flex flex-col items-center justify-center w-full h-screen
           bg-gradient-to-br from-blue-500 to-purple-600
           text-white px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12"
  >
    <!-- Contenedor central -->
    <div class="flex flex-col items-center justify-center text-center space-y-6">

      <!-- Mensaje de bienvenida -->
      <transition name="fade" mode="out-in">
        <h1
          :key="'welcome-' + language"
          class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                 font-bold animate-fadeInDown w-full"
        >
          {{ welcomeMessage }}
        </h1>
      </transition>

      <!-- Subtítulo -->
      <transition name="fade" mode="out-in">
        <p
          :key="'subtitle-' + language"
          class="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
                 animate-fadeInUp w-full max-w-3xl"
        >
          {{ subtitleMessage }}
        </p>
      </transition>

      <!-- Banderas -->
      <div class="grid grid-cols-3 gap-6 w-full mt-4 sm:flex sm:flex-wrap sm:justify-center">
        <div
          v-for="lang in languages"
          :key="lang.code"
          @click="goToExercises(lang.code)"
          @mouseenter="hoverLanguage(lang.code)"
          class="cursor-pointer transform transition-transform
                 hover:scale-110 active:scale-125"
        >
          <span
            class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl select-none"
          >
            {{ lang.flag }}
          </span>
        </div>
      </div>

    </div>
  </div>
</template>


<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Mensajes de idiomas
const messages = {
  ES: { welcome: '¡Bienvenido a LingoStars!', subtitle: 'Aprende idiomas de forma fácil y divertida' },
  EN: { welcome: 'Welcome to LingoStars!', subtitle: 'Learn languages in a fun and easy way' },
  FR: { welcome: 'Bienvenue sur LingoStars!', subtitle: 'Apprenez des langues de manière amusante et facile' },
  PL: { welcome: 'Witamy w LingoStars!', subtitle: 'Ucz się języków w zabawny i prosty sposób' },
  IT: { welcome: 'Benvenuto a LingoStars!', subtitle: 'Impara le lingue in modo facile e divertente' },
  DE: { welcome: 'Willkommen bei LingoStars!', subtitle: 'Lerne Sprachen auf einfache und spaßige Weise' }
}

// Lista de idiomas y banderas
const languages = [
  { code: 'ES', label: 'Español', flag: '🇪🇸' },
  { code: 'EN', label: 'English', flag: '🇬🇧' },
  { code: 'FR', label: 'Français', flag: '🇫🇷' },
  { code: 'PL', label: 'Polski', flag: '🇵🇱' },
  { code: 'IT', label: 'Italiano', flag: '🇮🇹' },
  { code: 'DE', label: 'Deutsch', flag: '🇩🇪' }
]

// Router
const route = useRoute()
const router = useRouter()

// Estado reactivo del idioma
const language = ref('EN')

// Computed para mensajes
const welcomeMessage = computed(() => messages[language.value].welcome)
const subtitleMessage = computed(() => messages[language.value].subtitle)

// Función para sincronizar idioma con la ruta
function setLanguageFromRoute() {
  const lang = route.params.lang?.toUpperCase() || 'EN'
  if (messages[lang]) language.value = lang
}

// Función para navegar
function goToExercises(code) {
  router.push(`/exercises/${code.toLowerCase()}`)
  language.value = code
}

// Cambiar idioma al pasar el mouse (hover)
function hoverLanguage(code) {
  language.value = code
}

// Watch para ruta
watch(route, () => {
  setLanguageFromRoute()
}, { immediate: true })
</script>
