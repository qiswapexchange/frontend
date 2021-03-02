<template>
  <!-- Swap 模态框 -->
  <section v-show="value" class="z-30 fixed inset-0 flex flex-col items-center justify-center">
    <!-- 遮罩层 -->
    <div class="w-full h-full bg-black opacity-75 absolute" />
    <!-- 面板部分 -->
    <div class="max-h-2xl max-w-md w-full overflow-y-auto rounded-lg flex flex-col relative p-4 mb-10" :class="[`bg-${theme}-main-300`, { 'py-8': !title }]">
      <button v-if="canClose" class="absolute right-0 top-0 mr-5 mt-5" @click="close">
        <img src="@/assets/icons/close.svg" class="w-4 h-4">
      </button>
      <!-- 头部信息 -->
      <h3 v-if="title" class="font-thin mb-3">
        {{ title }}
      </h3>
      <!-- 内容插槽部分 -->
      <slot />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    },
    canClose: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState([
      'theme'
    ])
  },
  methods: {
    close () {
      this.$emit('input', false)
    }
  }
}
</script>

<style>

</style>
