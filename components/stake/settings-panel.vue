<template>
  <!-- Settings panel -->
  <section
    class="max-w-xl w-full mx-auto rounded-lg flow-root mt-8"
    :class="`bg-${theme}-main-300`"
  >
    <!-- Top button -->
    <div class="p-4 mb-2 text-sm flex justify-end">
      <div
        class="cursor-pointer flex items-center hover:opacity-75"
        @click="modalShow = true"
      >
        <img src="@/assets/icons/setting.svg" alt="" class="w-4 h-4 mr-2" />
        <span class="font-thin tracking-wider">{{ $t('swap.setting') }}</span>
      </div>
    </div>

    <!-- Content part -->
    <div class="px-4">
      <slot />
    </div>

    <!-- Modal box -->
    <Modal v-model="modalShow" :title="$t('swap.modal.settings')">
      <template>
        <!-- Proportion selection -->
        <div class="text-sm font-thin mb-10">
          <span>{{ $t('swap.modal.tolerance') }}</span>
          <div class="flex justify-between mt-4">
            <div
              v-for="val in toleranceList"
              :key="val"
              class="
                py-1
                sm:py-2
                mr-2
                w-16
                text-center
                rounded-full
                border
                cursor-pointer
                hover:opacity-75
              "
              :class="
                tolerance === val
                  ? `bg-${theme}-assist-200 border-${theme}-assist-200`
                  : `bg-transparent border-${theme}-inverse-200`
              "
              @click="setTolerance(val)"
            >
              {{ val }}%
            </div>
            <div class="relative flex-1 ml-2">
              <input
                v-model.number="tolerance"
                :placeholder="tolerance"
                class="
                  px-6
                  py-2
                  rounded-full
                  mr-2
                  w-full
                  border
                  focus:outline-none
                  text-right
                "
                :class="{
                  [`bg-${theme}-main-200 focus:border-${theme}-assist-200`]: true,
                  [`border-${theme}-assist-200`]: customTolerance,
                }"
              />
              <div class="absolute top-0 right-0 pr-3 py-2 my-px">%</div>
            </div>
          </div>
        </div>
        <!-- Minute -->
        <div class="text-sm font-thin mb-10">
          <span class="">{{ $t('swap.modal.deadline') }}</span>
          <div class="flex items-center mt-4">
            <input
              v-model.number="deadline"
              class="
                px-5
                py-2
                rounded-full
                mr-2
                w-20
                border
                focus:outline-none
                text-center
              "
              :class="`bg-${theme}-main-200`"
            />
            <span>{{ $t('swap.modal.minutes') }}</span>
          </div>
        </div>
      </template>
    </Modal>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      modalShow: false,
      toleranceList: [0.1, 0.5, 1],
    };
  },
  computed: {
    ...mapState(['theme']),
    deadline: {
      get() {
        return this.$store.state.swap.deadline;
      },
      set(deadline) {
        deadline = parseInt(deadline);
        if (deadline < 1 || Number.isNaN(deadline)) {
          return;
        }
        this.setDeadline(deadline);
      },
    },
    tolerance: {
      get() {
        return this.$store.state.swap.tolerance;
      },
      set(tolerance) {
        tolerance = parseFloat(tolerance);
        if (tolerance < 0 || tolerance >= 50 || Number.isNaN(tolerance)) {
          return;
        }
        this.setTolerance(tolerance);
      },
    },
    customTolerance() {
      return !this.toleranceList.includes(this.tolerance);
    },
  },
  watch: {},
  methods: {
    ...mapMutations('swap', ['setTolerance', 'setDeadline']),
  },
};
</script>

<style></style>
