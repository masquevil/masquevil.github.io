<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import useMdParser from '@/hooks/useMdParser';

interface HeadingItem {
  depth: number;
  text: string;
  id: string;
}

interface HeadingTreeItem extends HeadingItem {
  parentId?: string;
}

const props = defineProps<{ content: string }>();

const { extractHeadings } = useMdParser();
const headings = computed<HeadingItem[]>(() => extractHeadings(props.content));

const headingTree = computed<HeadingTreeItem[]>(() => {
  let currentH2Id = '';
  return headings.value.map((heading) => {
    if (heading.depth === 2) {
      currentH2Id = heading.id;
    }
    return {
      ...heading,
      parentId: heading.depth === 3 ? currentH2Id : undefined,
    };
  });
});

const isMobile = ref(false);
const isExpanded = ref(false);
const currentHeadingId = ref<string>('');
const currentHeadingText = ref<string>('');
const currentH2Id = ref<string>('');

const visibleDesktopHeadings = computed<HeadingTreeItem[]>(() => {
  return headingTree.value.filter((heading) => {
    if (heading.depth <= 2) return true;
    return heading.depth === 3 && heading.parentId === currentH2Id.value;
  });
});

const handleResize = () => {
  isMobile.value = window.innerWidth < 1040;
};

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};

const updateCurrentHeading = () => {
  if (!headings.value.length) {
    currentHeadingId.value = '';
    currentHeadingText.value = '';
    currentH2Id.value = '';
    return;
  }

  const headerHeight =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--root-header-height'),
    ) || 60;
  const scrollY = window.scrollY + (isMobile.value ? 0 : headerHeight) + 20;

  let activeHeadingIndex = -1;

  for (let i = headings.value.length - 1; i >= 0; i--) {
    const headingAnchor = document.getElementById(headings.value[i].id);
    const heading = headingAnchor && headingAnchor.parentElement;
    if (heading && heading.offsetTop <= scrollY) {
      activeHeadingIndex = i;
      break;
    }
  }

  if (activeHeadingIndex === -1) {
    currentHeadingId.value = '';
    currentHeadingText.value = '';
    currentH2Id.value = '';
    return;
  }

  const activeHeading = headings.value[activeHeadingIndex];
  currentHeadingId.value = activeHeading.id;
  currentHeadingText.value = activeHeading.text;

  let activeH2Id = '';
  for (let i = activeHeadingIndex; i >= 0; i--) {
    if (headings.value[i].depth === 2) {
      activeH2Id = headings.value[i].id;
      break;
    }
  }
  currentH2Id.value = activeH2Id;
};

watch(headings, () => updateCurrentHeading(), { immediate: true });

onMounted(() => {
  handleResize();
  updateCurrentHeading();
  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', updateCurrentHeading);

  return () => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('scroll', updateCurrentHeading);
  };
});
</script>

<template>
  <div
    v-if="headings.length"
    :class="['container', { 'is-mobile': isMobile, 'is-mobile-expanded': isExpanded }]"
  >
    <!-- 桌面版 -->
    <div
      v-if="!isMobile"
      class="aside-desktop"
    >
      <div class="aside-title">目录</div>
      <ul class="aside-list">
        <li
          v-for="heading in visibleDesktopHeadings"
          :key="heading.id"
          :class="['aside-list-item', `aside-list-item--level-${heading.depth}`]"
        >
          <a
            class="aside-link"
            :class="{ 'aside-link--active': currentHeadingId === heading.id }"
            :href="`#${heading.id}`"
            >{{ heading.text }}</a
          >
        </li>
      </ul>
    </div>

    <!-- 手机版 -->
    <div
      v-else
      class="aside-mobile"
    >
      <button
        class="aside-mobile-trigger"
        @click="toggleExpanded"
      >
        {{ isExpanded ? '关闭' : currentHeadingText || '目录' }}
      </button>

      <div class="aside-mobile-menu">
        <div class="aside-title">目录</div>
        <ul class="aside-list">
          <li
            v-for="heading in headings"
            :key="heading.id"
            :class="['aside-list-item', `aside-list-item--level-${heading.depth}`]"
          >
            <a
              class="aside-link"
              :href="`#${heading.id}`"
              >{{ heading.text }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 20px 0;
  max-height: calc(100vh - 120px);
  overflow: auto;
  font-size: 12px;

  &.is-mobile {
    padding: 0;
    max-height: none;
    font-size: 14px;
  }
}

.aside-title {
  margin-bottom: 4px;
  color: var(--color-text);
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.aside-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.aside-list-item--level-2 {
  margin-top: 8px;
}

.aside-link {
  display: block;
  padding-top: 4px;
  padding-bottom: 4px;
  line-height: 1.6;
  color: var(--color-text);

  &:hover,
  &:focus {
    color: var(--color-heading);
  }

  .aside-list-item--level-2 & {
    color: oklch(80% 0.04 290);
  }

  .aside-list-item--level-3 & {
    padding-left: 8px;
  }
}
.aside-link--active {
  color: var(--color-primary);
  font-weight: 600;
}

.aside-mobile-trigger {
  display: block;
  width: 100%;
  padding: 12px 24px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
}

.aside-mobile-menu {
  display: none;
  max-height: 50vh;
  overflow-y: auto;
  border-top: 1px solid var(--color-border);
  padding: 16px 24px;
}

.is-mobile.is-mobile-expanded .aside-mobile-menu {
  display: block;
}
</style>
