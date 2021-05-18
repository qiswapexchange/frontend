<template>
  <section
    :class="{ hidden: !loading, block: loading }"
    class="
      fixed
      z-50
      inset-0
      bg-black
      flex flex-col
      items-center
      justify-center
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="352"
      height="358"
      viewBox="0 0 176 179"
    >
      <metadata>
        <x:xmpmeta
          xmlns:x="adobe:ns:meta/"
          x:xmptk="Adobe XMP Core 5.6-c138 79.159824, 2016/09/14-01:09:01        "
        >
          <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
            <rdf:Description rdf:about="" />
          </rdf:RDF>
        </x:xmpmeta>
      </metadata>
      <path
        id="圆角矩形_1_拷贝_12"
        data-name="圆角矩形 1 拷贝 12"
        class="loading-path"
        d="M3348.2,2698.81a87.818,87.818,0,0,1-10.65,9.05l11.41,4.81a7.893,7.893,0,0,1,4.58,10.27,8.129,8.129,0,0,1-10.46,4.5l-23.09-9.74A87.714,87.714,0,1,1,3348.2,2698.81Zm-111.72-113.88-0.32.32a7.4,7.4,0,0,1-1.07.9,71.771,71.771,0,0,0,61.15,121.54l-2.63-1.11a7.672,7.672,0,0,1-2.33-1.39,47.771,47.771,0,0,1-14.62-70.2c2.56-3.38,5.98-6.01,8.41-9.55a31.756,31.756,0,0,0-3.59-40.17A31.893,31.893,0,0,0,3236.48,2584.93Zm100.33,1.08a71.577,71.577,0,0,0-50.82-20.98c-1.62,0-3.23.05-4.84,0.17a48.008,48.008,0,0,1,11.81,8.78,47.407,47.407,0,0,1,13.77,33.93,48.388,48.388,0,0,1-2.15,13.88,47.742,47.742,0,0,1-5.52,11.74,57.649,57.649,0,0,1-6.68,8.02,35.47,35.47,0,0,0-2.68,3.2,31.7,31.7,0,0,0,44.79,44.07c0.76-.58,5.27-4.51,5.76-5.07A71.556,71.556,0,0,0,3336.81,2586.01Zm-20.6,94.4a12.846,12.846,0,1,1,6.79-16.86A12.881,12.881,0,0,1,3316.21,2680.41Zm-47.03-65.3a12.848,12.848,0,1,1,6.78-16.86A12.881,12.881,0,0,1,3269.18,2615.11Z"
        transform="translate(-3198 -2549)"
      />
    </svg>

    <p class="text-white text-4xl mt-4 font-thin">
      {{ $t('common.loading') }}
    </p>
  </section>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>

<style>
.loading-path {
  stroke: #fff;
  fill: none;
  stroke-width: 1px;
  animation: loading 2s linear;
  animation-iteration-count: infinite;
  stroke-dasharray: 100% 0%;
  stroke-dashoffset: 0%;
}
@keyframes loading {
  0% {
    stroke-dasharray: 100% 200%;
    stroke-dashoffset: 100%;
  }
  80%,
  100% {
    stroke-dasharray: 100% 0%;
    stroke-dashoffset: 0%;
  }
}
</style>
