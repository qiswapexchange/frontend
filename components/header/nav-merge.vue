<template>
  <nav class="w-full flex flex-col">
    <div
      class="
        w-full
        flex
        items-center
        justify-between
        mx-auto
        py-4
        px-2
        md:px-24
      "
    >
      <!-- logo part -->
      <HeaderLogoSvg />
      <!-- Language settings / Expand the menu -->
      <div class="flex items-center md:order-last">
        <!-- Language settings -->
        <HeaderDropdownMenu ref="lang" absolute>
          <template #label>
            <div
              class="
                group
                flex
                items-center
                border
                rounded-full
                py-1
                pl-4
                pr-2
                text-sm
              "
            >
              <div class="hidden md:block">
                {{ $i18n.locales.find((l) => l.code === $i18n.locale).name }}
              </div>
              <div class="md:hidden uppercase">
                {{ $i18n.locale }}
              </div>
              <IconTriangleDown
                :color="`text-${theme}-inverse-100`"
                size="w-6 h-4"
                class="
                  origin-center
                  transform
                  group-hover:rotate-180
                  transition-normal
                "
              />
            </div>
          </template>
          <!-- Language options -->
          <section class="flex flex-col">
            <nuxt-link
              v-for="{ code, name } in $i18n.locales"
              :key="code"
              :to="switchLocalePath(code)"
              class="
                text-sm
                w-20
                p-1
                text-center
                cursor-pointer
                hover:opacity-50
              "
            >
              {{ name }}
            </nuxt-link>
          </section>
        </HeaderDropdownMenu>
        <!-- Hamburger menu -->
        <div class="block md:hidden">
          <button
            class="flex items-center px-3 py-2 border rounded"
            :class="`border-${theme}-mainBd`"
            @click.stop="toggleMenu"
          >
            <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>{{ $t('nav.menu') }}</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>
      <!-- Navigation bar content -->
      <div
        :class="
          showMenu ? `m-0 bg-${theme}-main-200` : `-mr-64 bg-${theme}-main-200`
        "
        class="
          w-64
          h-screen
          md:w-auto
          md:h-auto
          fixed
          md:relative
          right-0
          inset-y-0
          md:m-0
          flex-grow
          md:block
          md:bg-transparent
          shadow-lg
          md:shadow-none
          transition-normal
          z-30
        "
      >
        <div class="flex flex-col md:flex-row justify-end items-center text-sm">
          <!-- Close button -->
          <section
            class="flex justify-between md:hidden m-4 pb-2 text-right border-b"
            :class="`border-${theme}-mainBd`"
          >
            <button @click.stop="toggleMenu">
              <svg
                t="1597902264498"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2123"
                width="24"
                height="24"
              >
                <path
                  d="M570.514286 512l292.571428-292.571429c14.628571-14.628571 14.628571-43.885714 0-58.514285-14.628571-14.628571-43.885714-14.628571-58.514285 0l-292.571429 292.571428-292.571429-292.571428c-14.628571-14.628571-43.885714-14.628571-58.514285 0-21.942857 14.628571-21.942857 43.885714 0 58.514285l292.571428 292.571429-292.571428 292.571429c-14.628571 14.628571-14.628571 43.885714 0 58.514285 14.628571 14.628571 43.885714 14.628571 58.514285 0l292.571429-292.571428 292.571429 292.571428c14.628571 14.628571 43.885714 14.628571 58.514285 0 14.628571-14.628571 14.628571-43.885714 0-58.514285l-292.571428-292.571429z"
                  fill="#ffffff"
                  p-id="2124"
                />
              </svg>
            </button>
          </section>

          <!-- Operation part -->
          <a
            v-if="!extensionInstalled"
            href="https://chrome.google.com/webstore/detail/qiwallet/cjfeohjffkdehdblcolicjhhnbphcmna"
            target="_blank"
            :class="`bg-transparent md:bg-${theme}-assist-100`"
            class="
              cursor-pointer
              leading-8
              md:leading-normal
              text-center
              mr-0
              md:mr-4
              py-4
              md:py-1
              px-6
              rounded-full
              hover:opacity-75
              transition-normal
            "
          >
            {{ $t('nav.install') }}
          </a>
          <div
            v-else-if="!connected || !account.loggedIn"
            :class="`bg-transparent md:bg-${theme}-assist-100`"
            class="
              cursor-pointer
              leading-8
              md:leading-normal
              text-center
              mr-0
              md:mr-4
              py-4
              md:py-1
              px-6
              rounded-full
              hover:opacity-75
              transition-normal
            "
            @click="connect"
          >
            {{ connecting ? $t('nav.connecting') : $t('nav.connect') }}
          </div>
          <div v-else class="mr-0 md:mr-4">
            <div
              :class="`bg-transparent md:bg-${theme}-assist-300`"
              class="
                cursor-pointer
                leading-10
                md:leading-normal
                text-center
                p-4
                md:p-px
                rounded-full
                hover:opacity-75
                transition-normal
              "
              @click="showTxs = true"
            >
              <template v-if="pendings === 0">
                <span class="inline-block md:py-1 pl-3 pr-2"
                  >{{ account.balance }} QTUM</span
                >
                <span
                  :class="`md:bg-${theme}-assist-100`"
                  class="h-full inline-block md:py-1 px-3 rounded-full"
                  >{{ account.address.slice(0, 4) }}...{{
                    account.address.slice(-4)
                  }}</span
                >
              </template>
              <div v-else class="flex items-center px-4 md:py-1">
                <Spinner :width="4" class="mr-2" />
                {{ $tc('nav.pending', pendings) }}
              </div>
            </div>
          </div>
          <a
            :href="`https://${domain}`"
            target="_blank"
            class="
              text-center
              leading-8
              md:leading-normal
              py-4
              md:mx-6
              transition-normal
            "
          >
            {{ $t('nav.browser') }}
          </a>

          <!-- logo -->
          <section class="block md:hidden mt-32 mx-auto opacity-50">
            <HeaderLogoSvg />
          </section>
        </div>
      </div>
    </div>

    <!-- Modal box -->
    <Modal v-model="showTxs" :title="$t('nav.accountModal.title')">
      <div v-if="account" class="">
        <!-- info -->
        <div
          class="w-full mx-auto py-4 px-4 mb-4 rounded-lg"
          :class="`bg-${theme}-main-400`"
        >
          <div class="flex mb-4">
            <img src="@/assets/icons/qtum.svg" alt="" class="mr-4" />
            <span class="text-gray-200 font-thin">{{ account.address }}</span>
          </div>
          <div class="flex justify-between pl-8">
            <button
              v-clipboard:copy="account.address"
              v-clipboard:success="copyFinish"
              class="
                flex
                items-center
                text-xs
                hover:opacity-75
                border
                px-2
                py-px
                rounded-full
              "
              :class="`text-${theme}-inverse-500 border-${theme}-inverse-500`"
            >
              <img src="@/assets/icons/copy.svg" alt="" class="w-3 mr-1" />
              <span>{{
                copyState
                  ? $t('nav.accountModal.copied')
                  : $t('nav.accountModal.copy')
              }}</span>
            </button>
            <a
              :href="`https://${domain}/address/${account.address}/`"
              class="
                flex
                items-center
                text-xs
                hover:opacity-75
                border
                px-2
                py-px
                rounded-full
              "
              :class="`text-${theme}-inverse-500 border-${theme}-inverse-500`"
              target="_blank"
            >
              <img src="@/assets/icons/share.svg" alt="" class="w-3 mr-1" />
              <span>{{ $t('nav.accountModal.view') }}</span>
            </a>
          </div>
        </div>
        <!-- record -->
        <h3 class="font-thin mb-2">
          {{ $t('nav.accountModal.record') }}
        </h3>
        <div
          class="flex flex-col overflow-hidden py-2 px-4 rounded-lg"
          style="height: 20rem"
          :class="`bg-${theme}-main-400`"
        >
          <div class="flex justify-between text-xs text-gray-600 mb-4">
            <div>{{ $t('nav.accountModal.type') }}</div>
            <div>{{ $t('nav.accountModal.status') }}</div>
          </div>
          <div
            v-if="filteredTxs.length === 0"
            class="flex-grow flex flex-col items-center mt-12"
          >
            <img src="@/assets/icons/empty.svg" alt="" class="w-40" />
            <span class="text-sm mt-4" :class="`text-${theme}-inverse-500`">{{
              $t('nav.accountModal.empty')
            }}</span>
          </div>
          <div v-else class="flex-grow overflow-y-auto" style="height: 24rem">
            <div class="h-full overflow-y-auto scrollBar">
              <SwapTx v-for="tx in filteredTxs" :key="tx.raw.txid" :tx="tx" />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </nav>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  useContext,
  onMounted,
  getCurrentInstance,
} from '@nuxtjs/composition-api';
import { DOMAIN, NETWORK } from '~/libs/constants';
import { useQrypto } from '~/libs/qrypto';

export default defineComponent({
  setup() {
    const {
      store: { state },
    } = useContext();
    const showMenu = ref(false);
    const showTxs = ref(false);
    const connecting = ref(false);
    const copyState = ref(false);
    const theme = computed(() => state.theme);
    const extensionInstalled = computed(() => state.swap.extensionInstalled);
    const connected = computed(() => state.swap.connected);
    const account = computed(() => state.swap.account);
    const domain = computed(
      () => DOMAIN[account.value?.network || NETWORK.MainNet]
    );
    const filteredTxs = computed(() =>
      state.swap.txs.filter((tx) => {
        return tx.address === account.value.address;
      })
    );
    const pendings = computed(
      () => filteredTxs.value.filter((t) => t.raw.confirmations === 0).length
    );
    const connect = async () => {
      if (connecting.value) {
        return;
      }
      connecting.value = true;
      try {
        await useQrypto().login();
      } catch (e) {}
      connecting.value = false;
    };
    const toggleMenu = () => {
      showMenu.value = !showMenu.value;
    };
    const copyFinish = () => {
      copyState.value = true;
      setTimeout(() => {
        copyState.value = false;
      }, 1000);
    };
    onMounted(() => {
      document.body.addEventListener(
        'click',
        () => {
          showMenu.value = false;
        },
        false
      );
      getCurrentInstance()?.$router?.afterEach(() => {
        showMenu.value = false;
      });
    });
    return {
      showMenu,
      showTxs,
      connecting,
      theme,
      extensionInstalled,
      connected,
      account,
      domain,
      pendings,
      filteredTxs,
      copyState,
      // methods
      connect,
      toggleMenu,
      copyFinish,
    };
  },
});
</script>
