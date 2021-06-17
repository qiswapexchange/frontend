<template>
  <div class="">
    <p>Qi balance: {{ qiTokenAmount.balance }}</p>
    <p>xQi balance: {{ xQiTokenAmount.balance }}</p>
    <div>
      <!-- 余额 -->
      <div class="flex justify-between text-sm my-2 px-2">
        <div>Stake</div>
        <div :class="`bg-${theme}-main-400`">1 xQI = {{ xQiPrice }} QI</div>
      </div>
      <!-- 输入框 -->
      <div class="flex">
        <StakeAmountInput :token-amount="qiTokenAmount" class="mr-1" />
      </div>
    </div>
    <!-- 按钮 -->
    <StakeProcessButtons
      :type="TYPE_SWAP"
      :token-amount0="qiTokenAmount"
      :token-amount0-exceeded="
        swap.maximumAmountIn.gt(qiTokenAmount.balanceSatoshi)
      "
      :approve="approve"
      :can-process="swap.canProcess"
      :process="enterStake"
      :processing="swap.processing"
    />
  </div>
</template>

<script>
/* eslint-disable */
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
    const stake = useStake();

    const qiTokenAmount = computed(() => stake.qiTokenAmount);
    const xQiTokenAmount = computed(() => stake.xQiTokenAmount);

    const tokenAmount0 = computed(() => swap.tokenAmount0);
    const tokenAmount1 = computed(() => swap.tokenAmount1);
    const route = computed(() => swap.route);

    const xQiPrice = computed(() => stake.xQiPrice);

    const theme = computed(() => state.theme);
    const poolModal = ref(false);

    return {
      TYPE_SWAP,
      swap,
      qiTokenAmount,
      xQiTokenAmount,
      tokenAmount0,
      tokenAmount1,
      route,
      poolModal,
      theme,
      SWAP_EXACT_INPUT,
      xQiPrice,
      // method
      enterStake: stake.enterStake.bind(stake),

      changeToken: swap.changeToken.bind(swap),
      switchTokens: swap.switchTokens.bind(swap),
      swapTokens: swap.swapTokens.bind(swap),
      approve: swap.approve.bind(swap),
    };
  },
});
</script>

<style></style>
