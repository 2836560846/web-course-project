<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import dayjs from 'dayjs'
import ZhiHu from './components/zhiHu.vue'

const nowText = ref(dayjs().format('YYYY年MM月DD日 HH:mm:ss'))
let timerId = null

onMounted(() => {
  timerId = window.setInterval(() => {
    nowText.value = dayjs().format('YYYY年MM月DD日 HH:mm:ss')
  }, 1000)
})

onBeforeUnmount(() => {
  if (timerId) window.clearInterval(timerId)
})

// background shrink animation state
const isAnimating = ref(false)
const clipPath = ref('')
const overlayBgClass = ref('')
const overlayStyle = computed(() => ({
  clipPath: clipPath.value,
  WebkitClipPath: clipPath.value,
}))

const startBgShrinkAnimation = (evt) => {
  const isDark = document.documentElement.classList.contains('dark')
  overlayBgClass.value = isDark ? 'bg-zinc-900' : 'bg-white'

  const x = evt?.clientX ?? window.innerWidth / 2
  const y = evt?.clientY ?? window.innerHeight / 2

  const maxX = Math.max(x, window.innerWidth - x)
  const maxY = Math.max(y, window.innerHeight - y)
  const maxRadius = Math.hypot(maxX, maxY)

  clipPath.value = `circle(${Math.ceil(maxRadius)}px at ${x}px ${y}px)`
  isAnimating.value = true
  requestAnimationFrame(() => {
    clipPath.value = `circle(0px at ${x}px ${y}px)`
  })
}

const onThemeChange = (themeName) => {
  document.body.className = themeName
}

const setLight = (evt) => {
  startBgShrinkAnimation(evt)
  document.documentElement.classList.remove('dark')
}

const setDark = (evt) => {
  startBgShrinkAnimation(evt)
  document.documentElement.classList.add('dark')
}
</script>

<template>
  <div class="relative w-full bg-white text-black dark:bg-zinc-900 dark:text-zinc-100 min-h-screen transition-colors duration-300">
    <div v-if="isAnimating" class="theme-overlay fixed inset-0 z-0 pointer-events-none" :class="overlayBgClass" :style="overlayStyle" @transitionend="isAnimating = false"></div>
    <div class="relative z-10">
      <div class="w-full flex items-center justify-between p-4">
        <img src="./assets/vue.svg" alt="Vue logo" class="h-10 w-auto" />
        <div class="flex items-center gap-2">
          <h3>背景切换</h3>
          <button class="px-4 py-2 rounded bg-gray-200 dark:bg-zinc-700" @click="(e) => setLight(e)">Light</button>
          <button class="px-4 py-2 rounded bg-gray-200 dark:bg-zinc-700" @click="(e) => setDark(e)">Dark</button>
        </div>
      </div>
      <h2 style="text-align:center;">Vite + Vue</h2>
      <div style="text-align:center; margin-top:24px;">
        <!-- <div style="margin-bottom:8px;">{{ nowText }}</div> -->
      </div>
      <header style="display:flex;align-items:center;justify-content:center;gap:8px;margin:12px 0;">
        <h3>主题切换</h3>
        <button class="px-3 py-1 rounded border border-gray-300 bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700" @click="onThemeChange('default')">default</button>
        <button class="px-3 py-1 rounded border border-gray-300 bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700" @click="onThemeChange('peaple')">peaple</button>
        <button class="px-3 py-1 rounded border border-gray-300 bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700" @click="onThemeChange('spring')">spring</button>
      </header>
      
      <div style="margin-bottom:12px;display:flex;justify-content:center;gap:8px;">
        <button class="bg-primary text-white">primary</button>
        <button class="bg-warning text-white">warning</button>
        <button class="bg-danger text-white">danger</button>
        <button class="bg-info text-white">info</button>
      </div>
      <ZhiHu />
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<style scoped>
.theme-overlay {
  transition: clip-path 500ms ease, -webkit-clip-path 500ms ease;
  will-change: clip-path;
}
</style>