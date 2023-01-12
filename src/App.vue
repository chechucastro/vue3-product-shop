<template>
  <!-- Shared navigation -->
  <Navigation />
  <!-- Main Router -->
  <main>
    <section>
      <RouterView />
    </section>
  </main>
  <!-- Shared footer -->
  <Footer />
</template>
<script setup>
/**
 * Imports
 **/
import { RouterView } from 'vue-router'
import Navigation from '@/components/shared/Header.vue'
import Footer from '@/components/shared/Footer.vue'
</script>

<style scoped></style>
