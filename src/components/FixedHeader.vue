<script setup lang="ts">
import { ref, computed } from 'vue';
import type { NavTab } from '@/types/nav';
import DesktopNav from './DesktopNav.vue';
import MobileNav from './MobileNav.vue';

// Tab 数据结构
const TABS = [
  {
    name: '你的朋友',
    children: ['大龄二次元', '居家调酒师'],
  },
  {
    name: '你的伙伴',
    children: ['前端工程师', '江浙沪地陪'],
  },
];
const TABS_FOR_DEV = [
  {
    name: '内部文档',
    children: [
      {
        name: '大二投稿',
        path: 'daer',
      },
    ],
  },
];

const tabsInfo = computed<NavTab[]>(() => {
  const tabs: NavTab[] = TABS.map((tab) => ({
    label: tab.name,
    children: tab.children.map((child) => ({
      name: child,
      path: `/role/${child}`,
    })),
  }));
  if (import.meta.env.DEV) {
    TABS_FOR_DEV.forEach((tab) => {
      tabs.push({
        label: tab.name,
        children: tab.children.map((child) => ({
          name: child.name,
          path: `/_dev/${child.path}`,
        })),
      });
    });
  }
  return tabs;
});

// 移动端菜单状态
const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <header class="header">
    <div class="header-container header-container-wide">
      <div class="header-content">
        <router-link
          to="/"
          class="header-banner"
        >
          <span class="banner-text">侠小然是谁？</span>
        </router-link>

        <DesktopNav :tabs="tabsInfo" />
      </div>
    </div>

    <MobileNav
      :tabs="tabsInfo"
      :is-open="isMobileMenuOpen"
      @toggle="toggleMobileMenu"
      @close="closeMobileMenu"
    />
  </header>
</template>

<style lang="scss">
.header {
  // CSS 变量定义
  --header-height: var(--root-header-height, 60px);
  --header-blur: blur(8px);
  --header-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  --header-transition-speed: 0.3s;
  --color-bg: var(--root-header-color-bg, rgba(0, 0, 0, 0.9));
  --color-action-active: rgba(255, 255, 255, 0.05);
}

// frame layout
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: var(--color-bg);
  backdrop-filter: var(--header-blur);
}
.header-container-wide {
  height: var(--header-height);
  width: 100%;
}
.header-content {
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: stretch;
  gap: 48px;
}

// banner
.header-banner {
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s;
  height: 100%;
  display: flex;
  align-items: center;
}
.header-banner:hover {
  opacity: 0.8;
}
.banner-text {
  font-weight: 600;
  color: var(--color-heading);
}

// 移动端响应式样式
@media (max-width: 768px) {
  .header-container-wide {
    display: none;
  }
}

// 打印样式，隐藏
@media print {
  .header {
    display: none;
  }
}
</style>
