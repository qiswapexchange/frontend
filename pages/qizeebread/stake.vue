<template>
  <div class="">
    <QizeebreadAmountInput
      :token-amount="tokenAmount0"
      class="mr-1 mt-2 relative"
    />
    <!-- Button -->
    <QizeebreadProcessButtons
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
    const tokenAmount0 = computed(() => swap.tokenAmount0);
    const tokenAmount1 = computed(() => swap.tokenAmount1);
    const route = computed(() => swap.route);

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
