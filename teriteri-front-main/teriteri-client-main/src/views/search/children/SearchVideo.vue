<template>
    <div class="search-video">
        <div class="search-page i_wrapper">
            <div class="container">
                <div class="video-card" v-for="(item, index) in videoList" :key="index">
                    <!-- 骨架屏 -->
                    <div class="video-card__skeleton hide">
                        <div class="video-card__skeleton--cover"></div>
                        <div class="video-card__skeleton--info">
                            <div class="video-card__skeleton--right">
                                <p class="video-card__skeleton--text"></p>
                                <p class="video-card__skeleton--text short"></p>
                                <p class="video-card__skeleton--light"></p>
                            </div>
                        </div>
                    </div>
                    <!-- 实体内容 -->
                    <div class="video-card__wrap">
                        <a :href="`/video/${item.video.vid}`" target="_blank">
                            <div class="video-card__image">
                                <div class="video-card__image--wrap">
                                    <picture class="video-card__cover">
                                        <img :src="item.video.coverUrl" :alt="item.video.title">
                                    </picture>
                                </div>
                                <div class="video-card__mask">
                                    <div class="video-card__stats">
                                        <div class="video-card__stats--left">
                                            <span class="video-card__stats--item">
                                                <i class="iconfont icon-bofangshu"></i>
                                                <span class="video-card__stats--text">
                                                    {{ handleNum(item.stats.play) }}
                                                </span>
                                            </span>
                                            <span class="video-card__stats--item">
                                                <i class="iconfont icon-danmushu"></i>
                                                <span class="video-card__stats--text">
                                                    {{ handleNum(item.stats.danmu) }}
                                                </span>
                                            </span>
                                        </div>
                                        <div class="video-card__stats__duration">
                                            {{ handleDuration(item.video.duration) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <div class="video-card__info">
                            <div class="video-card__info--right">
                                <h3 class="video-card__info--tit">
                                    <a :href="`/video/${item.video.vid}`" target="_blank" :title="item.video.title" v-html="highlightKeyword(item.video.title)">
                                    </a>
                                </h3>
                                <div class="video-card__info--bottom">
                                    <div class="video-card__info--icon-text" :style="'display: none;'">已关注</div>
                                    <a class="video-card__info--owner" :href="`/space/${item.user.uid}`" target="_blank">
                                        <i class="iconfont icon-uper" :style="''"></i>
                                        <span class="video-card__info--author">{{ item.user.nickname }}</span>
                                        <span class="video-card__info--date">
                                            · {{ handleDate(item.video.uploadDate) }}
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 骨架屏 -->
                <div class="video-card" v-for="index in 30" :key="index" :style="loading ? '' : 'display: none;'">
                    <div class="video-card__skeleton loading_animation">
                        <div class="video-card__skeleton--cover"></div>
                        <div class="video-card__skeleton--info">
                            <div class="video-card__skeleton--right">
                                <p class="video-card__skeleton--text"></p>
                                <p class="video-card__skeleton--text short"></p>
                                <p class="video-card__skeleton--light"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-bottom flex_center">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="searchStore.matchingCount[0]"
                    :page-size="30"
                    :pager-count="7"
                    :current-page="page"
                    @current-change="pageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "SearchVideo",
}
</script>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { handleTime, handleNum, handleDate, highlightKeyword as highlightKeywordUtil } from '@/utils/utils';
import { useSearchStore } from '@/stores';
import { searchVideo } from '@/api';

const props = withDefaults(defineProps<{
    // 从路由参数获取的关键词
    keyword?: string,
}>(), {
    keyword: '',
});

const searchStore = useSearchStore();

const page = ref(1);               // 当前页码
const videoList = ref<any[]>([]);  // 查询到的相关视频
const loading = ref(true);         // 正在查询中

// 查询相关视频
async function searchVideos() {
    videoList.value = [];
    loading.value = true;
    const keyword = encodeURIComponent(props.keyword); // 对特殊字符进行编译
    const res = await searchVideo({
        keyword: keyword,
        page: page.value
    });
    if (!res) return;
    videoList.value = res.data;
    loading.value = false;
}

// 换页
function pageChange(target: number) {
    page.value = target;
    searchVideos();
}

// 处理播放时长
function handleDuration(time: number | string) {
    return handleTime(time);
}

// 高亮关键词
function highlightKeyword(text: string) {
    return highlightKeywordUtil(props.keyword, text);
}

if (props.keyword) {
    searchVideos();
}

watch(() => props.keyword, (curr) => {
    if (curr) {
        page.value = 1;
        searchVideos();
    }
});
</script>

<style scoped>
.search-page {
    padding-bottom: 30px !important;
    margin-top: 30px !important;
    position: relative;
}

.container {
    grid-gap: 20px;
    display: grid;
    position: relative;
    width: 100%;
}

@media (max-width: 1399.9px) {
    .container {
        grid-column: span 4;
        grid-template-columns: repeat(4,1fr);
    }
}

@media (min-width: 1400px) {
    .container {
        grid-column: span 5;
        grid-template-columns: repeat(5,1fr);
    }
}

@media (min-width: 1700px) {
    .container {
        grid-column: span 6;
        grid-template-columns: repeat(6,1fr);
    }
}

@media (min-width: 2200px) {
    .container {
        grid-column: span 7;
        grid-template-columns: repeat(7,1fr);
    }
}

.search-bottom {
    margin: 50px 0 20px;
}
</style>