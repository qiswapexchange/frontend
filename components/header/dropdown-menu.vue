<template>
  <section
    :class="{ 'md:px-2': !absolute, 'px-2': absolute }"
    class="relative py-2"
    @mouseenter="toggle(true)"
    @mouseleave="toggle(false)"
  >
    <!-- 下拉菜单 label -->
    <div
      class="cursor-pointer hover:opacity-75"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
      @click.stop="toggle(!show)"
    >
      <slot name="label">
        <div class="flex items-center">
          {{ label }}
          <div v-if="triangle" :class="triangleClass" class="ml-1" />
        </div>
      </slot>
    </div>
    <!-- 下拉菜单 content -->
    <div :class="dropdownClass" class="z-40 p-1 md:p-2">
      <slot />
    </div>
  </section>
</template>

<script>
import debounce from 'debounce'

export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    triangle: {
      type: Boolean,
      default: true
    },
    absolute: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'right'
    },
    direction: {
      type: String,
      default: 'down'
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    dropdownClass() {
      const down = this.direction === 'down'
      return {
        hidden: !this.show,
        block: this.show,
        'right-0': this.position === 'right' && down,
        'left-0': this.position === 'left' && down,
        'top-8': down,
        'left-full top-0': !down,
        'border shadow-md rounded absolute pb-2': this.absolute,
        'md:bg-gray-900 md:border md:shadow-md md:rounded md:absolute': !this.absolute // eslint-disable-line
      }
    },
    triangleClass() {
      const down = this.direction === 'down'
      return {
        'c-triangle-down': !this.show,
        'c-triangle-up': this.show,
        'md:c-triangle-right': !down
      }
    }
  },
  watch: {
    show(show) {
      if (show) {
        this.$emit('show')
      } else {
        this.$emit('hide')
      }
    }
  },
  mounted() {
    this.toggle = debounce(this.toggle.bind(this), 200, true)
    this.hide = this.hide.bind(this)
    document.body.addEventListener('click', this.hide, false)
    this.$router.afterEach(this.hide)
  },
  destroyed() {
    document.body.removeEventListener('click', this.hide, false)
  },
  methods: {
    onTouchStart() {
      this.lastTouch = Date.now()
    },
    onTouchEnd(e) {
      if (this.lastTouch && Date.now() - this.lastTouch) {
        this.toggle(!this.show)
        e.preventDefault()
      }
    },
    hide() {
      this.toggle(false)
    },
    toggle(show) {
      this.show = show
    }
  }
}
</script>
