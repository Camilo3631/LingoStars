<template>
  <div class="h-screen w-full flex flex-col bg-slate-800 text-white">
    
    <!-- Header -->
    <slot name="header"></slot>

    <!-- Contenido principal ocupa todo el espacio restante -->
    <main class="flex-1 w-full flex flex-col">
      <slot name="Welcome"></slot>
    </main>

  </div>
</template>
