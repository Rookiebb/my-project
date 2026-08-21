<template>
    <div class="carousel-index">
        <div class="carousel-container" :style="`background-color: ${color};`">
            <div
                class="carousel-transform"
                :style="isRoll == 2 ? `transform: translateX(-${((100 / carousels.length) * 2).toFixed(4)}%); transition: transform 400ms ease 0s;width: ${carousels.length}00%;`
                        : isRoll == 1 ? `transform: translateX(0); transition: transform 400ms ease 0s;width: ${carousels.length}00%;`
                        : `transform: translateX(-${(100 / carousels.length).toFixed(4)}%); transition: transform 0ms ease 0s;width: ${carousels.length}00%;`"
                >
                <div class="carousel-slide" :style="`width: ${(100 / carousels.length).toFixed(4)}%`" v-for="(item, index) in carousels" :key="index">
                    <a class="carousel-inner" :href="item.target" target="_blank">
                        <img :src="item.url" alt="">
                    </a>
                </div>
                <div class="shadow" :style="`background: linear-gradient(to top, ${color}, ${color}00);`"></div>
            </div>
            <div class="carousel-footer__left">
                <div class="title"><span>{{ title }}</span></div>
                <div class="page">
                    <div
                        class="point"
                        :class="index == current ? 'is-active' : ''"
                        v-for="index in carousels.length"
                        :key="index"
                        @click="changePoint(index)"
                    ></div>
                </div>
            </div>
            <div class="carousel-footer__right">
                <button type="button" @click="preSlide()">
                    <i class="iconfont icon-zuojiantou"></i>
                </button>
                <button type="button" @click="nextSlide()">
                    <i class="iconfont icon-youjiantou"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default { name: "CarouselIndex" }

let timer: ReturnType<typeof setTimeout> | undefined;  // 定时器
</script>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import carouselJson from 'assets/json/carousel.json';
import { useAppStore } from '@/stores';

const appStore = useAppStore();

// 轮播图列表
const carousels = ref<any[]>([]);
// 是否滚动，0 不滚，1上一张，2 下一张
const isRoll = ref(0);
// 当前位置
const current = ref(2);
// 底色
const color = ref("");
// 标题
const title = ref("");

// 请求
function getCarousels() {
    carousels.value = carouselJson;
    appStore.carousels = carousels.value.slice();
}

async function refreshTimer() {
    clearTimeout(timer);
    await nextSlide();
    startTimer();
}

function startTimer() {
    timer = setTimeout(nextSlide, 3100);   // 加上主函数的延时时长总共3.5秒换一张图
}

function nextSlide() {
    clearTimeout(timer);
    // 开滚
    isRoll.value = 2;
    if (current.value < carousels.value.length) {
        current.value++;
    } else {
        current.value = 1;
    }
    // 换成第三张图的底色
    color.value = carousels.value[2].color;
    title.value = carousels.value[2].title;
    setTimeout(() => {
        // 将第一张图移到数组末尾
        carousels.value.push(carousels.value.shift());
        isRoll.value = 0;
        // 换回位置2的底色
        color.value = carousels.value[1].color;
        title.value = carousels.value[1].title;
    }, 500);    // 这里的延时时长要大于等于动画的过渡时长
    startTimer();
}

function preSlide() {
    clearTimeout(timer);
    isRoll.value = 1;
    if (current.value > 1) {
        current.value--;
    } else {
        current.value = carousels.value.length;
    }
    // 换成第一张图的底色
    color.value = carousels.value[0].color;
    title.value = carousels.value[0].title;
    setTimeout(() => {
        // 将最后一张图移到数组开头
        carousels.value.unshift(carousels.value.pop());
        isRoll.value = 0;
        // 换回位置2的底色
        color.value = carousels.value[1].color;
        title.value = carousels.value[1].title;
    }, 400);    // 这里的延时时长要大于等于动画的过渡时长
    startTimer();
}

function changePoint(index: number) {
    // 暂停自动滚动
    clearTimeout(timer);
    current.value = index;
    // 创建一个原数组的副本
    let list: any[] = appStore.carousels.slice();
    if (index == 1) {
        list.unshift(list.pop());
        carousels.value = list;
        color.value = carousels.value[1].color;
        title.value = carousels.value[1].title;
    } else {
        for (let i = 0; i < index - 2; i ++) {
            list.push(list.shift());
        }
        carousels.value = list;
        color.value = carousels.value[1].color;
        title.value = carousels.value[1].title;
    }
    // 重置自动滚动
    startTimer();
}

// created：初始化轮播图数据
getCarousels();

onBeforeMount(() => {
    clearTimeout(timer);
});

onMounted(() => {
    startTimer();
    color.value = carousels.value[1].color;
    title.value = carousels.value[1].title;
});
</script>

<style scoped>
.carousel-index {
    height: 100%;
}

.carousel-container {
    overflow: hidden;
    height: 100%;
    width: 100%;
}

.carousel-transform {
    overflow: hidden;
    display: flex;
    align-items: center;
}

.carousel-inner {
    height: 100%;
    width: 100%;
    position: relative;
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    background-color: var(--graph_bg_regular);
    cursor: pointer;
}

.carousel-inner img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: inherit;
}

.shadow {
    position: absolute;
    width: 100%;
    height: 30%;
    bottom: 0;
    pointer-events: none;   /* 禁止蒙版元素捕获鼠标事件 */
}

.carousel-footer__left {
    position: absolute;
    bottom: 20px;
    left: 15px;
}

.title span{
    display: block;
    font-weight: 400;
    line-height: 25px;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 10px;
}

@media (max-width: 1700.9px) {
    .title span{
        font-size: 18px;
    }
}

@media (min-width: 1701px) {
    .title span{
        font-size: 20px;
    }
}

.page {
    display: flex;
    align-items: center;
    margin-left: -1.5px;
    font-size: 0;
    transform: translateZ(0);
}

.point {
    position: relative;
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 4px;
    border-radius: 50%;
    background-color: rgba(255,255,255,.4);
    overflow: hidden;
    cursor: pointer;
}

.is-active {
    width: 14px;
    height: 14px;
    margin: 1px;
    background-color: #fff;
}

.carousel-footer__right {
    position: absolute;
    bottom: 40px;
    right: 15px;
}

.carousel-footer__right button {
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
    display: -webkit-inline-flex;
    display: inline-flex;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    margin-right: 12px;
    background-color: rgba(255,255,255,.1);
    cursor: pointer;
}

.carousel-footer__right button:hover {
    background-color: rgba(255,255,255,.2);
}

.carousel-footer__right .iconfont {
    color: #fff;
}
</style>