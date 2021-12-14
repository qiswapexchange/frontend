<template>
  <div class="">
    <div
      v-if="swap.selected && !swap.pair.exists"
      class="rounded-lg mb-6 px-6 py-4 text-sm"
      :class="`bg-${theme}-assist-300 text-${theme}-assist-400`"
    >
      <p class="font-semibold mb-1">
        {{ $t('swap.poolInfo.first') }}
      </p>
      <p>
        {{ $t('swap.poolInfo.ratio') }}<br />
        {{ $t('swap.poolInfo.click') }}
      </p>
    </div>
    <!-- Information part -->
    <div
      v-if="tokenAmount0.selected && tokenAmount1.selected && !swap.ratio.eq(0)"
      class="rounded-lg mb-6 px-6 py-4 text-sm"
      :class="`bg-${theme}-main-200 text-${theme}-inverse-400`"
    >
      <div class="text-center mb-2">
        1 {{ tokenAmount0.symbol }} = {{ swap.ratio }} {{ tokenAmount1.symbol }}
      </div>
      <div class="text-center mb-2">
        1 {{ tokenAmount1.symbol }} = {{ swap.invertRatio }}
        {{ tokenAmount0.symbol }}
      </div>
      <div class="text-center">
        {{ $t('swap.poolInfo.share') }}
        {{
          swap.shareOfPool.quotient.lt(0.01)
            ? '&lt;0.01'
            : swap.shareOfPool.toFixed(2)
        }}%
      </div>
    </div>
    <!-- Button -->
    <SwapProcessButtons
      :type="TYPE_ADD_LIQUIDITY"
      :token-amount0="tokenAmount0"
      :token-amount1="tokenAmount1"
      :approve="approve"
      :process="addLiquidity"
      :can-process="swap.canProcess"
      :processing="swap.processing"
      :texts="[$t('swap.status.add'), $t('swap.status.adding')]"
    />
    <!-- Mining pool selection -->
    <div
      class="flex items-center justify-center my-6 cursor-pointer"
      @click="poolModal = true"
    >
      <img src="@/assets/icons/user.svg" class="w-5 h-5 mr-3" />
      <span class="text-lg font-thin">{{ $t('swap.poolInfo.my') }}</span>
    </div>

    <!-- Modal box -->
    <Modal v-model="poolModal" :title="$t('swap.poolInfo.my')">
      <SwapMyLiquidity v-if="poolModal" :swap="swap" />
    </Modal>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  useContext,
} from '@nuxtjs/composition-api';
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
    const poolModal = ref(false);
    const tokenAmount0 = computed(() => swap.tokenAmount0);
    const tokenAmount1 = computed(() => swap.tokenAmount1);

    return {
      TYPE_ADD_LIQUIDITY,
      swap,
      tokenAmount0,
      tokenAmount1,
      theme,
      poolModal,
      // method
      addLiquidity: swap.addLiquidity.bind(swap),
      changeToken: swap.changeToken.bind(swap),
      approve: swap.approve.bind(swap),
    };
  },
});
</script>

<style></style>
