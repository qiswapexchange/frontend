<template>
  <div>
    <!-- Balance -->
    <div
      class="flex justify-between text-sm my-2 px-2"
      :class="`text-${theme}-inverse-400`"
    >
      <div>
        {{ tokenAmount0.balance }}
      </div>
      <div>
        {{ tokenAmount1.balance }}
      </div>
    </div>
    <!-- Token selection -->
    <div
      class="flex items-center justify-between mb-8 py-3 px-6 rounded-lg"
      :class="`bg-${theme}-main-400`"
    >
      <div
        class="
          w-1/3
          flex
          items-center
          text-lg
          font-thin
          hover:opacity-75
          cursor-pointer
        "
        @click="preChangeToken(0)"
      >
        <img
          v-if="tokenAmount0.selected"
          :src="tokenAmount0.token.icon"
          alt=""
          class="w-5 mr-2"
        />
        <span v-if="tokenAmount0.selected" class="mr-3">{{
          tokenAmount0.symbol
        }}</span>
        <span v-else class="mr-3 opacity-75">{{ $t('swap.select') }}</span>
        <img src="@/assets/icons/triangle.svg" />
      </div>
      <img
        :src="require(`@/assets/icons/${icon}.svg`)"
        class="transition-transform duration-200 transform"
        :class="[
          { 'cursor-pointer hover:opacity-75': switchable },
          iconSize,
          { 'rotate-180': switched },
        ]"
        @click="switchTokens"
      />
      <div
        class="
          w-1/3
          flex
          items-center
          justify-end
          text-lg
          font-thin
          hover:opacity-75
          cursor-pointer
        "
        @click="preChangeToken(1)"
      >
        <img
          v-if="tokenAmount1.selected"
          :src="tokenAmount1.token.icon"
          alt=""
          class="w-5 mr-2"
        />
        <span v-if="tokenAmount1.selected" class="mr-3">{{
          tokenAmount1.symbol
        }}</span>
        <span v-else class="mr-3 opacity-75">{{ $t('swap.select') }}</span>
        <img src="@/assets/icons/triangle.svg" />
      </div>
    </div>
    <!-- Input box -->
    <div class="flex">
      <SwapAmountInput :token-amount="tokenAmount0" class="mr-1 relative" />
      <SwapAmountInput
        :token-amount="tokenAmount1"
        class="ml-1 relative"
        :show-max="!switchable"
      />
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  useContext,
  watch,
} from '@nuxtjs/composition-api';
import { useNetwork, isSameToken, isQI } from '~/libs/utils';
import { DOMAIN } from '~/libs/constants';
import { Token } from '~/libs/swap';

export default defineComponent({
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
  setup(props, ctx) {
    const {
      store: { state, dispatch },
      $axios,
    } = useContext();
    const switched = ref(false);
    const tokenIndex = ref(0);
    const anotherTokenIndex = computed(() => 1 - tokenIndex.value);
    const network = computed(() => state.swap.account?.network);
    const preChangeToken = (t) => {
      tokenIndex.value = t;
    };
    const selectToken = (token) => {
      ctx.emit('change', tokenIndex.value, token);
      const anotherToken =
        tokenIndex.value === 0
          ? props.tokenAmount1.token
          : props.tokenAmount0.token;
      if (isSameToken(token, anotherToken)) {
        for (const t of state.swap.tokens) {
          if (!isSameToken(t, token)) {
            ctx.emit('change', anotherTokenIndex.value, t);
            break;
          }
        }
      }
    };
    const importToken = (token) => {
      dispatch('swap/importToken', token);
      selectToken(token);
    };

    return {
      switched,
      theme: computed(() => state.theme),
      switchTokens() {
        if (props.switchable) {
          switched.value = !switched.value;
          ctx.emit('switch');
        }
      },
      preChangeToken,
      selectToken,
      importToken,
    };
  },
});
</script>
