<template>
  <a
    :href="url"
    target="_blank"
    class="flex items-center hover:underline"
    :class="`text-${theme}-inverse-400 hover:text-${theme}-assist-300`"
  >
    <slot />
  </a>
</template>

<script>
import { DOMAIN } from '~/libs/constants';
export default {
  props: {
    txid: String,
    network: String,
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
    url() {
      return `https://${DOMAIN[this.network]}/tx/${this.txid}`;
    },
  },
};
</script>
