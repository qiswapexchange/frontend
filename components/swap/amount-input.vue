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
      :disabled="!tokenAmount.selected"
      @input="tokenAmount.inputing = true"
      @blur="tokenAmount.inputing = false"
    />
    <div
      v-if="
        tokenAmount.selected &&
        showMax &&
        (!tokenAmount.token.isQTUM ||
          (tokenAmount.token.isQTUM &&
            tokenAmount.token.balance.minus(0.2).gt(0)))
      "
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
      /* eslint-disable  */
      this.tokenAmount.inputing = true;
      this.tokenAmount.input = this.tokenAmount.token.isQTUM
        ? this.tokenAmount.balance.minus(new BigNumber(0.2))
        : this.tokenAmount.balance;
    },
  },
};
</script>
<style scoped>
.max-input {
  color: #2e62f6;
  top: -1.7rem;
}
</style>
