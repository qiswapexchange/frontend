<template>
  <div>
    <div class="text-lg mb-4">
      LP Token: {{ tokenAmount0.token.symbol }}-{{ tokenAmount1.token.symbol }}
    </div>
    <div
      class="mb-4 py-3 px-6 rounded-lg focus:outline-none"
      :class="`bg-${theme}-main-400`"
    >
      <div>
        {{ $t('swap.liquidityInfo.amount') }}
      </div>
      <div class="text-6xl text-center mb-3">
        {{ percent }}%
      </div>
      <input v-model="percent" class="w-full" type="range" min="1" max="100">
    </div>
    <!-- <div>
      <div class="p-2">
        {{ tokenAmount0.token.symbol }}-{{ tokenAmount1.token.symbol }}: {{ liquidity.balance }}
      </div>
      <SwapAmountInput :token-amount="liquidity" />
    </div> -->
    <div>
      <div class="p-2">
        {{ tokenAmount0.token.symbol }}: {{ liquidity.amount0 }}
      </div>
      <SwapAmountInput :token-amount="tokenAmount0" />
    </div>
    <div>
      <div class="p-2">
        {{ tokenAmount1.token.symbol }}: {{ liquidity.amount1 }}
      </div>
      <SwapAmountInput :token-amount="tokenAmount1" />
    </div>
    <SwapProcessButtons
      :token-amount0="liquidity"
      :token-amount1="liquidity.tokenAmount1"
      can-process
      :approve="approve"
      :process="remove"
      :processing="liquidity.processing"
      :texts="[$t('swap.status.remove'), $t('swap.status.removing')]"
    />
  </div>
</template>

<script>
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
import Fraction from '~/libs/fraction'

export default defineComponent({
  setup (props) {
    const { store: { state } } = useContext()
    const theme = computed(() => state.theme)
    const tokenAmount0 = computed(() => props.liquidity.tokenAmount0)
    const tokenAmount1 = computed(() => props.liquidity.tokenAmount1)
    const percent = computed({
      get () {
        return props.liquidity.percent.times(100).quotient.dp(0).toNumber()
      },
      set (percent) {
        props.liquidity.percent = new Fraction(percent, 100)
      }
    })
    props.swap.updateShouldApprove(props.liquidity)
    props.liquidity.watchAll()
    return {
      theme,
      tokenAmount0,
      tokenAmount1,
      percent,
      // method
      approve () {
        props.swap.approve(props.liquidity)
      },
      remove () {
        props.liquidity.remove(state.swap.tolerance, state.swap.deadline)
      }
    }
  },
  props: {
    liquidity: Object,
    swap: Object
  }
})
</script>
