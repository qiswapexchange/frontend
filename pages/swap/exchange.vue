<template>
  <div class="">
    <!-- 币种选择 -->
    <SwapTokenSelect
      switchable
      :token-amount0="tokenAmount0"
      :token-amount1="tokenAmount1"
      @change="changeToken"
      @switch="switchTokens"
    />
    <!-- 转换率 -->
    <div v-if="!swap.ratio.eq(0)" class="text-2xl text-center py-4 mb-4" :class="`text-${theme}-inverse-100`">
      1 {{ tokenAmount0.symbol }} = {{ swap.ratio.toSd(6) }} {{ tokenAmount1.symbol }}
      <div class="flex items-center justify-center text-sm">
        <div v-for="(token, i) in route.path" :key="i" class="flex items-center">
          <img v-if="token.icon" :src="token.icon" alt="" class="w-5">
          {{ token.symbol }}
          <img
            v-if="i < route.path.length - 1"
            src="~/assets/icons/arrow-right.svg"
            class="w-3 mx-1"
          >
        </div>
      </div>
    </div>
    <!-- 信息部分 -->
    <div v-if="!swap.ratio.eq(0) && tokenAmount0.amount.gt(0) && tokenAmount1.amount.gt(0)" class="rounded-lg mb-4 px-6 py-4 text-sm" :class="`bg-${theme}-main-200 text-${theme}-inverse-400`">
      <div class="flex justify-between mb-4">
        <span>
          {{ $t('swap.swapInfo.impact.label') }}
          <img
            v-tooltip.top="{ content:$t('swap.swapInfo.impact.tip'), class: `tooltip-${theme}` }"
            src="@/assets/icons/tip.svg"
            alt=""
            class="inline-block w-3 h-3 ml-2 align-middle cursor-pointer"
          >
        </span>
        <span>
          {{ swap.priceImpact.lt(0.0001) ? '&lt;0.01' : swap.priceImpact.toPercent() }}%
        </span>
      </div>
      <div class="flex justify-between mb-4">
        <span>
          {{ swap.swapType === SWAP_EXACT_INPUT ? $t('swap.swapInfo.minimum.label') : $t('swap.swapInfo.maximum.label') }}
          <img
            v-tooltip.right="{ content: swap.swapType === SWAP_EXACT_INPUT ? $t('swap.swapInfo.minimum.tip') : $t('swap.swapInfo.maximum.tip'), class: `tooltip-${theme}` }"
            src="@/assets/icons/tip.svg"
            alt=""
            class="cursor-pointer inline-block w-3 h-3 ml-2 align-middle"
          >
        </span>
        <span v-if="swap.swapType === SWAP_EXACT_INPUT">
          {{ tokenAmount1.getAmount(swap.minimumAmountOut) }} {{ tokenAmount1.symbol }}
        </span>
        <span v-else>
          {{ tokenAmount0.getAmount(swap.maximumAmountIn) }} {{ tokenAmount0.symbol }}
        </span>
      </div>
      <div class="flex justify-between">
        <span>
          {{ $t('swap.swapInfo.fee.label') }}
          <img
            v-tooltip.bottom="{ content: $t('swap.swapInfo.fee.tip'), class: `tooltip-${theme}` }"
            src="@/assets/icons/tip.svg"
            alt=""
            class="cursor-pointer inline-block w-3 h-3 ml-2 align-middle"
          >
        </span>
        <span>{{ swap.fee.times(tokenAmount0.amount) }} {{ tokenAmount0.symbol }}</span>
      </div>
    </div>
    <!-- 按钮 -->
    <SwapProcessButtons
      :type="TYPE_SWAP"
      :token-amount0="tokenAmount0"
      :token-amount1="tokenAmount1"
      :token-amount0-exceeded="swap.maximumAmountIn.gt(tokenAmount0.balanceSatoshi)"
      :approve="approve"
      :can-process="swap.canProcess"
      :process="swapTokens"
      :processing="swap.processing"
      :texts="[$t('swap.status.swap'), $t('swap.status.swaping')]"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed, useContext } from '@nuxtjs/composition-api'
import { useExchange } from '~/libs/swap'
import { SWAP_EXACT_INPUT, TYPE_SWAP } from '~/libs/constants'

export default defineComponent({
  setup () {
    const { store: { state } } = useContext()
    const swap = useExchange()
    const tokenAmount0 = computed(() => swap.tokenAmount0)
    const tokenAmount1 = computed(() => swap.tokenAmount1)
    const route = computed(() => swap.route)

    const theme = computed(() => state.theme)
    const poolModal = ref(false)

    return {
      TYPE_SWAP,
      swap,
      tokenAmount0,
      tokenAmount1,
      route,
      poolModal,
      theme,
      SWAP_EXACT_INPUT,
      // method
      changeToken: swap.changeToken.bind(swap),
      switchTokens: swap.switchTokens.bind(swap),
      swapTokens: swap.swapTokens.bind(swap),
      approve: swap.approve.bind(swap)
    }
  },
  transition: {
    duration: 600,
    enterActiveClass: 'animate__animated animate__fadeIn',
    leaveActiveClass: 'animate__animated animate__fadeOut'
  }
})
</script>

<style>

</style>
