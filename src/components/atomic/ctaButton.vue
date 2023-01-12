<!-- Component for any CTA button type -->
<template>
  <button
    class="btn"
    type="button"
    role="button"
    :disabled="btnIsDisabled"
    :style="{
      color: props.btnTextColor,
      backgroundColor: props.btnBgColor,
      width: `${props.btnWidth}px`,
      height: `${props.btnHeight}px`
    }"
  >
    {{ btnText }}
  </button>
</template>

<script setup>
const props = defineProps({
  btnBgColor: { type: String, default: '#E6395E' },
  btnTextColor: { type: String, default: '#fff' },
  btnText: { type: String, default: 'add to cart' },
  btnWidth: { type: String, default: '180' },
  btnHeight: { type: String, default: '50' },
  btnIsDisabled: { type: Boolean, default: true }
})
</script>

<style lang="scss" scoped>
button {
  border: none;
  text-transform: uppercase;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 8px;
  background-color: $bg-base-add-cart-btn;
  &[disabled] {
    background-color: $bg-base-disabled-btn !important;
  }
}
</style>
