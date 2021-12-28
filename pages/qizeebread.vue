<template>
  <div class="px-4 flex-grow">
    <QizeebreadSettingsPanel>
      <!--  Select part -->
      <div class="flex justify-between overflow-hidden py-1">
        <span>APR</span>
        <span>{{ apr.toString() }} %</span>
      </div>
      <div class="flex justify-between overflow-hidden py-1">
        <span>Rewards</span>
        <span>{{ pendingRewards.toString() }} QI</span>
      </div>
      <div class="flex justify-between overflow-hidden py-1 pb-4">
        <span></span>
        <button
          :class="`bg-${theme}-assist-100`"
          class="py-1 px-4 rounded hover:opacity-75 transition-normal"
          @click="harvest"
        >
          Claim
        </button>
      </div>
    </QizeebreadSettingsPanel>
    <QizeebreadSettingsPanel>
      <!--  Select part -->
      <div class="flex rounded-lg overflow-hidden mb-4">
        <qizeebread-link
          to="/qizeebread/stake"
          :label="$t('qizeebread.stake')"
          :theme="theme"
          :active="activeNav === 'stake'"
          right
        />
        <qizeebread-Link
          to="/qizeebread/unstake"
          :label="$t('qizeebread.unstake')"
          :theme="theme"
          :active="activeNav === 'unstake'"
        />
      </div>

      <!-- Display part -->
      <nuxt-child />
    </QizeebreadSettingsPanel>

    <!-- Modal box -->
    <Modal v-model="waitingValidating" :can-close="false">
      <div class="h-full flex flex-col items-center justify-center">
        <Spinner class="my-3" :class="`text-${theme}-assist-300`" :width="20" />
        {{ $t('swap.waitingValidating') }}
      </div>
    </Modal>

    <!-- Modal box -->
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
import { useExchange } from '~/libs/qizeebread';
import { useWs } from '~/libs/ws';

export default defineComponent({
  setup() {
    const { store, route, $axios } = useContext();
    const { state, commit, dispatch } = store;
    const qrypto = useQrypto(state.swap.extensionId);
    const qizeebread = useExchange();

    const waitingValidating = ref(false);
    const waitingConfirmation = ref(false);
    const theme = computed(() => state.theme);
    const activeNav = computed(() => {
      return (
        route.value.path?.match(/qizeebread\/(.+?)(\/|$)/)?.[1] || 'exchange'
      );
    });
    const apr = computed(() => qizeebread.apr);

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
      console.log('tx listening ====>', tx);
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

    const pendingRewards = computed(() => qizeebread.pendingQI);

    return {
      waitingValidating,
      waitingConfirmation,
      theme,
      activeNav,
      installed,
      apr,
      pendingRewards,
      harvest: qizeebread.harvest.bind(qizeebread),
    };
  },
});
</script>

<style></style>
