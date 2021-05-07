<template>
  <section class="overflow-hidden">
    <!-- 宣传幕布 -->
    <section class="relative h-xl z-0" data-aos="zoom-in">
      <!-- 例子效果 -->
      <vue-particles
        class="particles-wrap particles-size"
        color="#ffffff"
        :particle-size="1"
        :particles-number="2000"
        :click-effect="false"
        :hover-effect="false"
        :line-linked="false"
        :particle-opacity="1"
      />
      <!-- 文字描述 -->
      <section
        class="w-full lg:w-1/2 h-full mx-auto pt-8 pb-16 lg:px-0 flex flex-col items-center justify-between z-20"
      >
        <div />
        <div class="flex flex-col items-center mt-10">
          <!-- 标语部分 -->
          <section
            class="mb-6 sm:mb-10"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="420.875"
              height="100.652"
              class="w-64 h-16 sm:w-auto sm:h-auto fill-current text-white"
              viewBox="0 0 481 115.031"
            >
              <path
                id="椭圆_3_拷贝_23"
                data-name="椭圆 3 拷贝 23"
                class="cls-1"
                d="M1705.35,494.708q-10.965,0-17.16-8.122h-0.48V514.3q0,5.738-5.24,5.735c-3.5,0-5.24-1.91-5.24-5.735V434.5c0-3.824,1.74-5.735,5.24-5.735s5.24,1.911,5.24,5.735v3.345h0.48q4.29-9.073,17.16-9.08,25.74,1.914,27.65,33.449Q1731.1,493.283,1705.35,494.708Zm-0.95-56.385q-16.7.962-17.64,23.892,0.945,22.936,17.64,23.893,17.16-.951,18.11-23.893Q1721.565,439.28,1704.4,438.323Zm-64.23,56.385c-3.5,0-5.24-1.433-5.24-4.3V485.63q-7.155,9.564-17.64,9.078-26.7-.953-28.6-32.493,1.89-31.536,28.6-33.449,9.045,0,17.64,8.6v-3.344c0-3.18,1.74-4.935,5.24-5.256q4.77,0.481,4.77,5.256v56.386Q1644.46,494.708,1640.17,494.708Zm-22.88-56.385q-17.16.962-18.12,23.892,0.96,22.936,18.12,23.893,16.68-.471,17.64-23.893Q1633.97,438.809,1617.29,438.323Zm-68.41,51.607c-1.28,3.509-3.34,5.092-6.2,4.778-2.86.314-4.93-1.269-6.2-4.778l-13.82-43.962-13.83,43.962c-1.27,3.509-3.34,5.092-6.2,4.778-2.86.314-4.93-1.269-6.19-4.778l-18.12-52.084a22.036,22.036,0,0,1-.48-4.3,4.9,4.9,0,0,1,4.77-4.778q4.29,0,6.2,5.735l13.82,44.44,13.83-43.007q1.9-7.638,6.2-7.168,4.29-.47,6.19,7.168l13.83,43.007,13.83-44.44c1.26-3.824,3.33-5.735,6.19-5.735a4.9,4.9,0,0,1,4.77,4.778,22.036,22.036,0,0,1-.48,4.3Zm-89.48-20.946c-0.86,16.757-10.72,26.269-29.15,26.9-11.44-.5-18.88-3.517-22.34-7.3a6.434,6.434,0,0,1-2.28-5.655c0.81-3.86,5.73-6.7,10.43-2.2a23.379,23.379,0,0,0,14.08,5.146c11.12-.635,17.88-8.437,17.5-18.284-0.56-7.305-5.31-10.8-17.39-14.943-15.57-5.412-22.83-13.089-23.07-23.085a16.29,16.29,0,0,1,.23-3.842c2.5-12.228,12.28-20.251,26.39-20.716,8.85,0.666,15.26,3,18.7,5.993a4.882,4.882,0,0,1,2.73,4.4,0.184,0.184,0,0,0-.01.073c0.01,0.055.03,0.1,0.04,0.159,0,2.867-1.6,4.465-4.77,4.779-0.1,0-.2-0.011-0.31-0.018-0.07.007-.13,0.016-0.21,0.022a5.527,5.527,0,0,1-4.11-1.83c5.4,3.56-1.59-2.841-12.53-2.841-8.58.643-14.23,5.278-14.86,12.925,0,5.733,5.65,10.4,17.03,14.424C1451.71,448.837,1459.39,458.166,1459.4,468.984Zm-85.75-48.819q-6.2-.473-6.67-6.69,0.465-6.206,6.67-6.69,6.195,0.481,6.68,6.69Q1379.85,419.689,1373.65,420.165Zm-38.98,74.4-13.49-8.262a44.074,44.074,0,1,1,9.11-8.7l10.32,6.318a6.136,6.136,0,0,1,2.29,8.313A6.013,6.013,0,0,1,1334.67,494.563Zm-38.84-77.725a33.54,33.54,0,1,0,15.35,63.337l-10.92-6.681a6.136,6.136,0,0,1-2.29-8.313,6.014,6.014,0,0,1,8.23-2.333l15.09,9.243A33.563,33.563,0,0,0,1295.83,416.838Zm77.82,11.928q5.25,0,5.25,5.735V489.93q0,4.782-5.25,4.778c-3.5,0-5.24-1.59-5.24-4.778V434.5C1368.41,430.677,1370.15,428.766,1373.65,428.766Z"
                transform="translate(-1252 -405)"
              />
            </svg>
          </section>

          <!-- 描述部分 -->
          <p
            class="text-base sm:text-xl tracking-widest font-thin text-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {{ $t('index.banner.intro') }}
          </p>

          <!-- 按钮部分 -->
          <section
            class="mt-10 sm:mt-16 text-xs sm:text-sm font-bold flex flex-row"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            <locale-link
              to="/swap/exchange"
              :class="`bg-${theme}-assist-100`"
              class="py-3 px-8 rounded mr-4 hover:opacity-75 transition-normal"
            >
              {{ $t('index.banner.open') }}
            </locale-link>
            <a
              href="https://learn.qiswap.com"
              :class="`border-${theme}-mainBd`"
              class="py-3 px-8 border rounded hover:opacity-75 transition-normal"
              target="_blank"
            >
              {{ $t('index.banner.doc') }}
            </a>
          </section>
          <p class="mt-4 text-center md:px-6">
            {{ $t('index.banner.qiswap') }}
          </p>
        </div>

        <!-- more -->
        <div v-scroll-to="'#features'" class="more-content cursor-pointer">
          <img
            src="@/assets/icons/home/arrow-more.svg"
            alt=""
            class="w-8 select-none"
          />
        </div>
      </section>
    </section>

    <!-- 特点部分 -->
    <HomePlate id="features" v-bind="features" />

    <!-- 如何使用 -->
    <HomePlate id="doc" v-bind="use" />

    <!-- 常见问题 -->
    <HomePlate id="faq" v-bind="faq" outstand align="start" class="mb-24" />
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'home',
  data() {
    return {
      ...this.$t('index.plates')
    }
  },
  computed: {
    ...mapState(['theme'])
  },
  created() {},
  mounted() {
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start()
    //   setTimeout(() => this.$nuxt.$loading.finish(), 100000)
    // })
  }
}
</script>

<style>
.particles-size {
  width: 480px;
  height: 480px;
  margin-left: -240px;
  margin-top: -240px;
}
.particles-wrap {
  position: absolute;
  left: 50%;
  top: 48%;
  border-radius: 50%;
  overflow: hidden;
  z-index: -1;
  background-image: url('../assets/icons/home/home-bg.svg');
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
}
@media screen and (min-width: 640px) {
  .particles-size {
    width: 600px;
    height: 600px;
    margin-left: -300px;
    margin-top: -300px;
  }
}
.more-content {
  animation: shaking 1s ease infinite;
  position: relative;
}
.more-content::before,
.more-content::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  border: 2px solid #666;
  border-radius: 999px;
  transform: translate(-50%, -50%);
}
.more-content::before {
  animation: spread 2s ease infinite;
}
.more-content::after {
  animation: spread 2s ease 0.2s infinite;
}
@keyframes shaking {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
}
@keyframes spread {
  0% {
    width: 0%;
    height: 0%;
    opacity: 1;
  }
  30%,
  100% {
    width: 300%;
    height: 300%;
    opacity: 0;
  }
}
</style>
