<script setup lang="ts">
import { computed } from 'vue';
import useMdParser from '../hooks/useMdParser';

interface Props {
  content: string;
  theme?: '404';
}

const props = withDefaults(defineProps<Props>(), {});

const { parse } = useMdParser();

const html = computed(() => parse(props.content));
</script>

<template>
  <div
    class="markdown-renderer"
    :class="{ 'theme-404': props.theme === '404' }"
    v-html="html"
  ></div>
</template>

<style lang="scss">
.markdown-renderer {
  --color-title: var(--color-heading);
  --color-title-small: var(--color-text);
  --color-p: var(--color-text);

  color: var(--color-p);
}

// basic styles for markdown elements
.md-heading {
  position: relative;
  scroll-margin-top: calc(var(--root-header-height, 60px) + 12px);
}
.md-h1 {
  color: var(--color-title);
  margin: 20px 0;
  font-size: 36px;
  font-weight: 600;
  text-align: center;
}
.md-h2 {
  color: var(--color-title);
  margin: 36px 0 18px;
  font-size: 24px;
  font-weight: 600;
}
.md-h3 {
  color: var(--color-title);
  margin: 18px 0 12px;
  font-size: 20px;
  font-weight: 600;
}
.md-h4 {
  color: var(--color-title-small);
  margin: 12px 0 6px;
  font-size: 16px;
  font-weight: 500;
}

.md-p {
  font-size: 16px;
  margin-bottom: 12px;
  line-height: 1.6;
}

.md-hr {
  margin: 24px 0;
  border: none;
  border-top: 1px solid var(--color-border);
}

.md-strong {
  font-weight: 600;
  color: var(--color-title);
}

.md-ul,
.md-ol {
  margin: 12px 0;
  padding-inline-start: 24px;
}

.md-img-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-bottom: 18px;

  .md-img-caption {
    letter-spacing: 0.12em;
  }
  .md-img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
  }
}

.theme-404 {
  text-align: center;

  .md-h1 {
    font-size: 120px;
    line-height: 1;
    margin-bottom: 40px;
  }

  .md-p {
    line-height: 2;
    margin-bottom: 24px;
  }
}

@media (max-width: 1040px) {
  .md-heading {
    position: relative;
    scroll-margin-top: 12px;
  }
}
</style>

<style lang="scss">
// styles for custom markdown extensions
.md-validity-tag {
  display: block;
  margin: -8px auto;
  padding: 4px 12px;
  width: fit-content;
  color: #9286ab;
  border: 1px solid currentColor;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1;
}

.md-alert {
  margin-bottom: 12px;
  border-radius: 8px;
  overflow: hidden;

  &-default {
    background-color: oklch(48% 0.08 270);
    & .md-alert-title {
      background-color: oklch(60% 0.08 270);
    }
  }

  & .md-alert-title {
    padding: 12px 16px;
    font-weight: 600;
    font-size: 1.12em;
  }

  & .md-alert-content {
    padding: 12px;
  }

  & .md-p {
    text-indent: 1em;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

<style lang="scss">
// 非常不通用的一些特殊样式
.markdown-renderer > .md-p {
  text-indent: 1em;
}
.md-validity-tag {
  text-indent: 0;
}
</style>
