<template>
  <div class="">
    <p>
      <strong>This is test phrase {{ xQiPrice }}</strong>
    </p>
    <!-- 币种选择 -->
    <StakeTokenSelect
      switchable
      :token-amount0="tokenAmount0"
      :token-amount1="tokenAmount1"
      @change="changeToken"
      @switch="switchTokens"
    />
    <!-- 按钮 -->
    <StakeProcessButtons
      :type="TYPE_SWAP"
      :token-amount0="tokenAmount0"
      :token-amount1="tokenAmount1"
      :token-amount0-exceeded="
        swap.maximumAmountIn.gt(tokenAmount0.balanceSatoshi)
      "
      :approve="approve"
      :can-process="swap.canProcess"
      :process="swapTokens"
      :processing="swap.processing"
      :texts="[$t('swap.status.swap'), $t('swap.status.swaping')]"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  useContext,
} from '@nuxtjs/composition-api';
import { useExchange } from '~/libs/swap';
import { SWAP_EXACT_INPUT, TYPE_SWAP } from '~/libs/constants';
import { useStake } from '~/libs/stake';

export default defineComponent({
  transition: {
    duration: 600,
    enterActiveClass: 'animate__animated animate__fadeIn',
    leaveActiveClass: 'animate__animated animate__fadeOut',
  },
  setup() {
    const {
      store: { state },
    } = useContext();
    const swap = useExchange();
    const stake = useStake(); // eslint-disable-line
    const tokenAmount0 = computed(() => swap.tokenAmount0);
    const tokenAmount1 = computed(() => swap.tokenAmount1);
    const route = computed(() => swap.route);

    const xQiPrice = computed(() => stake.xQiPrice);

    const theme = computed(() => state.theme);
    const poolModal = ref(false);

    return {
      TYPE_SWAP,
      swap,
      tokenAmount0,
      tokenAmount1,
      route,
      poolModal,
      theme,
      SWAP_EXACT_INPUT,
      xQiPrice,
      // method
      changeToken: swap.changeToken.bind(swap),
      switchTokens: swap.switchTokens.bind(swap),
      swapTokens: swap.swapTokens.bind(swap),
      approve: swap.approve.bind(swap),
    };
  },
});
</script>

<style></style>
