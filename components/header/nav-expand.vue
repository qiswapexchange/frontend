<template>
  <nav
    class="w-full flex items-center justify-between mx-auto py-4 px-2 md:px-24"
    @click.stop
  >
    <!-- logo 部分 -->
    <HeaderLogoSvg />
    <!-- 语言设置 / 拓展菜单 -->
    <div class="flex items-center lg:order-last">
      <!-- 语言设置 -->
      <HeaderDropdownMenu ref="lang" absolute @show="hideOtherDropdown('lang')">
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
            <div class="hidden lg:block">
              {{ $i18n.locales.find((l) => l.code === $i18n.locale).name }}
            </div>
            <div class="lg:hidden uppercase">
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
        <!-- 语言选项 -->
        <section class="flex flex-col">
          <nuxt-link
            v-for="{ code, name } in $i18n.locales"
            :key="code"
            :to="switchLocalePath(code)"
            class="text-sm w-20 p-1 text-center cursor-pointer hover:opacity-50"
          >
            {{ name }}
          </nuxt-link>
        </section>
      </HeaderDropdownMenu>
      <!-- 汉堡菜单 -->
      <div class="block lg:hidden">
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
    <!-- 导航栏内容 -->
    <div
      :class="
        showMenu ? `m-0 bg-${theme}-main-200` : `-mr-64 bg-${theme}-main-200`
      "
      class="
        w-64
        h-screen
        lg:w-auto
        lg:h-auto
        fixed
        lg:relative
        right-0
        inset-y-0
        lg:m-0
        flex-grow
        lg:block
        lg:bg-transparent
        shadow-lg
        lg:shadow-none
        transition-normal
        z-30
      "
    >
      <div class="flex flex-col lg:flex-row justify-end items-center text-sm">
        <!-- 关闭按钮 -->
        <section
          class="flex justify-between lg:hidden m-4 pb-2 text-right border-b"
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
        <!-- 打开 swap -->
        <locale-link
          v-if="extensionInstalled"
          to="/swap/exchange"
          class="
            text-center
            leading-8
            lg:leading-normal
            py-4
            lg:mx-6
            transition-normal
          "
          :class="`hover:text-${theme}-assist-200`"
        >
          {{ $t(`nav.transaction`) }}
        </locale-link>
        <a
          href="https://learn.qiswap.com"
          class="
            text-center
            leading-8
            lg:leading-normal
            py-4
            lg:mx-6
            transition-normal
          "
          :class="`hover:text-${theme}-assist-200`"
          target="_blank"
        >
          {{ $t(`nav.doc`) }}
        </a>

        <!-- 联系我们 -->
        <section
          v-for="(item, index) in navList"
          :key="index"
          v-scroll-to="item.target"
          class="
            cursor-pointer
            text-center
            leading-8
            lg:leading-normal
            py-4
            lg:mx-6
            transition-normal
          "
          :class="`hover:text-${theme}-assist-200`"
        >
          {{ $t(`nav.${item.name}`) }}
        </section>

        <!-- logo -->
        <section class="block lg:hidden mt-32 mx-auto opacity-50">
          <HeaderLogoSvg />
        </section>
      </div>
    </div>
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
export default defineComponent({
  setup() {
    const {
      store: { state },
    } = useContext();
    const theme = computed(() => state.theme);
    const extensionInstalled = computed(() => state.swap.extensionInstalled);
    const showMenu = ref(false);
    const toggleMenu = () => {
      showMenu.value = !showMenu.value;
    };
    function hideOtherDropdown(name) {
      for (const n in this.$refs) {
        if (name !== n && this.$refs[n].hide) {
          this.$refs[n].hide();
        }
      }
    }
    const navList = [
      { name: 'contact', target: '#contact' },
      { name: 'faq', target: '#faq' },
    ];
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
      theme,
      extensionInstalled,
      showMenu,
      toggleMenu,
      hideOtherDropdown,
      navList,
    };
  },
});
</script>
