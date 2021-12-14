<template>
  <nuxt-link
    :to="localePath(to)"
    class="
      group
      flex-grow
      text-center
      py-2
      px-8
      font-thin
      relative
      transition-normal
    "
    :class="`bg-${theme}-${bgColor}-100 text-${theme}-${txColor}-100 hover:bg-${theme}-${bgColor}-200`"
  >
    {{ label }}
    <section
      class="
        w-10
        absolute
        inset-y-0
        transform
        -skew-x-12
        z-10
        transition-normal
      "
      :class="[
        `bg-${theme}-${bgColor}-100  group-hover:bg-${theme}-${bgColor}-200`,
        right ? 'right-0' : 'left-0',
      ]"
    />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      default: '/',
    },
    label: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      default: 'dark',
    },
    active: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    bgColor() {
      if (this.active) {
        return 'assist';
      }

      return 'inverse';
    },
    txColor() {
      if (this.active) {
        return 'inverse';
      }

      return 'main';
    },
  },
};
</script>

<style></style>
