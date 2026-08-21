<template>
  <div class="flex-fill">
    <div class="v-container">
      <div class="video-detail__layout">
        <div class="left">
          <div id="player" class="player">
            <video :src="video.videoUrl" controls></video>
          </div>
          <div class="v-card options">
            <div class="options-top">
              <div class="status" v-if="video.status === 0">
                <i class="iconfont icon-shenhezhong"></i>
                <span>待审核</span>
              </div>
              <div class="status" v-if="video.status === 1">
                <i class="iconfont icon-wancheng"></i>
                <span>已通过</span>
              </div>
              <div class="status" v-if="video.status === 2">
                <i class="iconfont icon-shibai"></i>
                <span>未通过</span>
              </div>
              <div class="items">
                <el-button type="success" plain class="options-item pass" @click="updateVideoStatus(1)">
                  <el-icon v-if="isMiniWidth"><Select /></el-icon>
                  <span v-else>通过审核</span>
                </el-button>
                <el-button type="warning" plain class="options-item no-pass" @click="updateVideoStatus(2)">
                  <el-icon v-if="isMiniWidth"><CloseBold /></el-icon>
                  <span v-else>不予过审</span>
                </el-button>
                <el-button type="danger" plain class="options-item ban" @click="beforeDelete">
                  <el-icon v-if="isMiniWidth"><Delete /></el-icon>
                  <span v-else>永久删除</span>
                </el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="detail">
          <div class="v-card detail-card">
            <div class="detail-item">
              <div class="item-title">标题</div>
              <div class="item-content">{{ video.title }}</div>
            </div>
            <div class="detail-item">
              <div class="item-title">类型</div>
              <div class="item-content">
                <span class="type" v-if="video.type === 1">自制</span>
                <span class="type" v-if="video.type === 2">转载</span>
                <div class="auth" v-if="video.type === 1 && video.auth === 1">
                  <i class="iconfont icon-jinzhi"></i>
                  <span>未经授权 禁止转载</span>
                </div>
              </div>
            </div>
            <div class="detail-item">
              <div class="item-title">分区</div>
              <div class="item-content">{{ category.mcName }} &nbsp;→&nbsp; {{ category.scName }}</div>
            </div>
            <div class="detail-item">
              <div class="item-title">标签</div>
              <div class="item-content">
                <div class="tag-container" v-for="(item, index) in tags" :key="index">{{ item }}</div>
              </div>
            </div>
            <div class="detail-item">
              <div class="item-title">简介</div>
              <div class="item-content"><span class="v-text descr" v-html="formatText(video.descr)"></span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { linkify } from '@/utils/utils'
import { changeVideoStatus, getReviewVideoDetail } from '@/api'
import { useAppStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

const video = ref<any>({})
const category = ref<any>({})
const tags = ref<string[]>([])
const isMiniWidth = ref(false)

async function getVideoDetail() {
  const data = await getReviewVideoDetail(route.params.vid as string)
  if (data.data) {
    video.value = data.data.video
    category.value = data.data.category
    tags.value = data.data.video.tags.split('\r\n').filter((tag: string) => tag.trim() !== '')
  }
}

async function updateVideoStatus(vstatus: number) {
  appStore.setLoading(true)
  try {
    const res = await changeVideoStatus({ vid: route.params.vid as string, status: vstatus })
    if (res.code === 200) {
      if (vstatus === 3) {
        router.push('/review/video/form')
      } else {
        await getVideoDetail()
      }
    }
  } catch {
    ElMessage.error('特丽丽被玩坏了(¯﹃¯)')
  } finally {
    appStore.setLoading(false)
  }
}

function updatePlayerHeight() {
  const playerElement = document.getElementById('player')
  if (playerElement) {
    const playerWidth = playerElement.offsetWidth
    playerElement.style.height = `${playerWidth * (9 / 16)}px`
  }
}

function changeWidth() {
  isMiniWidth.value = window.innerWidth < 480
}

function formatText(text: string) {
  return linkify(text)
}

function beforeDelete() {
  ElMessageBox.confirm('该操作会删除视频源文件，无法复原，确定删除吗？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => updateVideoStatus(3))
    .catch(() => {})
}

onMounted(() => {
  changeWidth()
  getVideoDetail().then(() => updatePlayerHeight())
  window.addEventListener('resize', updatePlayerHeight)
  window.addEventListener('resize', changeWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updatePlayerHeight)
  window.removeEventListener('resize', changeWidth)
})
</script>

<style scoped>
.v-container { position: relative; }

.video-detail__layout { position: relative; width: 100%; display: flex; }

.left { width: 66%; max-width: 672px; }

.player { box-shadow: 2px 2px 10px #0000003f; background-color: black; width: 100%; }
.player video { width: 100%; height: 100%; }

.options { margin-top: 16px; }
.options-top { display: flex; justify-content: space-between; align-items: center; height: 64px; padding: 0 16px; }

.status { display: flex; align-items: center; }
.status .iconfont { font-size: 12px; margin-right: 5px; }
.icon-shenhezhong { color: var(--pay_yellow); }
.icon-wancheng { color: var(--success_green); }
.icon-shibai { color: var(--stress_red); }

.options-item { padding: 0 10px; }

.detail { flex: 1; margin: 0 0 0 16px; min-width: 400px; color: var(--text2); }
.detail-card { padding: 0 16px 30px 20px; }
.detail-item { display: flex; margin-top: 20px; min-height: 25px; }
.item-title { flex: 0 0 auto; width: 70px; color: var(--text1); font-size: 16px; font-weight: 600; }
.item-content { display: flex; flex: 1; flex-wrap: wrap; }
.type { flex: 0 0 auto; width: 45px; }
.icon-jinzhi { font-size: 14px; color: var(--stress_red); margin-right: 4px; }

.tag-container {
  text-align: center; padding: 0 12px; margin: 0px 12px 12px 0; height: 25px;
  border-radius: 14px; background: #f1f2f3; font-size: 12px; line-height: 25px; border: none;
}

.descr {
  width: 100%; padding: 10px; background-color: #fafafa;
  border: 1px solid #eee; border-radius: 8px;
}

@media (max-width: 700px) {
  .video-detail__layout { flex-direction: column; }
  .left { width: auto; }
  .detail { margin: 16px 0 0 0; min-width: auto; }
  .item-title { width: 50px; }
}

@media (min-width: 700.1px) and (max-width: 800px) {
  .detail { min-width: 300px; }
  .item-title { width: 50px; }
}
</style>
