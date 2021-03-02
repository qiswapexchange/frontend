<template>
  <div class="">
    <div v-if="loading" class="flex flex-col items-center justify-center">
      <Spinner :width="20" :class="`text-${theme}-assist-300`" class="my-3" />
      {{ $t('common.loading') }}
    </div>

    <div v-else-if="liquidityList.length === 0" class="flex-grow flex flex-col items-center py-32">
      <img src="@/assets/icons/empty.svg" alt="" class="w-2/5">
      <span class="text-sm mt-4" :class="`text-${theme}-inverse-500`">{{ $t('nav.accountModal.empty') }}</span>
    </div>

    <div v-else>
      <div v-for="({ token0, token1, balance, pooledPercent }, index) in liquidityList" :key="`${token0.address}-${token1.address}`" class="p-4 my-4 text-sm rounded-lg" :class="`bg-${theme}-main-400 text-${theme}-inverse-200`">
        <div class="flex justify-between mb-2">
          <span>{{ token0.symbol }}-{{ token1.symbol }} <span class="font-thin">（LP Token）</span> </span>
          <span>{{ balance }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span>{{ token0.symbol }}</span>
          <span>{{ token0.balance }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span>{{ token1.symbol }}</span>
          <span>{{ token1.balance }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span>{{ $t('swap.poolInfo.share') }}</span>
          <span>{{ pooledPercent }}%</span>
        </div>
        <div class="flex justify-end mt-4">
          <button
            class="px-4 py-px font-mono tracking-wider rounded-full hover:opacity-75"
            :class="`bg-${theme}-main-300 text-${theme}-assist-300`"
            @click="remove(index)"
          >
            {{ $t('swap.modal.remove') }}
          </button>
        </div>
      </div>
    </div>
    <Modal v-model="removeModal" :title="$t('swap.liquidityInfo.remove')">
      <SwapRemoveLiquidity v-if="removeModal" :liquidity="liquidity" :swap="swap" />
    </Modal>
  </div>
</template>

<script>
import { defineComponent, ref, computed, useContext, onMounted, reactive } from '@nuxtjs/composition-api'
import sleep from 'sleep-promise'
import LiquidityToken from '~/libs/swap/liquidity-token'

export default defineComponent({
  props: {
    swap: Object
  },
  setup (props) {
    const { store: { state } } = useContext()
    const loading = ref(true)
    const removeModal = ref(false)
    const liquidity = ref(null)

    const theme = computed(() => state.theme)
    const liquidityList = reactive([])

    onMounted(async () => {
      await Promise.all(props.swap.allPairs.map(async pair => {
        while (pair.updating) {
          await sleep(100)
        }
        if (pair.exists) {
          pair.balanceSatoshi = await pair.getBalance()
          if (pair.balance.gt(0)) {
            liquidityList.push(reactive(new LiquidityToken(pair)))
          }
        }
      }))
      loading.value = false
    })

    return {
      theme,
      liquidity,
      liquidityList,
      loading,
      removeModal,
      // method
      remove (index) {
        liquidity.value = liquidityList[index]
        removeModal.value = true
      }
    }
  }
})
</script>
