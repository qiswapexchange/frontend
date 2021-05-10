<template>
  <div class="px-4 flex-grow">
    <SwapSettingsPanel>
      <!-- 选择部分 -->
      <div class="flex rounded-lg overflow-hidden">
        <swap-link
          to="/swap/exchange"
          :label="$t('swap.exchange')"
          :theme="theme"
          :active="activeNav === 'exchange'"
          right
        />
        <swap-link
          to="/swap/pool"
          :label="$t('swap.pool')"
          :theme="theme"
          :active="activeNav === 'pool'"
        />
      </div>

      <!-- 展示部分 -->
      <nuxt-child />
    </SwapSettingsPanel>

    <!-- 模态框 -->
    <Modal v-model="waitingValidating" :can-close="false">
      <div class="h-full flex flex-col items-center justify-center">
        <Spinner class="my-3" :class="`text-${theme}-assist-300`" :width="20" />
        {{ $t('swap.waitingValidating') }}
      </div>
    </Modal>

    <!-- 模态框 -->
    <Modal v-model="waitingConfirmation">
      <div class="h-full flex flex-col items-center justify-center">
        <Spinner class="my-3" :class="`text-${theme}-assist-300`" :width="20" />
        {{ $t('swap.confirmTransaction') }}
      </div>
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
import { NETWORK } from '~/libs/constants';
import { useQrypto } from '~/libs/qrypto';
import { Token } from '~/libs/swap';
import { useWs } from '~/libs/ws';

export default defineComponent({
  setup() {
    const { store, route, $axios } = useContext();
    const { state, commit, dispatch } = store;
    const qrypto = useQrypto(state.swap.extensionId);

    const waitingValidating = ref(false);
    const waitingConfirmation = ref(false);
    const theme = computed(() => state.theme);
    const activeNav = computed(() => {
      return route.value.path?.match(/swap\/(.+?)(\/|$)/)?.[1] || 'exchange';
    });

    dispatch('swap/loadTxs');
    const installed = computed(() => state.swap.extensionInstalled);
    qrypto.on('account', (account) => {
      commit('swap/setAccount', account);
      useWs(account.network || NETWORK.MainNet)
        .$subscribe('tip', 'tip', (tip) => {
          commit('swap/setHeight', tip.height);
        })
        .$subscribe('tip', 'reorg', (tip) => {
          commit('swap/setHeight', tip.height);
        });
    });
    qrypto.on('installed', (installed) =>
      commit('swap/setExtensionInstalled', installed)
    );
    qrypto.on('connected', () => {
      // console.log('connected');
      commit('swap/setConnected', true);
    });
    qrypto.on('txValidating', () => {
      waitingValidating.value = true;
    });
    qrypto.on('txWaiting', () => {
      waitingConfirmation.value = true;
      waitingValidating.value = false;
    });
    qrypto.on('txCancelled', () => {
      waitingValidating.value = false;
      waitingConfirmation.value = false;
    });
    qrypto.on('txSent', () => {
      waitingConfirmation.value = false;
    });
    qrypto.on('tx', (tx) => {
      tx.address = qrypto.account.address;
      tx.raw.on('confirmed', () => {
        dispatch('swap/confirmTx', {
          tx,
          raw: tx.raw,
        });
      });
      dispatch('swap/addTx', tx);
    });
    $axios
      .$get('/tokens.json')
      .then((tokens) => [Token.QTUM, ...tokens.map((t) => new Token(t))])
      .then((tokens) => {
        commit('swap/setTokens', tokens);
        dispatch('swap/loadTokens');
      });
    return {
      waitingValidating,
      waitingConfirmation,
      theme,
      activeNav,
      installed,
    };
  },
});
</script>

<style></style>
