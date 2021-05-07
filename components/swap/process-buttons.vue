<template>
  <div class="flex">
    <button
      v-if="shouldApprove[0] && !tokenAmount0.amountExceeded"
      class="process-button"
      :class="{
        [`bg-${theme}-assist-200 hover:bg-${theme}-assist-100`]: !tokenAmount0.approving,
        [`bg-${theme}-inverse-300 cursor-not-allowed`]: tokenAmount0.approving
      }"
      @click="approve(tokenAmount0)"
    >
      {{
        tokenAmount0.approving
          ? $t('swap.status.approving', { tokenName: tokenAmount0.symbol })
          : $t('swap.status.approve', { tokenName: tokenAmount0.symbol })
      }}
    </button>
    <button
      v-if="shouldApprove[1] && !tokenAmount1.amountExceeded && !isSwap"
      class="process-button"
      :class="{
        [`bg-${theme}-assist-200 hover:bg-${theme}-assist-100`]: !tokenAmount1.approving,
        [`bg-${theme}-inverse-300 cursor-not-allowed`]: tokenAmount1.approving
      }"
      @click="approve(tokenAmount1)"
    >
      {{
        tokenAmount1.approving
          ? $t('swap.status.approving', { tokenName: tokenAmount1.symbol })
          : $t('swap.status.approve', { tokenName: tokenAmount1.symbol })
      }}
    </button>
    <button
      v-if="!tokenAmount0.selected || !tokenAmount1.selected"
      class="process-button cursor-not-allowed"
      :class="`bg-${theme}-inverse-300`"
    >
      {{ $t('swap.status.select') }}
    </button>
    <button
      v-else-if="!canProcess"
      class="process-button cursor-not-allowed"
      :class="`bg-${theme}-inverse-300`"
    >
      {{ $t('swap.status.insufficient') }}
    </button>
    <button
      v-else-if="tokenAmount0.amount.eq(0) || tokenAmount1.amount.eq(0)"
      class="process-button cursor-not-allowed"
      :class="`bg-${theme}-inverse-300`"
    >
      {{ $t('swap.status.input') }}
    </button>
    <button
      v-else-if="tokenAmount0.amountExceeded || tokenAmount0Exceeded"
      class="process-button cursor-not-allowed"
      :class="`bg-${theme}-inverse-300`"
    >
      {{ $t('swap.status.balance', { tokenName: tokenAmount0.symbol }) }}
    </button>
    <button
      v-else-if="tokenAmount1.amountExceeded && !isSwap"
      class="process-button cursor-not-allowed"
      :class="`bg-${theme}-inverse-300`"
    >
      {{ $t('swap.status.balance', { tokenName: tokenAmount1.symbol }) }}
    </button>
    <button
      v-else-if="
        tokenAmount0.amount.gt(0) &&
        tokenAmount1.amount.gt(0) &&
        !tokenAmount0.shouldApprove &&
        (!tokenAmount1.shouldApprove || isSwap)
      "
      class="process-button"
      :class="{
        [`bg-${theme}-assist-200 hover:bg-${theme}-assist-100`]: true
      }"
      @click="process"
    >
      {{ texts[0] }}
    </button>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js'
import { TYPE_SWAP } from '~/libs/constants'

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
          amount: BigNumber(1)
        }
      }
    },
    tokenAmount0Exceeded: Boolean,
    canProcess: Boolean,
    processing: Boolean,
    process: Function,
    texts: Array,
    approve: Function
  },
  computed: {
    theme() {
      return this.$store.state.theme
    },
    shouldApprove() {
      return [
        this.tokenAmount0?.shouldApprove && this.tokenAmount0.amount.gt(0),
        this.tokenAmount1?.shouldApprove && this.tokenAmount1.amount.gt(0)
      ]
    },
    isSwap() {
      return this.type === TYPE_SWAP
    }
  }
}
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
