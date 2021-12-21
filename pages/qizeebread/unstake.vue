<template>
  <div class="">
    <QizeebreadAmountInput
      :token-amount="tokenAmount0"
      class="mr-1 mt-2 relative"
    />
    <!-- Button -->
    <QizeebreadProcessButtons
      :type="TYPE_ADD_LIQUIDITY"
      :wanted-amount="stakedAmount"
      :token-amount0="tokenAmount0"
      :token-amount1="tokenAmount1"
      :token-amount0-exceeded="
        qizeebread.maximumAmountIn.gt(tokenAmount0.balanceSatoshi)
      "
      :approve="approve"
      :can-process="qizeebread.canProcess"
      :process="stake"
      :processing="qizeebread.processing"
      :texts="[$t('qizeebread.unstake'), $t('qizeebread.unstaking')]"
    />
  </div>
</template>

<script>
import { defineComponent, computed, useContext } from '@nuxtjs/composition-api';
import { TYPE_ADD_LIQUIDITY } from '~/libs/constants';
import { usePool } from '~/libs/swap';
import { useExchange } from '~/libs/qizeebread';

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
    const qizeebread = useExchange();

    const theme = computed(() => state.theme);
    const tokenAmount0 = computed(() => swap.tokenAmount0);
    const tokenAmount1 = computed(() => swap.tokenAmount1);
    const stakedAmount = computed(() => qizeebread.stakedAmount);

    return {
      TYPE_ADD_LIQUIDITY,
      qizeebread,
      stakedAmount,
      swap,
      tokenAmount0,
      tokenAmount1,
      theme,
      // method
      unstake: qizeebread.unstake.bind(qizeebread),
      addLiquidity: swap.addLiquidity.bind(swap),
      changeToken: swap.changeToken.bind(swap),
      approve: swap.approve.bind(swap),
    };
  },
});
</script>

<style></style>
