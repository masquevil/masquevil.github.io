<script setup lang="ts">
import { onMounted } from 'vue';

interface Emits {
  (event: 'url-ready', url: string): void;
}

const emit = defineEmits<Emits>();

onMounted(() => {
  const svgHeartbeat = document.getElementById('svg-heartbeat');
  if (!svgHeartbeat) return;
  const url = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgHeartbeat.outerHTML)}")`;
  emit('url-ready', url);
});
</script>

<template>
  <div
    id="data-image-source"
    class="data-image-source"
  >
    <svg
      id="svg-heartbeat"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
    >
      <!-- 心跳图案 -->
      <path
        d="
          M0 100
          L120 100

          L130 80
          L140 120
          L150 100

          L210 100
          L220 80
          L230 160
          L250 40
          L260 120
          L270 100

          L300 100
        "
        fill="none"
        stroke="#9286ab"
        stroke-width="4"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
      <!-- 心形图案 -->
      <path
        d="
          M270 215
          C270 200 250 195 245 210
          C240 195 220 200 220 215
          C220 230 235 240 245 250
          C255 240 270 230 270 215
          Z
        "
        fill="none"
        stroke="#9286ab"
        stroke-width="4"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.data-image-source {
  width: 0;
  height: 0;
  overflow: hidden;
  position: absolute;
  visibility: hidden;
}
</style>
