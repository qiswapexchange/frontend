<template>
  <div class="">
    <QizeebreadAmountInput
      :token-amount="qiAmount"
      class="mr-1 mt-2 relative"
    />
    <!-- Button -->
    <QizeebreadProcessButtons
      :type="TYPE_QIZEEBREAD_STAKE"
      :wanted-amount="qiAmount"
      :token-amount0="tokenAmount0"
      :token-amount1="tokenAmount1"
      :token-amount0-exceeded="
        qizeebread.maximumAmountIn.gt(tokenAmount0.balanceSatoshi)
      "
      :approve="approve"
      :can-process="qizeebread.canProcess"
      :process="stake"
      :processing="qizeebread.processing"
      :texts="[$t('qizeebread.stake'), $t('qizeebread.staking')]"
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
import { useExchange } from '~/libs/qizeebread';
import { TYPE_QIZEEBREAD_STAKE } from '~/libs/constants';

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
    const qizeebread = useExchange();
    const qiAmount = computed(() => qizeebread.qiAmount);
    const tokenAmount0 = computed(() => qizeebread.tokenAmount0);
    const tokenAmount1 = computed(() => qizeebread.tokenAmount1);

    const theme = computed(() => state.theme);
    const poolModal = ref(false);

    return {
      TYPE_QIZEEBREAD_STAKE,
      qizeebread,
      qiAmount,
      tokenAmount0,
      tokenAmount1,
      poolModal,
      theme,
      // method
      stake: qizeebread.stake.bind(qizeebread),
      approve: qizeebread.approve.bind(qizeebread),
    };
  },
});
</script>

<style></style>
