<template>
  <div class="">
    <QizeebreadAmountInput
      :token-amount="tokenAmount0"
      class="mr-1 mt-2 relative"
    />
    <!-- Button -->
    <QizeebreadProcessButtons
      :type="TYPE_ADD_LIQUIDITY"
      :token-amount0="tokenAmount0"
      :token-amount1="tokenAmount1"
      :approve="approve"
      :process="addLiquidity"
      :can-process="swap.canProcess"
      :processing="swap.processing"
      :texts="[$t('swap.status.add'), $t('swap.status.adding')]"
    />
  </div>
</template>

<script>
import { defineComponent, computed, useContext } from '@nuxtjs/composition-api';
import { TYPE_ADD_LIQUIDITY } from '~/libs/constants';
import { usePool } from '~/libs/swap';

export default defineComponent({
  transition: {
    duration: 300,
    enterActiveClass: 'animate__animated animate__fadeIn',
    leaveActiveClass: 'animate__animated animate__fadeOut',
  },
  setup() {
    const {
      store: { state },
    } = useContext();
    const swap = usePool();

    const theme = computed(() => state.theme);
    const tokenAmount0 = computed(() => swap.tokenAmount0);
    const tokenAmount1 = computed(() => swap.tokenAmount1);

    return {
      TYPE_ADD_LIQUIDITY,
      swap,
      tokenAmount0,
      tokenAmount1,
      theme,
      // method
      addLiquidity: swap.addLiquidity.bind(swap),
      changeToken: swap.changeToken.bind(swap),
      approve: swap.approve.bind(swap),
    };
  },
});
</script>

<style></style>
