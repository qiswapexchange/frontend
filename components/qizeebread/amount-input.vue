<!--eslint-disable vue/no-mutating-props-->
<template>
  <div
    class="flex items-center rounded-lg mb-4 py-3 flex-1"
    :class="`bg-${theme}-main-400`"
  >
    <input
      ref="input"
      v-model.number="tokenAmount.input"
      class="
        appearance-none
        bg-transparent
        focus:outline-none
        pl-6
        w-full
        text-sm
      "
      placeholder="0.0"
      @input="tokenAmount.inputing = true"
      @blur="tokenAmount.inputing = false"
    />
    <div
      class="
        py-1
        px-2
        mr-2
        text-sm
        cursor-pointer
        hover:opacity-75
        absolute
        max-input
      "
      @click="setMax"
    >
      Max
    </div>
  </div>
</template>

<script>
/* eslint-disable  */
import { BigNumber } from 'bignumber.js';
export default {
  props: {
    tokenAmount: {
      type: Object,
      default() {
        return {};
      },
    },
    showMax: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },
  methods: {
    setMax(e) {
      e.preventDefault();
      this.$refs.input.focus();
      this.tokenAmount.inputing = true;
      this.tokenAmount.input = this.tokenAmount.balance.toString();
    },
  },
};
</script>
<style scoped>
.max-input {
  color: #2e62f6;
  right: 0;
}
</style>
