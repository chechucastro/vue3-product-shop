<template>
  <header class="header" :class="{ opened: toggleCls }">
    <nav class="header__navigation">
      <div
        class="header__burger"
        :class="{ change: toggleCls }"
        @click="toggleDrawer()"
      >
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </div>
      <div class="header__links">
        <ul>
          <li><a href="#">Shop</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </nav>
    <div class="header__logo">
      <img src="@/assets/images/logo.png" alt="Gokoping" />
    </div>
    <div class="header__shoppingCart last">
      <div class="header__shoppingCart--container">
        <img src="@/assets/images/cart.svg" width="24" height="28" alt="Cart" />
        <span class="header__shoppingCart--circle" v-if="cart.cartItemsSize">{{
          cart.cartItemsSize
        }}</span>
      </div>
    </div>
    <div class="header__breadcrumb">
      <h3>Gokoping Shop Detail</h3>
      <p>Home / Shop <span>/ Spring T-Shirt collection</span></p>
    </div>
  </header>
  <!-- Right side menu -->
  <Drawer :is-open="isDrawerOpen" :speed="500" @close="toggleDrawer">
    <div>
      <ul>
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
      </ul>
    </div>
  </Drawer>
</template>
<script setup>
/**
 * Imports
 **/
import { ref } from 'vue'
import Drawer from '@/components/shared/Drawer.vue'
import { useCartStore } from '@/stores/cart'
/**
 * Data
 **/
const cart = useCartStore() // Store
const toggleCls = ref(false)
const isDrawerOpen = ref(false)
/**
 * Methods
 **/
const toggleDrawer = () => {
  toggleCls.value = !toggleCls.value
  isDrawerOpen.value = !isDrawerOpen.value
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/shared/header.scss';
</style>
