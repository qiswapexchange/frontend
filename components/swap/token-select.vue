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
    <!-- Select list -->
    <Modal v-model="modalShow" :title="$t('swap.modal.token.select')">
      <template>
        <input
          v-model.trim="search"
          class="w-full py-3 px-6 mb-4 rounded-lg"
          :class="`bg-${theme}-main-200`"
          :placeholder="$t('swap.modal.token.search')"
        />
        <div>
          <span class="font-thin">{{ $t('swap.modal.token.name') }}</span>
          <div
            class="mt-2 flow-root rounded-lg"
            :class="`bg-${theme}-main-200`"
          >
            <Spinner v-if="searching" />
            <div
              v-if="searchedToken"
              class="flex py-2 px-6 my-1 cursor-pointer"
              :class="`hover:bg-${theme}-main-100`"
              @click="importToken(searchedToken)"
            >
              <img
                v-if="searchedToken.icon"
                :src="searchedToken.icon"
                alt=""
                class="w-5 mr-4"
              />
              <span>{{ searchedToken.symbol }}</span>
            </div>
            <div
              v-for="item in filteredTokens"
              :key="item.symbol"
              class="flex justify-between py-2 px-6 my-1 cursor-pointer"
              :class="`hover:bg-${theme}-main-100`"
              @click="selectToken(item)"
            >
              <div class="flex items-center">
                <img
                  v-if="item.icon"
                  :src="item.icon"
                  alt=""
                  class="w-5 mr-4"
                />
                <span>{{ item.symbol }}</span>
              </div>
              {{ item.balance.gt(0) ? item.balance : '' }}
            </div>
          </div>
        </div>
      </template>
    </Modal>
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
import { isSameToken } from '~/libs/utils';
import { DOMAIN, NETWORK } from '~/libs/constants';
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
    const modalShow = ref(false);
    const switched = ref(false);
    const search = ref('');
    const searchedToken = ref(null);
    const searching = ref(false);
    const tokenIndex = ref(0);
    const anotherTokenIndex = computed(() => 1 - tokenIndex.value);
    const network = computed(() => state.swap.account?.network);
    const filteredTokens = computed(() => {
      const keyword = search.value.toLowerCase();
      return state.swap.tokens
        .filter(
          (token) => token.isQTUM || token.chainId === NETWORK[network.value]
        )
        .filter(
          (token) =>
            token.name.toLowerCase().includes(keyword) ||
            token.address.includes(keyword)
        )
        .sort((a, b) => {
          if (a.isQTUM) {
            return -1;
          }
          if (b.isQTUM) {
            return 1;
          }
          return a.balance.gt(b.balance) ? -1 : 1;
        });
    });
    const preChangeToken = (t) => {
      tokenIndex.value = t;
      modalShow.value = true;
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
      search.value = '';
      modalShow.value = false;
    };
    const importToken = (token) => {
      dispatch('swap/importToken', token);
      selectToken(token);
      searchedToken.value = null;
    };
    watch(search, async () => {
      const regex = /^[0-9a-f]{40}$/i;
      searching.value = true;
      try {
        if (!regex.test(search.value.toLowerCase())) {
          throw new Error('Invalid search');
        }
        if (filteredTokens.value.length > 0) {
          throw new Error('Already Imported');
        }
        const token = await $axios.$get(
          `https://${
            DOMAIN[network.value]
          }/api/qrc20/${search.value.toLowerCase()}`
        );
        searchedToken.value = new Token({
          ...token,
          imported: true,
          chainId: NETWORK[network.value],
        });
      } catch (e) {
        searchedToken.value = null;
      } finally {
        searching.value = false;
      }
    });
    return {
      modalShow,
      switched,
      search,
      searching,
      filteredTokens,
      searchedToken,
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
