<template>
  <div :class="`bg-${theme}-main-100 text-${theme}-inverse-100`" class="min-h-screen flex flex-col justify-between items-stretch">
    <HeaderNavMerge />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'theme'
    ])
  }
}
</script>
