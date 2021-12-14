<template>
  <div class="flex">
    <button
      class="process-button"
      :class="{
        [`bg-${theme}-assist-200 hover:bg-${theme}-assist-100`]: true,
      }"
      @click="process"
    >
      Stake
    </button>
    <button
      class="process-button"
      :class="{
        [`bg-${theme}-assist-200 hover:bg-${theme}-assist-100`]: true,
      }"
      @click="process"
    >
      Unstake
    </button>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js';
import { TYPE_SWAP } from '~/libs/constants';

export default {
  props: {
    type: String,
    tokenAmount0: Object,
    tokenAmount1: {
      type: Object,
      default() {
        return {
          selected: true,
          amountExceeded: false,
          amount: BigNumber(1),
        };
      },
    },
    tokenAmount0Exceeded: Boolean,
    canProcess: Boolean,
    processing: Boolean,
    process: Function,
    texts: Array,
    approve: Function,
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
    shouldApprove() {
      return [
        this.tokenAmount0?.shouldApprove && this.tokenAmount0.amount.gt(0),
        this.tokenAmount1?.shouldApprove && this.tokenAmount1.amount.gt(0),
      ];
    },
    isSwap() {
      return this.type === TYPE_SWAP;
    },
    insufficientQtum() {
      return this.$store.state.swap.account?.balance < 0.2;
    },
  },
};
</script>

<style lang="less" scoped>
.process-button {
  @apply flex-1 py-2 mb-4 text-lg font-thin tracking-wider rounded-lg;
  &:focus {
    @apply outline-none;
  }
  &:nth-last-child(2) {
    @apply mr-1;
  }
  &:nth-child(2) {
    @apply ml-1;
  }
}
</style>
