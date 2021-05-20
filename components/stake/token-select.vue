<template>
  <div>
    <!-- 余额 -->
    <div class="flex justify-between text-sm my-2 px-2">
      <div>Stake</div>
      <div :class="`bg-${theme}-main-400`">1 xQI = 1 QI</div>
    </div>
    <!-- 输入框 -->
    <div class="flex">
      <StakeAmountInput :token-amount="tokenAmount0" class="mr-1" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, useContext } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const {
      store: { state },
    } = useContext();
    // const network = computed(() => state.swap.account?.network);

    return {
      theme: computed(() => state.theme),
    };
  },
  props: {
    tokenAmount0: Object,
    tokenAmount1: Object,
    icon: {
      type: String,
      default: 'swap',
    },
    iconSize: {
      type: String,
      default: 'w-6',
    },
    switchable: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
