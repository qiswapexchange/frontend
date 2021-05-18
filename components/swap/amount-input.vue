<!--eslint-disable vue/no-mutating-props-->
<template>
  <div
    class="flex items-center rounded-lg mb-4 py-3 flex-1"
    :class="`bg-${theme}-main-400`"
  >
    <input
      ref="input"
      v-model.number="tokenAmount.input"
      class="appearance-none bg-transparent focus:outline-none pl-6 w-full"
      placeholder="0.0"
      :disabled="!tokenAmount.selected"
      @focus="tokenAmount.inputing = true"
      @blur="tokenAmount.inputing = false"
    />
    <div
      v-if="tokenAmount.selected && showMax"
      class="py-1 px-2 mr-2 text-xs cursor-pointer hover:opacity-75 rounded"
      :class="`bg-${theme}-assist-300`"
      @click="setMax"
    >
      Max
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tokenAmount: {
      type: Object,
      default() {
        return {};
      },
    },
    showMax: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },
  methods: {
    setMax(e) {
      e.preventDefault();
      this.$refs.input.focus();
      // eslint-disable-next-line vue/no-mutating-props
      this.tokenAmount.input = this.tokenAmount.balance;
    },
  },
};
</script>
