<template>
  <div>
    <div
      class="drawer"
      :class="{ 'is-open': props.isOpen, 'is-visible': isVisible }"
    >
      <div
        class="drawer__overlay"
        :class="{ fixed: isVisible }"
        :style="{ transitionDuration: `${props.speed}ms` }"
        @click="closeDrawer"
      ></div>
      <div
        class="drawer__content"
        :style="{
          maxWidth: props.maxWidth,
          transitionDuration: `${props.speed}ms`,
          backgroundColor: props.backgroundColor
        }"
      >
        <!-- Menu links here -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
const isVisible = ref(false)
const isTransitioning = ref(false)
const emit = defineEmits(['close'])
/**
 * Props
 **/
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: false,
    default: false
  },

  maxWidth: {
    type: String,
    required: false,
    default: '400px'
  },

  // Transition Speed in Milliseconds
  speed: {
    type: Number,
    required: false,
    default: 300
  },

  backgroundColor: {
    type: String,
    required: false,
    default: '#fafafa'
  }
})

/**
 * Methods
 **/
const toggleBackgroundScrolling = (enable) => {
  const body = document.querySelector('body')
  body.style.overflow = enable ? 'hidden' : null
}

const closeDrawer = () => {
  if (props.isOpen) {
    emit('close')
  }
}
/**
 * Watches
 **/
watch(
  () => props.isOpen,
  (val) => {
    isTransitioning.value = true
    toggleBackgroundScrolling(val)
    if (val) {
      isVisible.value = true
    } else {
      setTimeout(() => (isVisible.value = false), props.speed)
    }
    setTimeout(() => (isTransitioning.value = false), props.speed)
  }
)
/**
 * OnMounted
 **/
onMounted(() => {
  isVisible.value = props.isOpen
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/shared/drawer.scss';
</style>
