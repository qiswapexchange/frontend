<template>
  <div class="flex">
    <button
      v-if="wantedAmount.amount.eq(0)"
      class="process-button cursor-not-allowed"
      :class="`bg-${theme}-inverse-300`"
    >
      {{ $t('qizeebread.input') }}
    </button>
    <button
      v-else-if="shouldApprove === true && isStake()"
      class="process-button"
      :class="{
        [`bg-${theme}-assist-200 hover:bg-${theme}-assist-100`]: true,
      }"
      @click="approve(wantedAmount)"
    >
      {{ $t('qizeebread.approve') }}
    </button>
    <button
      v-else-if="wantedAmount.amountExceeded"
      class="process-button cursor-not-allowed"
      :class="`bg-${theme}-inverse-300`"
    >
      {{ $t('qizeebread.insufficientQiBalance') }}
    </button>
    <button
      v-else-if="wantedAmount.amount.gt(0) && !wantedAmount.shouldApprove"
      class="process-button"
      :class="{
        [`bg-${theme}-assist-200 hover:bg-${theme}-assist-100`]: true,
      }"
      @click="process"
    >
      {{ $t('qizeebread.stake') }}
    </button>
  </div>
</template>

<script>
/* eslint-disable */
import BigNumber from 'bignumber.js';
import { TYPE_SWAP, TYPE_QIZEEBREAD_STAKE, TYPE_QIZEEBREAD_UNSTAKE } from '~/libs/constants';

export default {
  props: {
    type: String,
    wantedAmount: {
      type: Object,
      default() {
        return {
          amountExceeded: false,
          amount: BigNumber(0),
          shouldApprove: false
        };
      },
    },
    unstakeAmount: {
      type: Object,
      default() {
        return {
          amountExceeded: false,
          amount: BigNumber(1),
        };
      },
    },
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
      return this.wantedAmount?.shouldApprove && this.wantedAmount.amount.gt(0);
    },
    isSwap() {
      return this.type === TYPE_SWAP;
    },
    isStake() {
      return this.type === TYPE_QIZEEBREAD_STAKE;
    },
    isUnStake() {
      return this.type === TYPE_QIZEEBREAD_UNSTAKE;
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
