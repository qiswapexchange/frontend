<template>
  <div class="flex">
    <button
      class="process-button"
      :class="`bg-${theme}-inverse-300`"
      @click="process"
    >
      {{ $t('stake.status.enter') }}
    </button>
    <!-- <button
      v-else-if="!canProcess"
      class="process-button cursor-not-allowed"
      :class="`bg-${theme}-inverse-300`"
    >
      {{ $t('swap.status.insufficient') }}
    </button> -->
  </div>
</template>

<script>
import BigNumber from 'bignumber.js';

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
