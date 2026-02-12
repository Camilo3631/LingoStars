<template>
  <section class="text-center max-auto space-y-2 mt-8">

    <!-- TÍTULO -->
    <p class="text-base sm:text-xl md:text-2xl font-bold text-white mb-10">
      {{ title }}
    </p>

    <!-- MASCOTA -->
    <img
      :src="currentPet"
      alt="Mascota"
      class="w-26 h-26 sm:w-24 sm:h-24 md:w-28 mx-auto block rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
      @click="handleClick"
    />

    <!-- SUBTÍTULO -->
    <p class="text-sm sm:text-lg md:text-xl text-white">
      {{ subtitle }}
    </p>

  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { defineEmits } from 'vue'

// Emit para reiniciar el juego
const emit = defineEmits(['resetGame'])

// Textos
const title = "LingoStars"
const subtitle = "Choose your language"

// Mascotas por idioma
const pets = {
  Es: new URL('@/assets/pets/Cat.png', import.meta.url).href,
  En: new URL('@/assets/pets/Dog.png', import.meta.url).href,
  Fr: new URL('@/assets/pets/Rooster.png', import.meta.url).href,
  Pl: new URL('@/assets/pets/Eagle.png', import.meta.url).href,
  It: new URL('@/assets/pets/Wolf.png', import.meta.url).href,
  De: new URL('@/assets/pets/Bear.png', import.meta.url).href
}

// Router y ruta actual
const route = useRoute()
const router = useRouter()

// Computed para mostrar la mascota según la ruta
const currentPet = computed(() => pets[route.name] || pets['Es'])

// Función de click: siempre reinicia gane o pierda
const handleClick = () => {
  emit('resetGame')        // 🔥 primero reinicia el juego
  router.push({ name: 'Home' }) // luego vamos al Home
}
</script>
