<template>
  <div class="zhihu-container">
    <h2 class="title">知乎热榜</h2>
    <!-- eslint-disable vue/no-undef -->
    <ul class="hot-list">
      <!-- @vue-ignore -->
      <li
        v-for="(item, index) in list"
        :key="item.target.id"
        class="hot-item"
        @click="onToggle(item.target.url)"
        title="查看问题详情"
      >
        <span class="rank" :data-rank="index + 1">{{ index + 1 }}</span>
        <img
          v-if="getThumb(item)"
          class="thumb"
          :src="getThumb(item)"
          :alt="item.target.title"
          loading="lazy"
        />
        <div class="content">
          <span class="hot-title">{{ item.target.title }}</span>
          <p v-if="getExcerpt(item)" class="excerpt">{{ getExcerpt(item) }}</p>
          <div v-if="getStats(item).length" class="meta">
            <span
              v-for="s in getStats(item)"
              :key="s.key"
              class="tag"
            >{{ s.label }} {{ s.value }}</span>
          </div>
        </div>
        <span class="open-icon" aria-hidden>↗</span>
      </li>
    </ul>
    <!-- eslint-enable vue/no-undef -->
  </div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue'

const list = ref([])
const api = 'https://m1.apifoxmock.com/m1/7074910-0-default'

const getData = async () => {
  const url = `${api}/zhihuHot/list`
  const response = await fetch(url)
  const res = await response.json()
  list.value = res.data
}

onMounted(() => { void getData() })

const onToggle = (url) => {
  const id = url.split('questions/')[1]
  window.open(`https://www.zhihu.com/question/${id}`)
}

const stripHtml = (html) =>
  typeof html === 'string' ? html.replace(/<[^>]*>/g, '') : ''

const formatNumber = (value) => {
  const n = Number(value)
  if (!Number.isFinite(n)) return ''
  if (n >= 10000) return `${(n / 10000).toFixed(n % 10000 ? 1 : 0)}万`
  return String(n)
}

const getThumb = (item) => {
  return (
    item?.children?.[0]?.thumbnail ||
    item?.target?.thumbnail ||
    item?.target?.image_url ||
    item?.target?.imageURL ||
    ''
  )
}

const getExcerpt = (item) => {
  const t = item?.target ?? {}
  const raw =
    t.excerpt ||
    t.excerptText ||
    t.description ||
    t.content ||
    t.detail_text ||
    ''
  const text = stripHtml(raw)
  return text ? text.slice(0, 120) : ''
}

const getStats = (item) => {
  const t = item?.target ?? {}
  const stats = []
  const answers = t.answer_count ?? t.answerCount
  const followers = t.follower_count ?? t.followerCount
  const comments = t.comment_count ?? t.commentCount
  const heat = t.hot || t.heat || t.hot_score || t.hotScore

  if (Number.isFinite(Number(answers))) {
    stats.push({ key: 'answers', label: '回答', value: formatNumber(answers) })
  }
  if (Number.isFinite(Number(comments))) {
    stats.push({ key: 'comments', label: '评论', value: formatNumber(comments) })
  }
  if (Number.isFinite(Number(followers))) {
    stats.push({ key: 'followers', label: '关注', value: formatNumber(followers) })
  }
  if (Number.isFinite(Number(heat))) {
    stats.push({ key: 'heat', label: '热度', value: formatNumber(heat) })
  }
  return stats
}

</script>

<style scoped>
.zhihu-container {
  padding: 16px;
  width: 100%;
  max-width: none;
  margin: 0;
  box-sizing: border-box;
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1f2937;
}

.hot-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.hot-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 14px 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: transform 0.12s ease, box-shadow 0.12s ease, border-color 0.12s ease;
  cursor: pointer;
}

.hot-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  border-color: #d1d5db;
}

.rank {
  width: 28px;
  height: 28px;
  flex: 0 0 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 13px;
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #3b82f6);
}

.rank[data-rank="1"],
.rank[data-rank="2"],
.rank[data-rank="3"] {
  background: linear-gradient(135deg, #f59e0b, #ef4444);
}

.hot-title {
  flex: 1 1 auto;
  color: #111827;
  font-size: 15px;
  line-height: 1.5;
}

.content {
  flex: 1 1 auto;
  min-width: 0;
}

.excerpt {
  margin-top: 6px;
  color: #4b5563;
  font-size: 13px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tag {
  color: #374151;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 9999px;
  font-size: 12px;
  padding: 2px 8px;
}

.open-icon {
  color: #9ca3af;
  transition: color 0.12s ease, transform 0.12s ease;
}

.thumb {
  width: 84px;
  height: 84px;
  flex: 0 0 84px;
  border-radius: 10px;
  object-fit: cover;
  background: #f3f4f6;
}

.hot-item:hover .open-icon {
  color: #4f46e5;
  transform: translateX(2px) translateY(-2px);
}

@media (max-width: 480px) {
  .zhihu-container {
    padding: 12px;
  }
  .hot-item {
    padding: 10px 12px;
  }
  .title {
    font-size: 18px;
  }
  .hot-title {
    font-size: 14px;
  }
  .excerpt {
    font-size: 12px;
  }
  .thumb {
    width: 64px;
    height: 64px;
    flex-basis: 64px;
  }
}

/* Dark theme overrides (html.dark) */
.dark .zhihu-container {
  color: #e5e7eb;
}
.dark .title {
  color: #e5e7eb;
}
.dark .hot-item {
  background: #18181b;
  border-color: #3f3f46;
}
.dark .hot-item:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  border-color: #52525b;
}
.dark .hot-title {
  color: #f3f4f6;
}
.dark .excerpt {
  color: #a1a1aa;
}
.dark .open-icon {
  color: #a1a1aa;
}
.dark .tag {
  color: #e5e7eb;
  background: #27272a;
  border-color: #3f3f46;
}
.dark .hot-item:hover .open-icon {
  color: #a78bfa;
}
.dark .thumb {
  background: #27272a;
}
</style>