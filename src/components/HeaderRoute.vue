<template>
  <section class="text-center max-auto space-y-2 mt-8">

    <!-- TÍTULO -->
    <p class="text-base sm:text-xl md:text-2xl font-bold text-white mb-10">
      {{ title }}
    </p>

    <!-- MASCOTA -->
    <img
      :src="pets[currentView]"
      alt="Mascota"
      class="w-26 h-26 sm:w-24 sm:h-24 md:w-28 mx-auto block rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
      @click="goHome"
    />

    <!-- SUBTÍTULO -->
    <p class="text-sm sm:text-lg md:text-xl text-white">
      {{ subtitle }}
    </p>

  </section>
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

// Textos
const title = "LingoStars"
const subtitle = "Choose your language"

// Mascotas por ruta
const pets = {
  Es: new URL('@/assets/pets/Cat.png', import.meta.url).href,
  En: new URL('@/assets/pets/Dog.png', import.meta.url).href,
  Fr: new URL('@/assets/pets/Rooster.png', import.meta.url).href,
  Pl: new URL('@/assets/pets/Eagle.png', import.meta.url).href,
  It: new URL('@/assets/pets/Wolf.png', import.meta.url).href,
  De: new URL('@/assets/pets/Bear.png', import.meta.url).href
}

const route = useRoute()
const router = useRouter()
const currentView = route.name

const goHome = () => {
  router.push({ name: 'Home' })
}
</script>
