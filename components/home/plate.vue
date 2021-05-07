<template>
  <!-- 首页 板块 -->
  <section class="container mx-auto pt-24">
    <!-- 标题部分 -->
    <section
      v-if="title"
      data-aos="fade-up"
      class="flex flex-col items-center mb-16"
    >
      <h2 class="text-2xl font-bold tracking-widest mb-10 uppercase">
        {{ title }}
      </h2>
      <img src="@/assets/icons/home/arrow.svg" alt="" />
    </section>

    <!-- 内容部分 -->
    <section class="flex flex-col sm:flex-row justify-center items-stretch">
      <section
        v-for="(item, index) in content"
        :key="index"
        class="w-5/6 lg:w-1/4 flex flex-col p-8 sm:p-6 lg:p-12 my-4 sm:my-0 sm:mr-6 last:mr-0"
        :class="contentStyle"
        data-aos="fade-up"
        :data-aos-delay="100 * index"
      >
        <img
          v-if="item.icon"
          :src="require(`@/assets/icons/home/${item.icon}.svg`)"
          class="w-12 h-12 mb-8"
        />
        <h3 class="text-base text-center font-bold mb-6">
          {{ item.title }}
        </h3>
        <p
          class="text-sm tracking-wider font-thin"
          :class="`text-${theme}-inverse-200 text-${align}`"
        >
          {{ item.content }}
        </p>
        <a
          v-if="item.action"
          :href="item.action"
          class="rounded-full text-sm font-thin mt-6 py-1 px-5 transition-normal hover:opacity-75"
          :class="`text-${theme}-main-100 bg-${theme}-inverse-100`"
          target="_blank"
        >
          {{ $t('common.detail') }} &gt;
        </a>
      </section>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    content: {
      type: Array,
      default: () => []
    },
    outstand: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: 'center'
    }
  },
  computed: {
    ...mapState(['theme']),
    contentStyle() {
      const result = []

      // 判断背景色
      this.outstand
        ? result.push(`bg-${this.theme}-assist-100`)
        : result.push(`bg-${this.theme}-main-300`)

      // 判断对齐方式
      switch (this.align) {
        case 'left':
          result.push('items-start')
          break
        case 'center':
          result.push('items-center')
      }

      return result
    }
  }
}
</script>
