<template>
  <!--Empty heart -->
  <font-awesome-icon
    :icon="[fillHearth ? 'far' : 'fas', 'heart']"
    :class="{ fill: !fillHearth }"
    @click="fillHearth = !fillHearth"
  />
</template>

<script setup>
/**
 * Imports
 **/
import { ref } from 'vue'

/**
 * Model
 **/
const fillHearth = ref(true)
</script>

<style lang="scss" scoped>
.svg-inline--fa {
  font-size: 21px;
  &.fill {
    color: $bg-base-add-cart-btn;
  }
}
</style>
