<template>
   <header
    class="
    fixed top-0 left-0 z-50
    w-full h-24
    bg-slate-800
    flex items-center"
    >
    <div 
      class="
      w-full
      mx-auto
      flex items-center justify-between
      px-4
      sm:px-6
      md:px-10
      lg:px-12
      "
      >
      <img 
        src="@/assets/Principal.png"
        alt="logo"
        class="
         w-14 h-14
         cursor-pointer
         ml-0
         sm:ml-2LS
         md:ml-4
         "
         @click="reload"
         />

         <h1 
          class="
            absolute left-1/2 -translate-x-1/2
          text-white font-semibold
            text-2xl sm:text-3xl
            "
            >
            <span>Lingo</span>Stars
          </h1>

       <div class="w-10 h-10"></div>
      </div>
    </header>
</template>

<script setup>
  const reload = () => {
    location.reload();
  }
</script>