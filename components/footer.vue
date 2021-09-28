<template>
  <footer
    id="contact"
    class="
      container
      mx-auto
      py-20
      flex flex-col
      sm:flex-row
      justify-center
      items-center
      text-sm
      font-thin
      tracking-wider
    "
    :class="`text-${theme}-inverse-100`"
  >
    <!-- Content on the left -->
    <section class="w-5/6 sm:w-1/3 flex flex-col mr-0 mb-10 sm:mr-64 sm:mb-0">
      <img src="@/assets/icons/logo-full.svg" alt="" class="w-24" />
      <span class="my-4 text-xs">{{ $t('footer.intro') }}</span>
      <span>QiSwap &copy; 2021 All rights reserved.</span>
    </section>
    <!-- Content on the right -->
    <section class="w-5/6 sm:w-1/4 flex flex-col font-bold">
      <span>{{ $t('footer.contact') }}</span>
      <span class="my-3">contact@qiswap.com</span>
      <section class="flex items-center">
        <a
          v-for="(item, index) in contactUs"
          :key="index"
          class="w-5 mr-2 hover:opacity-75"
          :href="item.target"
          :title="item.title"
          target="_blank"
        >
          <img
            :src="require(`@/assets/icons/community/${item.icon}`)"
            alt="twitter"
            class="object-cover leading-5"
          />
        </a>
      </section>
    </section>
  </footer>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      contactUs: [
        {
          title: 'twitter',
          target: 'https://twitter.com/QiSwap',
          icon: 'twitter.svg',
        },
        {
          title: 'reddit',
          target: 'https://www.reddit.com/user/QiSwap',
          icon: 'reddit.svg',
        },
        {
          title: 'telegram',
          target: 'https://t.me/qiswapofficial',
          icon: 'telegram.svg',
        },
        {
          title: 'discord',
          target: 'https://discord.gg/WTJ3zcq',
          icon: 'discord.svg',
        },
        {
          title: 'medium',
          target: 'https://qiswapdex.medium.com',
          icon: 'medium.svg',
        },
      ],
    };
  },
  computed: {
    ...mapState(['theme']),
  },
};
</script>
