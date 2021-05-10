<template>
  <div
    class="spinner"
    :style="{ width: `${width / 4}rem`, height: `${width / 4}rem` }"
  />
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 4,
    },
  },
};
</script>

<style lang="less" scoped>
.spinner {
  border-radius: 50%;
  background: conic-gradient(currentColor, transparent 90%, transparent);
  --mask: radial-gradient(closest-side, transparent 75%, rgb(17, 17, 17) 76%);
  -webkit-mask-image: var(--mask);
  mask-image: var(--mask);
  animation-name: spinner;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
@keyframes spinner {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
