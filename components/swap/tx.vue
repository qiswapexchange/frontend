<template>
  <div
    class="w-full overflow-hidden flex items-center justify-between mb-2 text-xs"
  >
    <SwapTxLink v-if="type === 'approve'" v-bind="raw">
      <img src="@/assets/icons/record/approve.svg" alt="" class="w-4 mr-4" />
      <span>
        {{ $t('transaction.approve', { token: token.symbol }) }}
      </span>
    </SwapTxLink>
    <SwapTxLink v-else-if="type === 'addLiquidity'" v-bind="raw">
      <img
        src="@/assets/icons/record/addLiquidity.svg"
        alt=""
        class="w-4 mr-4"
      />
      <span>
        {{
          $t('transaction.add', {
            token0: `${tokenAmount0.input} ${tokenAmount0.token.symbol}`,
            token1: `${tokenAmount1.input} ${tokenAmount1.token.symbol}`
          })
        }}
      </span>
    </SwapTxLink>
    <SwapTxLink v-else-if="type === 'removeLiquidity'" v-bind="raw">
      <img
        src="@/assets/icons/record/removeLiquidity.svg"
        alt=""
        class="w-4 mr-4"
      />
      <span>
        {{
          $t('transaction.remove', {
            token0: `${tokenAmount0.input} ${tokenAmount0.token.symbol}`,
            token1: `${tokenAmount1.input} ${tokenAmount1.token.symbol}`
          })
        }}
      </span>
    </SwapTxLink>
    <SwapTxLink v-else-if="type === 'swap'" v-bind="raw">
      <img src="@/assets/icons/record/swap.svg" alt="" class="w-4 mr-4" />
      <span>
        {{
          $t('transaction.swap', {
            token0: `${tokenAmount0.input} ${tokenAmount0.token.symbol}`,
            token1: `${tokenAmount1.input} ${tokenAmount1.token.symbol}`
          })
        }}
      </span>
    </SwapTxLink>
    <SwapTxLink v-else v-bind="raw">View Tx</SwapTxLink>
    <Spinner v-if="pending" :width="4" class="text-blue-600" />
    <img
      v-else-if="success"
      src="@/assets/icons/success.svg"
      alt=""
      class="w-4"
    />
    <img v-else src="@/assets/icons/fail.svg" alt="" class="w-4" />
    <!-- <Feather v-else-if="success" type="check-circle" class="text-green-500 w-4" />
    <Feather v-else type="alert-triangle" class="text-orange-600 w-4" /> -->
  </div>
</template>

<script>
export default {
  props: {
    tx: Object
  },
  computed: {
    raw() {
      return this.tx.raw
    },
    pending() {
      return this.tx.raw.confirmations === 0
    },
    success() {
      return this.tx.raw.success
    },
    type() {
      return this.tx.type
    },
    tokenAmount0() {
      return this.tx.tokenAmount0
    },
    tokenAmount1() {
      return this.tx.tokenAmount1
    },
    token() {
      return this.tx.token
    }
  }
}
</script>
