<template>
  <Layout>
   <template #header>
     <Header/>
   </template>
    <Welcome />
   </Layout>
</template>


<script setup>
import Layout from '@/components/Layout.vue'
import Header from '@/components/Header.vue'
import Welcome from '@/components/Welcome.vue';
</script>