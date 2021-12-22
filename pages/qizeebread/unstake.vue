<template>
  <div class="">
    <QizeebreadAmountInput
      :token-amount="stakeAmount"
      class="mr-1 mt-2 relative"
    />
    <!-- Button -->
    <QizeebreadProcessButtons
      :type="TYPE_ADD_LIQUIDITY"
      :wanted-amount="stakeAmount"
      :token-amount0="tokenAmount0"
      :token-amount1="tokenAmount1"
      :token-amount0-exceeded="
        qizeebread.maximumAmountIn.gt(tokenAmount0.balanceSatoshi)
      "
      :can-process="qizeebread.canProcess"
      :process="unstake"
      :processing="qizeebread.processing"
      :texts="[$t('qizeebread.unstake'), $t('qizeebread.unstaking')]"
    />
    <button @click="unstake">unstake</button>
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
    const stakeAmount = computed(() => qizeebread.stakeAmount);

    return {
      TYPE_ADD_LIQUIDITY,
      qizeebread,
      stakeAmount,
      swap,
      tokenAmount0,
      tokenAmount1,
      theme,
      // method
      unstake: qizeebread.unstake.bind(qizeebread),
    };
  },
});
</script>

<style></style>
