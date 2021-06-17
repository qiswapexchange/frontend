<template>
  <div class="px-4 flex-grow">
    <section
      class="max-w-xl w-full mx-auto rounded-lg flow-root mt-8"
      :class="`bg-${theme}-main-300`"
    >
      <div class="px-4 pt-4">
        <div class="flex rounded-lg overflow-hidden pb-4">
          <swap-link
            to="/stake/stake"
            :label="$t('swap.stake')"
            :theme="theme"
            :active="activeNav === 'stake'"
            right
          />
          <swap-link
            to="/stake/unstake"
            :label="$t('swap.unstake')"
            :theme="theme"
            :active="activeNav === 'unstake'"
          />
        </div>
        <nuxt-child />
      </div>
    </section>

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
import { useWs } from '~/libs/ws';

export default defineComponent({
  setup() {
    const { store, route } = useContext();
    const { state, commit, dispatch } = store;
    const qrypto = useQrypto(state.swap.extensionId);

    const waitingValidating = ref(false);
    const waitingConfirmation = ref(false);
    const theme = computed(() => state.theme);
    const activeNav = computed(() => {
      return route.value.path?.match(/stake\/(.+?)(\/|$)/)?.[1] || 'stake';
    });

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
