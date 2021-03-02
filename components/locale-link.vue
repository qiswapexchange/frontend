<template>
  <nuxt-link :to="localePath(to)">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: { type: [String, Object], default: '/' }
  }
}
</script>
