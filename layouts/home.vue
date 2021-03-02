<template>
  <div :class="`bg-${theme}-main-100 text-${theme}-inverse-100`">
    <HeaderNavExpand />
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
