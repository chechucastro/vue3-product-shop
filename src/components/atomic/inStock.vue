<template>
  <img
    src="@/assets/images/tick.png"
    width="14"
    height="14"
    alt="In Stock"
  /><span> In stock </span>
</template>

<script setup></script>

<style lang="scss" scoped>
img {
  margin: 0 0.8rem 0 1.5rem;
}
span {
  color: $base-primary-success;
  font-size: 13px;
  font-style: italic;
}
</style>
