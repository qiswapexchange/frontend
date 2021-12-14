<template>
  <!-- Settings panel -->
  <section
    class="max-w-xl w-full mx-auto rounded-lg flow-root mt-8"
    :class="`bg-${theme}-main-300`"
  >
    <!-- Top button -->
    <div class="p-2 mb-2 text-sm flex justify-end"></div>

    <!-- Content part -->
    <div class="px-4">
      <slot />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['theme']),
  },
};
</script>

<style></style>
