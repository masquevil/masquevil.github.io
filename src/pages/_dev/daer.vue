<script setup lang="ts">
import { reactive } from 'vue';

import MarkdownRenderer from '@/components/MarkdownRenderer.vue';
import PageAside from '@/components/PageAside.vue';
import DataImageSource from '@/components/DataImageSource.vue';
import docOrigin from '@/docs/大龄二次元.md';
import docDev from '@/docs/_dev/大二抽奖.md';

const doc = docOrigin + docDev;

const urlRefs = reactive<Record<string, string>>({});

function onUrlReady(key: string, url: string) {
  urlRefs[key] = url;
}
</script>

<template>
  <main class="page">
    <div class="container">
      <MarkdownRenderer
        :content="doc"
        class="theme-daer"
      />

      <DataImageSource @url-ready="onUrlReady('svg-heartbeat', $event)" />
    </div>

    <div class="aside-wrapper">
      <PageAside :content="doc" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 36px 36px 96px;
}
</style>

<style lang="scss">
.theme-daer {
  .md-h2 {
    border-top: 0.5px solid rgba(0, 0, 0, 0.5);
    height: 400px;
    width: 400px;
    margin: 60px -36px 0;
    display: flex;
    align-items: flex-end;
    background-image: v-bind("urlRefs['svg-heartbeat']");

    .md-heading-text {
      display: inline-block;
      margin: 36px 36px 60px;
      font-size: 36px;
    }
  }

  .md-h2:last-of-type {
    margin-bottom: -220px;
    align-items: flex-start;
    z-index: -1;

    & ~ p {
      margin-bottom: 4px;
      line-height: 1.4;
    }
  }
}
</style>
