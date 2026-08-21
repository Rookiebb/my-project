<template>
    <div class="videoUpload">
        <!-- 选择文件界面 -->
        <div class="upload-body-content" :style="selectedVideo ? 'display: none;' : ''">
            <div class="upload-wrp">
                <div class="video-input">
                    <div
                        class="video-input-wrapper"
                        @dragover.prevent
                        @dragenter.prevent
                        @dragleave.prevent
                        @drop.prevent
                        @drop="handleDrop"
                        @click="selectVideo"
                    >
                        <!-- <i class="iconfont icon-shangchuan"></i> -->
                        <el-icon size="40"><UploadFilled /></el-icon>
                        <div class="upload-tips-text">拖拽到此处也可上传</div>
                        <div class="upload-btn">上传视频</div>
                        <input
                            type="file"
                            accept=".mp4"
                            ref="videoInput"
                            @change="handleVideoChange"
                            style="display: none;"
                        >
                    </div>
                </div>
            </div>
            <div class="footer-item">
                <span class="i-list i-1">
                    <a target="_blank" class="title">禁止发布的视频内容</a>
                </span>
                <span class="i-list i-1">
                    <span class="title">视频大小</span>
                    <span class="title-block">
                        <span>网页端上传的文件大小上限为300M</span><br>
                        <span>视频内容时长最大10小时</span><br>
                    </span>
                </span>
                <span class="i-list i-1">
                    <span class="title">视频格式</span>
                    <span class="title-block">
                        <span>网页端、桌面客户端推荐上传的格式为：mp4</span><br>
                        <span>暂不允许上传其他格式</span><br>
                    </span>
                </span>
                <span class="i-list i-1">
                    <span class="title">视频码率</span>
                    <span class="title-block">
                        <span>推荐视频分辨率：1280*720 或者 1920*1080</span><br>
                        <span>网站不提供转码、压制服务</span><br>
                    </span>
                </span>
            </div>
            <div class="footer-item">
                <span>上传视频，即表示您已同意 <a target="_blank">特丽特丽使用协议</a> 与 <a target="_blank">特丽特丽社区公约</a> ，请勿上传色情，反动等违法视频。</span>
            </div>
            <div class="footer-item">
                <span class="i-list">第三方工具</span>
                <span class="i-list i-2">
                    <svg style="transform: translateY(3px); margin-right: 3px;" t="1710534411941" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4206" width="16" height="16"><path d="M777.4816 903.6H246.51733333c-59.3312 0-107.61066667-48.272-107.61066666-107.61066667V368.9056c0-59.3312 44.86613333-107.61066667 100.0256-107.61066667h68.26666666v63.50933334h-68.26666666c-19.78986667 0-36.50773333 20.192-36.50773334 44.09386666V795.98933333c0 24.3104 19.7824 44.0928 44.0928 44.0928H777.48266667c24.3104 0 44.0928-19.7824 44.0928-44.0928V368.9056c0-23.9008-16.71786667-44.0928-36.50773334-44.0928h-68.26666666v-63.5104h68.26666666c55.152 0 100.0256 48.272 100.0256 107.61066667v427.0912c0 59.32373333-48.27946667 107.59573333-107.61066666 107.59573333z" fill="#99a2aa" p-id="4207"></path><path d="M692.23893333 454.95146667c-11.3248-12.3488-30.52266667-13.17546667-42.864-1.8432l-107.03466666 98.19733333V112.33813333c0-16.75626667-13.58506667-30.34133333-30.34026667-30.34133333s-30.34026667 13.58506667-30.34026667 30.34133333v437.4368l-101.64906666-96.33066666c-12.16-11.53066667-31.3728-11.00693333-42.88746667 1.152-11.5296 12.1664-11.00586667 31.36533333 1.15306667 42.8864L491.1328 642.336c0.144 0.13653333 0.31146667 0.21973333 0.45546667 0.35626667 1.25866667 1.15306667 2.60266667 2.2304 4.0576 3.16373333 0.06826667 0.0448 0.12906667 0.10666667 0.19733333 0.144 1.25226667 0.78933333 2.57173333 1.48693333 3.94453333 2.09386667 0.17493333 0.07466667 0.35626667 0.09813333 0.52266667 0.1664 1.32053333 0.55466667 2.67093333 0.9408 4.04373333 1.29706666 0.58453333 0.15146667 1.1456 0.37973333 1.72906667 0.4928a30.31466667 30.31466667 0 0 0 5.90186667 0.608c1.93386667 0 3.86133333-0.20586667 5.76426666-0.5696 0.6752-0.12906667 1.328-0.3872 1.99466667-0.56106666 1.2064-0.32 2.40533333-0.62933333 3.56586667-1.09226667 0.76586667-0.304 1.4784-0.72853333 2.2144-1.1008 1.024-0.5152 2.04053333-1.01546667 3.0112-1.64586667 0.70613333-0.46186667 1.35786667-1.01653333 2.03306666-1.5392 0.6368-0.50133333 1.33546667-0.91093333 1.94133334-1.46453333l157.8784-144.85333333c12.3488-11.33333333 13.184-30.5312 1.85066666-42.88z" p-id="4208"></path></svg>
                    <a class="zip" href="//dl.hdslb.com/video-press/xiaowantoolsrev194.zip">小丸压制工具</a>
                </span>
            </div>
        </div>
        <!-- 填写投稿信息界面 -->
        <div class="info-content" :style="selectedVideo ? '' : 'display: none;'">
            <div class="info-header">
                <span>发布视频</span>
                <div class="cancel-btn" @click="beforeCancel">取消发布</div>
            </div>
            <div class="info-body">
                <!-- 上传文件的进度显示 -->
                <div class="video-name">{{ videoName }}</div>
                <div class="video-file">
                    <div class="video-icon-wrp"><i class="iconfont icon-video"></i></div>
                    <div class="file-detail">
                        <div class="file-status">
                            <div class="file-status-text" v-if="progress >= 100">
                                <i class="iconfont icon-wancheng success"></i>
                                <span class="success">分片上传完成</span>
                            </div>
                            <div class="file-status-text" v-else-if="isFailed">
                                <i class="iconfont icon-shibai failed"></i>
                                <span class="failed">分片上传失败</span>
                            </div>
                            <div class="file-status-text" v-else-if="!isPause">
                                <i class="iconfont icon-shangchuanzhong"></i>
                                <span style="margin-right: 8px;">上传中</span>
                                <span>{{ progress }}%</span>
                            </div>
                            <div class="file-status-text" v-else>
                                <i class="iconfont icon-zantingshangchuan"></i>
                                <span style="margin-right: 8px;">暂停中</span>
                                <span>{{ progress }}%</span>
                            </div>
                            <div class="file-status-manage refresh" v-if="progress >= 100 || isPause" @click="selectVideo">
                                <i class="iconfont icon-genghuan"></i>
                                <span>更换视频</span>
                            </div>
                            <div class="file-status-manage pause" v-if="progress < 100 && !isPause" @click="changeState">
                                <i class="iconfont icon-zantingshangchuan"></i>
                                <span>暂停上传</span>
                            </div>
                            <div class="file-status-manage continue" v-if="progress < 100 && isPause" @click="changeState">
                                <i class="iconfont icon-jixu"></i>
                                <span>继续上传</span>
                            </div>
                        </div>
                        <div class="file-progress">
                            <div class="file-progress-outer">
                                <div
                                    class="file-progress-inner"
                                    :class="progress >= 100 ? 'success-bg' : isFailed ? 'failed-bg' : 'doing-bg'"
                                    :style="`width: ${progress}%;`"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 投稿信息 -->
                <div class="upload-form">
                    <div class="form-title">基本信息</div>
                    <!-- 封面 -->
                    <div class="form-item cover">
                        <div class="section-title">
                            <span class="section-title-deg">*</span>
                            <span class="section-title-main">封面</span>
                        </div>
                        <div class="cover-container">
                            <img :src="coverURL" v-if="coverURL">
                        </div>
                        <div class="cover-right">
                            <el-button class="change-cover-btn" @click="openDialog">更改封面</el-button>
                            <span class="cover-tips">系统默认截取视频第一秒作为封面</span>
                            <span class="cover-tips">*部分情况下您的封面将以4:3比例展示</span>
                        </div>                        
                    </div>
                    <!-- 标题 -->
                    <div class="form-item title">
                        <div class="section-title">
                            <span class="section-title-deg">*</span>
                            <span class="section-title-main">标题</span>
                        </div>
                        <el-input
                            v-model="form.title"
                            maxlength="80"
                            placeholder="起个吸引人的标题吧"
                            show-word-limit
                            type="text"
                        />
                    </div>
                    <!-- 类型 -->
                    <div class="form-item type">
                        <div class="section-title">
                            <span class="section-title-deg">*</span>
                            <span class="section-title-main">类型</span>
                        </div>
                        <div class="type-radio">
                            <div class="type-radio-item" @click="form.type = 1">
                                <div class="radio-box">
                                    <div class="radio-box-selected" :style="form.type == 1 ? '' : 'display: none;'"></div>
                                </div>
                                <span class="radio-name" :class="form.type == 1 ? 'radio-selected' : ''">自制</span>
                            </div>
                            <div class="type-radio-item" @click="form.type = 2; form.auth = 0;">
                                <div class="radio-box">
                                    <div class="radio-box-selected" :style="form.type == 2 ? '' : 'display: none;'"></div>
                                </div>
                                <span class="radio-name" :class="form.type == 2 ? 'radio-selected' : ''">转载</span>
                            </div>
                        </div>
                        <div class="auth" v-if="form.type == 1" @click="changeAuth">
                            <span class="auth-box" :class="form.auth == 1 ? 'auth-selected' : ''">
                                <i class="iconfont icon-gou"></i>
                            </span>
                            <span class="auth-main">未经作者授权 禁止转载</span>
                        </div>
                    </div>
                    <!-- 分区 -->
                    <div class="form-item category">
                        <div class="section-title">
                            <span class="section-title-deg">*</span>
                            <span class="section-title-main">分区</span>
                        </div>
                        <CategorySelect v-model:category="form.category"></CategorySelect>
                    </div>
                    <!-- 标签 -->
                    <div class="form-item tag">
                        <div class="section-title">
                            <span class="section-title-deg">*</span>
                            <span class="section-title-main">标签</span>
                        </div>
                        <!-- 用v-if重新渲染不留缓存 -->
                        <TagInput v-if="selectedVideo" style="width: 80%;" v-model:sendTag="sendTag" @updateTags="val => {form.tags = val;}"></TagInput>
                    </div>
                    <!-- 推荐标签 -->
                    <div class="tag-wrp" v-if="rcmTags.length != 0">
                        <p class="tag-label">推荐标签:</p>
                        <div class="tag-list">
                            <div
                                class="hot-tag-container"
                                :class="form.tags.findIndex(curr=>curr==item) != -1 ? 'isTagSelected' : ''"
                                @click="sendTag = item;"
                                v-for="(item, index) in rcmTags"
                                :key="index"
                            >
                                <div class="hot-tag-item">
                                    <span>{{ item }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 简介 -->
                    <div class="form-item descr" style="align-items: flex-start;">
                        <div class="section-title" style="padding-top: 35px;">
                            <span class="section-title-deg"></span>
                            <span class="section-title-main">简介</span>
                        </div>
                        <el-input
                            class="desc-text"
                            type="textarea"
                            maxlength="2000"
                            show-word-limit
                            v-model="form.descr"
                            placeholder="填写更全面的相关信息，让更多的人能找到你的视频吧:)"
                        ></el-input>
                    </div>
                    <div class="form-item submit">
                        <div class="submit-container">
                            <span class="submit-draft" @click="draft">存草稿</span>
                            <span class="submit-add" @click="submit">立即投稿</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 用于裁剪视频封面的元素 -->
            <video :src="videoURL" ref="uploadVideoElement" style="display: none"></video>
            <!-- 用于生成原画的画布 -->
            <canvas ref="cutCanvas" style="display: none"></canvas>
        </div>
    </div>
    <!-- 封面裁剪框 -->
    <div class="cover-dialog">
    <el-dialog v-model="dialogVisible" :close-on-click-modal="false" destroy-on-close align-center>
        <div class="cover-dialog-header">
            <div class="header-tab">
                <div class="header-tab-item" :class="coverType == 1 ? 'currentTab' : ''" @click="coverType = 1">
                    <div class="tab-text">截取封面</div>
                    <div class="tab-line"></div>
                </div>
                <div class="header-tab-item" :class="coverType == 2 ? 'currentTab' : ''" @click="coverType = 2">
                    <div class="tab-text">上传封面</div>
                    <div class="tab-line"></div>
                </div>
            </div>
        </div>
        <div class="cover-dialog-body">
            <div class="cover-cut-content" :class="coverType == 1 ? 'pick-version' : 'upload-version'">
                <div class="cover-cut-content-pick" :style="coverType == 1 ? '' : 'display: none;'">
                    <!-- 裁剪组件 -->
                    <CropperComp :imgURL="coverImageURL" v-model:cutOrder="cutOrder1" :title="form.title" @cut="changeCover"></CropperComp>
                    <!-- 进度条组件 -->
                    <div class="cover-cut-content-pick-bar">
                        <div class="cover-slider" ref="coverSlider">
                            <PlayerProgress style="top: 20px; visibility: hidden;" :currentPer="currentPer" @changeCurrent="changeCurrentPer"></PlayerProgress>
                            <div class="slider-handle" ref="sliderHandle" :style="`left: ${currentPer * 100}%;`"></div>
                            <div class="cover-slider-image-list" v-if="sliderImages.length == 7">
                                <div
                                    class="cover-slider-image"
                                    v-for="index in 7"
                                    :key="index"
                                    :style="`background: url(${sliderImages[index-1]}) center center / cover no-repeat;`"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cover-cut-content-upload" :style="coverType == 2 ? '' : 'display: none;'">
                    <!-- 选择文件界面 -->
                    <div class="upload-body-content" style="top: 73px; width: 600px;" :style="picURL ? 'display: none;' : ''">
                        <div class="upload-wrp" style="margin-top: 0;">
                            <div class="pic-input">
                                <div
                                    class="pic-input-wrapper"
                                    @dragover.prevent
                                    @dragenter.prevent
                                    @dragleave.prevent
                                    @drop.prevent
                                    @drop="handlePicDrop"
                                    @click="selectPic"
                                >
                                    <!-- <i class="iconfont icon-shangchuan"></i> -->
                                    <el-icon size="40"><UploadFilled /></el-icon>
                                    <div class="upload-tips-text">拖拽图片到此处或者点击上传</div>
                                    <div class="upload-btn">选择图片</div>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpg, image/jpeg"
                                        ref="picInput"
                                        @change="handlePicChange"
                                        style="display: none;"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 裁剪组件 -->
                    <CropperComp v-if="picURL" :imgURL="picURL" v-model:cutOrder="cutOrder2" :title="form.title" @cut="changeCover"></CropperComp>
                    <!-- 更换图片按钮 -->
                    <div class="reselect">
                        <div class="file-status-manage refresh" v-if="picURL" @click="selectPic">
                            <i class="iconfont icon-genghuan"></i>
                            <span>重新选择</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cover-dialog-footer">
            <div class="cover-dialog-submit" @click="sendOrder" v-if="coverType == 1 || picURL"><span>完成</span></div>
        </div>
    </el-dialog>
    </div>
</template>

<script lang="ts">
export default { name: "VideoUpload" };
</script>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import SparkMD5 from 'spark-md5';
import CropperComp from '@/components/cropper/CropperComp.vue';
import CategorySelect from '@/components/categorySelect/CategorySelect.vue';
import TagInput from '@/components/tagInput/TagInput.vue';
import PlayerProgress from '@/components/player/PlayerProgress.vue';
import { useUserStore, useAppStore } from '@/stores';
import { addVideo, askChunk, uploadChunk, cancelUpload } from '@/api';

const router = useRouter();
const userStore = useUserStore();
const appStore = useAppStore();

// 提前声明要使用的自定义事件，防止提示一堆警告
const emit = defineEmits(['changeNavBarShow']);

const dialogVisible = ref(false);   // 封面裁剪框的显隐
const coverType = ref(1);   // 当前显示封面裁剪类型，1 视频帧截取 2 上传裁剪
const selectedVideo = ref<File | null>(null);    // 选择的视频文件
const hash = ref<string | null>(null); // 当前视频文件的hash值
const videoURL = ref<string | null>(null); // 上传的视频的内存地址
const videoName = ref("");  // 视频原文件名
const chunkSize = 10*1024*1024;  // 分片大小小于等于后端，分片越小越多断点续传效果越好，但上传速度相对也会慢
const current = ref(0);   // 当前即将上传的分片序号 从0开始
const isFailed = ref(false);    // 是否分片上传失败
const isPause = ref(false);     // 是否上传暂停中
const isCancel = ref(false);    // 是否取消上传
const progress = ref(0);    // 上传进度 0~100
const duration = ref(0);    // 视频总时长
const coverImageURL = ref<string | null>(null);   // 封面原图url
const currentPer = ref(0.00001);   // 当前封面的视频时间占总时长的百分比 进度条百分比 小数0~1
const sliderImages = ref<string[]>([]);   // 滑块预览的7张图
const picURL = ref<string | null>(null);   // 上传的原图url
const coverURL = ref<string | null>(null); // 裁剪后的封面url
const cutOrder1 = ref(false);   // 用于传递裁剪信息的参数，true就触发裁剪 v-model双向绑定，裁剪完自动变回false;
const cutOrder2 = ref(false);
const sendTag = ref("");    // 点击推荐标签时发送的想要添加的标签
const form = ref({
    title: "",  // 投稿标题
    type: 1,    // 投稿类型 1自制 2转载
    auth: 0,    // 0不设置权限 1未经作者授权禁止转载
    category: [{id: "anime", name: "番剧"}, {id: "finish", name: "完结动画"}] as any[],  // 投稿分区
    tags: [] as string[],   // 投稿标签
    descr: "",  // 投稿简介
});

// 模板引用
const videoInput = ref<HTMLInputElement | null>(null);
const picInput = ref<HTMLInputElement | null>(null);
const uploadVideoElement = ref<HTMLVideoElement | null>(null);
const cutCanvas = ref<HTMLCanvasElement | null>(null);
const coverSlider = ref<HTMLElement | null>(null);
const sliderHandle = ref<HTMLElement | null>(null);

// 分区列表
const categoryList = computed(() => appStore.channels as any[]);
// 当前选择分区的推荐可选标签
const rcmTags = computed<any[]>(() => {
    for (let i = 0; i < categoryList.value.length; i ++) {
        if (categoryList.value[i].mcId == form.value.category[0].id) {
            for (let j = 0; j < categoryList.value[i].scList.length; j ++) {
                if (categoryList.value[i].scList[j].scId == form.value.category[1].id) {
                    return categoryList.value[i].scList[j].rcmTag;
                }
            }
        }
    }
    return [];
});

// 初始化内容
function init() {
    selectedVideo.value = null;
    hash.value = null;
    videoURL.value = null;
    videoName.value = "";
    progress.value = 0;
    coverImageURL.value = null;
    coverURL.value = null;
    duration.value = 0;
    currentPer.value = 0.00001;
    sliderImages.value = [];
    picURL.value = null;
    form.value = {
        title: "",
        type: 1,
        auth: 0,
        category: [{id: "anime", name: "番剧"}, {id: "finish", name: "完结动画"}],
        tags: [],
        descr: "",
    }
}

// 打开封面裁剪对话框
function openDialog() {
    dialogVisible.value = true;
    setTimeout(() => {
        initDrag();
    }, 100);
}

// 触发文件选择对话框
function selectVideo() {
    videoURL.value = null; // 清除先前的视频URL，防止新视频还没加载出来就画黑屏
    videoInput.value!.click();
}

// 触发图片选择对话框
function selectPic() {
    picInput.value!.click();
}

// 处理文件选择事件
async function handleVideoChange(event: Event) {
    if (!userStore.isLogin) {
        ElMessage.error('请登录后查看');
        userStore.logout();
        router.push("/");
        return;
    }
    const file = (event.target as HTMLInputElement).files![0];
    const maxSizeInBytes = 300 * 1024 * 1024; // 300MB
    if (!file) {
        return;
    }
    if (file.size <= maxSizeInBytes) {
        // 文件大小符合要求，可以继续处理上传逻辑
        isPause.value = false;   // 先暂停当前
        // 初始化内容
        selectedVideo.value = file;
        currentPer.value = 0.00001;
        sliderImages.value = [];
        picURL.value = null;
        videoName.value = file.name.split(".mp4")[0];
        form.value.title = videoName.value.slice();
        emit("changeNavBarShow", false);
        initCover(file);
        hash.value = await fhash(file);
        upload();  //开始上传
    } else {
        // 文件大小超出限制
        ElMessage.error("视频太大了，特丽丽装不下呜~")
    }
}

// 处理图片选择事件
function handlePicChange(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (!file) {
        return;
    }
    if (file.size <= maxSizeInBytes) {
        // 文件大小符合要求，可以继续处理上传逻辑
        const reader = new FileReader();
        reader.onload = (e) => {
            picURL.value = (e.target as FileReader).result as string;
        }
        reader.readAsDataURL(file);
    } else {
        // 文件大小超出限制
        ElMessage.error("只能上传5M的图片哦")
    }
}

// 处理拖拽事件
async function handleDrop(event: DragEvent) {
    event.preventDefault();
    if (!userStore.isLogin) {
        ElMessage.error('请登录后查看');
        userStore.logout();
        router.push("/");
        return;
    }
    const file = event.dataTransfer!.files[0];
    const maxSizeInBytes = 300 * 1024 * 1024; // 300MB
    if (!file) {
        return;
    }
    if (file.type != "video/mp4") {
        ElMessage.error("视频只接收mp4格式哦");
        return;
    }
    if (file.size <= maxSizeInBytes) {
        // 文件大小符合要求，可以继续处理上传逻辑
        isPause.value = false;   // 先暂停当前
        // 初始化内容
        selectedVideo.value = file;
        currentPer.value = 0.00001;
        sliderImages.value = [];
        picURL.value = null;
        videoName.value = file.name.split(".mp4")[0];
        form.value.title = videoName.value.slice();
        emit("changeNavBarShow", false);
        initCover(file);
        hash.value = await fhash(file);
        upload();  //开始上传
    } else {
        // 文件大小超出限制
        ElMessage.error("视频太大了，特丽丽装不下呜~");
    }
}

function handlePicDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer!.files[0];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (!file) {
        return;
    }
    if (file.type != "image/png" && file.type !="image/jpeg") {
        ElMessage.error("图片只接收jpg或png格式哦");
        return;
    }
    if (file.size <= maxSizeInBytes) {
        // 文件大小符合要求，可以继续处理上传逻辑
        const reader = new FileReader();
        reader.onload = (e) => {
            picURL.value = (e.target as FileReader).result as string;
        }
        reader.readAsDataURL(file);
    } else {
        // 文件大小超出限制
        ElMessage.error("只能上传5M的图片哦")
    }
}

// 触发暂停/继续事件
function changeState() {
    isPause.value = !isPause.value;
    if (!isPause.value)  {
        upload();
    }
}

// 根据整个文件的文件名和大小组合的字符串生成hash值，大概率确定文件的唯一性
function fhash(file: File) {
    return new Promise<string>(resolve => {
        const spark = new SparkMD5();
        spark.append(file.name+file.size.toString());
        resolve(spark.end());
    })
}

// 生成切片
function createChunks(file: File) {
    const result: Blob[] = [];
    for (let i = 0; i < file.size; i += chunkSize) {
        result.push(file.slice(i, i + chunkSize));
    }
    return result;
}

// 触发上传事件
async function upload() {
    if (!selectedVideo.value) {
        ElMessage.error('未选择文件');
        return;
    }
    const chunks = createChunks(selectedVideo.value);
    isPause.value = false;
    isFailed.value = false;
    // 向服务器查询还没上传的下一个分片序号
    const result = await askChunk(hash.value!);
    current.value = result.data;
    // 逐个上传分片
    for (current.value; current.value < chunks.length; current.value++) {
        const chunk = chunks[current.value];
        const formData = new FormData();
        formData.append('chunk', chunk); // 将当前分片作为单独的文件上传
        formData.append('hash', hash.value!);
        formData.append('index', String(current.value)); // 传递分片索引

        // 发送分片到服务器
        try {
            const res = await uploadChunk(formData);
            if (res.code !== 200) {
                // ElMessage.error("分片上传失败");
                isFailed.value = true;
                isPause.value = true;
            }
        } catch {
            // ElMessage.error("分片上传失败");
            isFailed.value = true;
            isPause.value = true;
            return;
        }
        // 暂停上传
        if (isPause.value) {
            // 取消上传彻底删除已上传分片
            if (isCancel.value) {
                await cancelUpload(hash.value!);
                isCancel.value = false;
            }
            return;
        }
        progress.value = Math.round(((current.value + 1) / chunks.length) * 100); // 实时改进度条
    }
    progress.value = 100;    // 上传完成再次确认为100%
}

// 取消上传前的最后通牒
function beforeCancel() {
    ElMessageBox.confirm(
        '取消发布将不保存你当前填写好的信息哦，确定不发布了吗？',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
    .then(() => {
        cancel();
    })
    .catch(() => {})
}

// 确认取消上传
async function cancel() {
    isPause.value = true;    // 先暂停正在上传的请求
    // 这里是应对没有手动点暂停按钮直接点取消上传按钮，导致下面的同步代码先执行删除后，上传函数仍在执行当前分片的上传
    // 所以要发送取消上传信号，通知上传函数彻底删除上传好的分片
    isCancel.value = true;
    await cancelUpload(hash.value!);
    init();
    setTimeout(() => {
        isCancel.value = false;
    }, 3000);   // 延迟恢复取消状态，让上传函数彻底删除分片，时间要比上传一个分片的用时大一点点，也不是越大越好
    emit("changeNavBarShow", true);
}

// 初始化封面
function initCover(file: File) {
    // 获取视频元素
    const video = uploadVideoElement.value!;
    // 为视频元素设置选中的视频文件
    videoURL.value = URL.createObjectURL(file);
    video.crossOrigin = 'anonymous' // 解决跨域问题，也就是提示污染资源无法转换视频
    video.currentTime = 1 // 第一秒
    // 在视频可以播放时获取这一秒图像
    video.oncanplay = async () => {
        // 获取视频总时长
        duration.value = video.duration;
        // 获取画布元素
        const canvas = cutCanvas.value!;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        // 将视频的这一帧绘制到画布上
        const context = canvas.getContext("2d")!;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        // 将画布内容转换为图像数据URL
        coverImageURL.value = canvas.toDataURL("image/jpeg");
        cutCover(coverImageURL.value);  // 从原图裁剪中间部分作为封面展示
        await initSliderImages();
    };
}

// 截取滑块预览的7张图
async function initSliderImages() {
    // 获取视频元素
    const video = uploadVideoElement.value!;
    video.crossOrigin = 'anonymous' // 解决跨域问题，也就是提示污染资源无法转换视频
    for (let i = 1; i < 14; i += 2) {   // 截中间的7张
        video.currentTime = duration.value * (i * 0.07143);
        await new Promise<void>((resolve) => {
            video.oncanplay = () => {
                const canvas = cutCanvas.value!;
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                const context = canvas.getContext("2d")!;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                sliderImages.value.push(canvas.toDataURL("image/jpeg"));

                resolve();
            };
        });
    }
}

// 封面截取， imgURL 原图的url
function cutCover(imgURL: string) {
    // 创建一个 Image 元素来加载原始图像
    const img = new Image();
    img.src = imgURL;
    // 获取用于裁剪的 canvas 元素
    const canvas = cutCanvas.value!;
    const ctx = canvas.getContext('2d')!;
    // 定义所需的宽高比例
    const targetAspectRatio = 16 / 9;
    // 当图像加载完成后执行裁剪操作
    img.onload = () => {
        // 计算原始图像和目标图像的宽高
        const srcWidth = img.width;
        const srcHeight = img.height;
        const srcAspectRatio = srcWidth / srcHeight;
        let targetWidth = srcWidth;
        let targetHeight = srcHeight;
        // 如果原始图像的宽高比例较大（宽长高短），根据目标宽高比例来计算宽度
        if (srcAspectRatio > targetAspectRatio) {
            targetWidth = srcHeight * targetAspectRatio;
        }
        // 否则（宽短高长），根据目标宽高比例来计算高度
        else {
            targetHeight = srcWidth / targetAspectRatio;
        }
        // 计算裁剪后的图像在画布上的位置
        const offsetX = (srcWidth - targetWidth) / 2;
        const offsetY = (srcHeight - targetHeight) / 2;
        // 设置 Canvas 的宽高为目标宽高
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // 在 Canvas 上绘制裁剪后的图像
        ctx.drawImage(img, offsetX, offsetY, targetWidth, targetHeight, 0, 0, targetWidth, targetHeight);
        // 将 Canvas 转换为DataURL并返回
        coverURL.value = canvas.toDataURL('image/jpeg');
    };
}

// 初始化拖动
function initDrag() {
    const coverSliderEl = coverSlider.value!;
    const sliderHandleEl = sliderHandle.value!;

    let isDragging = false; // 是否正在拖动
    let offsetX: number, currPer: number;

    // 鼠标按下事件处理程序
    sliderHandleEl.addEventListener("mousedown", () => {
        isDragging = true;
    });

    // 移动端 按下
    sliderHandleEl.addEventListener("touchstart", () => {
        isDragging = true;
    });

    // 鼠标移动事件处理程序
    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        offsetX = e.clientX - coverSliderEl.getBoundingClientRect().left; // 鼠标相对进度条左侧的X偏移
        currPer = offsetX / coverSliderEl.getBoundingClientRect().width; // 计算进度比例
        // 边界值判定
        currPer = Math.max(0.00001, currPer);
        currPer = Math.min(0.99999, currPer);
        currentPer.value = currPer;    // 更新
        const currentTime = currPer * duration.value;
        selectCoverSlice(currentTime);
    });

    // 移动端 移动
    document.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        offsetX = e.touches[0].clientX - coverSliderEl.getBoundingClientRect().left;
        currPer = offsetX / coverSliderEl.getBoundingClientRect().width; // 计算进度比例
        // 边界值判定
        currPer = Math.max(0.00001, currPer);
        currPer = Math.min(0.99999, currPer);
        currentPer.value = currPer;    // 更新
        const currentTime = currPer * duration.value;
        selectCoverSlice(currentTime);
    }, { passive: false });

    // 鼠标释放事件处理程序
    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // 移动端 松开
    document.addEventListener("touchend", () => {
        isDragging = false;
    });
}

function changeCurrentPer(curr: number) {
    currentPer.value = curr;
    const currentTime = curr * duration.value;
    selectCoverSlice(currentTime);
}

// 选择视频帧
function selectCoverSlice(time: number) {
    // 获取视频元素
    const video = uploadVideoElement.value!;
    video.crossOrigin = 'anonymous' // 解决跨域问题，也就是提示污染资源无法转换视频
    video.currentTime = time;
    // 在视频可以播放时获取这一秒图像
    video.oncanplay = () => {
        // 获取画布元素
        const canvas = cutCanvas.value!;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        // 将视频的这一帧绘制到画布上
        const context = canvas.getContext("2d")!;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        // 将画布内容转换为图像数据URL
        coverImageURL.value = canvas.toDataURL("image/jpeg");
    };
}

// 更改作者声明
function changeAuth() {
    if (form.value.auth === 1) {
        form.value.auth = 0;
    } else {
        form.value.auth = 1;
    }
}

function changeCover(url: string) {
    coverURL.value = url;
    // 换完源后关闭对话框
    dialogVisible.value = false;
    // 初始化上传的图片
    picURL.value = null;
}

// 发送裁剪指令
function sendOrder() {
    if (coverType.value === 1) {
        cutOrder1.value = true;
    } else {
        cutOrder2.value = true;
    }
}

// 存草稿
function draft() {
    ElMessage.warning("该功能暂未开放呜~");
}

async function submit() {
    // 判断分片上传情况、表单填写情况
    if (progress.value < 100) {
        ElMessage.error('先等视频上传完啦');
        return;
    }
    if (form.value.title.trim().length === 0) {
        ElMessage.error('写个标题再上传吧');
        return;
    }
    if (form.value.tags.length === 0) {
        ElMessage.error('至少选一个标签哦');
        return;
    }
    appStore.isLoading = true;
    fetch(coverURL.value!)
    .then(response => response.blob())
    .then(blob => {
        const cover = new File([blob], hash.value! + Date.now() + '.jpg', { type: 'image/jpeg' });
        const formData = new FormData();
        formData.append('cover', cover);
        formData.append('hash', hash.value!);
        formData.append('title', form.value.title);
        formData.append('type', String(form.value.type));
        formData.append('auth', String(form.value.auth));
        formData.append('duration', String(duration.value));
        formData.append('mcid', form.value.category[0].id);
        formData.append('scid', form.value.category[1].id);
        let tags = "";
        form.value.tags.forEach(tag => {
            tags = tags + tag + '\n';
        });
        formData.append('tags', tags);
        formData.append('descr', form.value.descr);
        // 发送POST请求
        addVideo(formData)
        .then(res => {
            if (res.code === 200) {
                ElMessage.success('投稿成功，视频马上就能和大家见面啦');
                init();
                emit("changeNavBarShow", true);
                appStore.isLoading = false;
            } else {
                ElMessage.error('投稿失败，请稍后再试');
                appStore.isLoading = false;
            }
        })
    })
    .catch(() => {
        ElMessage.error('特丽丽被玩坏了(¯﹃¯)');
        appStore.isLoading = false;
    })
}
</script>

<style scoped>
.videoUpload {
    padding-top: 8px;
    overflow: auto;
}

.cover-cut-content-pick-bar {
    margin-top: 20px;
    margin-left: 12px;
    width: 704px;
    height: 60px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.cover-slider {
    position: relative;
    background: #e7e7e7;
    box-shadow: 0 0 2px rgba(0,0,0,.04), 0 4px 10px rgba(0,0,0,.08);
    border-radius: 8px;
    height: 60px;
}

.slider-handle {
    position: absolute;
    z-index: 5;
    width: 12px;
    height: 66px;
    cursor: pointer;
    background: url('~assets/img/slider-handle.png');
    box-sizing: border-box;
    background-size: cover;
    border-radius: 4px;
    top: -3px;
    transform: translateX(-50%);
}

.cover-slider-image-list {
    display: flex;
    position: absolute;
    top: 0;
    width: 100%;
    justify-content: center;
}

.cover-slider-image {
    height: 60px;
    width: 100px;
}

.upload-body-content {
    max-width: 830px;
    margin: 0 auto;
    position: relative;
    width: 80%;
}

.upload-wrp {
    margin-top: 20px;
    position: relative;
    border: 2px dashed #ccc;
}

.video-input {
    margin-top: 62px;
    margin-bottom: 32px;
    display: flex;
    justify-content: center;
    position: relative;
    color: #999;
    font-size: 14px;
    text-align: center;
}

.pic-input {
    display: flex;
    justify-content: center;
    position: relative;
    color: #999;
    font-size: 14px;
    text-align: center;
}

.video-input-wrapper {
    flex: 1;
    cursor: pointer;
    padding-bottom: 20px;
    display: inline-block;
}

.pic-input-wrapper {
    flex: 1;
    cursor: pointer;
    padding: 70px 0;
    display: inline-block;
}

.icon-shangchuan {
    font-size: 40px;
}

.upload-tips-text {
    font-size: 13px;
    color: #999;
    margin-top: 6px;
}

.upload-btn {
    color: #fff;
    margin: 20px auto;
    width: 200px;
    height: 44px;
    cursor: pointer;
    background: var(--brand_pink);
    border-radius: 4px;
    text-align: center;
    line-height: 44px;
    white-space: nowrap;
}

.footer-item {
    margin-top: 18px;
    text-align: center;
    color: #99a2aa;
    fill: #99a2aa;
    font-size: 12px;
    line-height: 20px;
}

.footer-item a:not(.title):not(.zip) {
    color: var(--brand_pink);
    cursor: pointer;
}

.footer-item a:not(.title):not(.zip):hover {
    color: var(--Pi4);
}

.footer-item .i-list {
    margin: 0 10px;
}

.footer-item .i-1 {
    cursor: pointer;
    position: relative;
}

.footer-item .i-1 a {
    color: #99a2aa;
}

.footer-item .i-1 .title:hover {
    color: var(--brand_pink);
}

.footer-item .i-2 .zip {
    color: #99a2aa;
}

.footer-item .i-2 .zip:hover {
    color: var(--brand_pink);
    text-decoration: underline;
}

.footer-item .i-1 .title-block {
    position: absolute;
    font-size: 12px;
    border: 1px solid #f9d199;
    color: #666;
    text-align: left;
    padding: 20px;
    background-color: #fcfae0;
    white-space: nowrap;
    z-index: 10;
    bottom: 28px;
    right: -5px;
    display: none;
}

.footer-item .i-1:hover .title-block {
    display: block;
}

.footer-item .i-1 .title-block:after {
    content: "";
    position: absolute;
    width: 14px;
    height: 14px;
    transform: rotate(45deg);
    border: 1px solid;
    border-color: transparent #f9d199 #f9d199 transparent;
    background-color: #fcfae0;
    right: 10px;
    bottom: -8px;
}

.icon-xiazai {
    margin-right: 2px;
}

.info-content {
    padding: 2px 30px;
}

.info-header {
    position: relative;
    font-size: 16px;
    font-weight: 600;
    color: #212121;
    line-height: 28px;
    height: 70px;
    box-shadow: 0 1px 0 #e7e7e7;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.cancel-btn {
    font-size: 14px;
    line-height: 1;
    padding: 12px 16px;
    color: var(--text2);
    cursor: pointer;
    border-radius: 4px;
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    border: 1px solid #e7e7e7;
    background-color: #fff;
    margin-right: 30px;
}

.cancel-btn:hover {
    background-color: #f4f4f4;
}

.video-name {
    padding-top: 25px;
    font-size: 14px;
    color: #212121;
}

.video-file {
    padding-top: 15px;
    display: flex;
    width: 80%;
}

.video-icon-wrp {
    padding-right: 10px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
}

.icon-video {
    font-size: 40px;
    color: var(--brand_pink);
}

.file-detail {
    flex: 1;
}

.success {
    color: var(--success_green);
}

.failed {
    color: var(--stress_red);
}

.file-status {
    display: flex;
    padding-top: 5px;
}

.file-status .iconfont {
    font-size: 20px;
    margin-right: 8px;
}

.file-status-text {
    flex: 1;
    height: 20px;
    font-size: 14px;
    color: #999;
    line-height: 28px;
    display: flex;
    align-items: center;
}

.file-status-manage {
    color: var(--brand_pink);
    cursor: pointer;
    user-select: none;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-left: 10px;
}

.file-progress {
    padding-top: 12px;
}

.file-progress-outer {
    height: 3px;
    width: 100%;
    border-radius: 4px;
    background-color: #e7e7e7;
}

.file-progress-inner {
    height: 3px;
    border-radius: 4px;
    transition: width 0.7s ease;
}

.doing-bg {
    background-color: var(--brand_pink);
}

.success-bg {
    background-color: var(--success_green);
}

.failed-bg {
    background-color: var(--stress_red);
}

.form-title {
    font-size: 16px;
    font-weight: 600;
    color: #222;
    margin-top: 30px;
}

.form-item {
    margin-top: 24px;
    color: #212121;
    display: flex;
    align-items: center;
}

.section-title {
    display: inline-flex;
    align-items: center;
    position: relative;
    flex-wrap: wrap;
    width: 134px;
}

.section-title-deg {
    font-size: 16px;
    color: #ff3b30;
    line-height: 16px;
    width: 12px;
}

.section-title-main {
    font-size: 14px;
    color: #212121;
    line-height: 21px;
    font-weight: 400;
}

.tag-wrp {
    display: flex;
    margin-top: 15px;
    width: 80%;
}

.tag-label {
    font-size: 14px;
    color: #222;
    padding: 14px 0 0 134px;
}

.tag-list {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
}

.hot-tag-container {
    text-align: center;
    padding: 0 15px 0 16px;
    margin: 6px 0 6px 12px;
    height: 30px;
    color: #6d757a;
    cursor: pointer;
    border-radius: 4px;
    background: #f6f6f6;
    font-size: 12px;
    color: #212121;
    line-height: 14px;
    border: none;
}

.isTagSelected {
    background: var(--brand_pink);
    color: #fff;
    cursor: not-allowed;
    border: 0;
}

.hot-tag-item {
    font-size: 12px;
    line-height: 30px;
}

.type-radio {    
    display: flex;
    align-items: center;
}

.type-radio-item {
    cursor: pointer;
    margin-right: 20px;
    display: flex;
    align-items: center;
    position: relative;
}

.radio-box {
    border: 1px solid #bec3cc;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    margin-right: 6px;
    padding: 3px;
}

.radio-box-selected {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: var(--brand_pink);
}

.radio-name {
    font-size: 14px;
    color: var(--text2);
    line-height: 14px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.radio-selected {
    color: var(--brand_pink);
}

.auth {
    margin-left: 40px;
    color: #505050;
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.auth-box {
    position: relative;
    display: inline-flex;
    width: 14px;
    height: 14.5px;
    border: 1px solid silver;
    border-radius: 2px;
    align-items: center;
    justify-content: center;
}

.auth-box:hover {
    border: 1px solid var(--brand_pink);
}

.icon-gou {
    color: #fff;
    font-size: 16px;
}

.auth-selected {
    background-color: var(--brand_pink);
}

.auth-main {
    padding-left: 8px;
}

.cover-container {
    width: 192px;
    height: 108px;
    border-radius: 4px;
    overflow: hidden; /* 隐藏超出容器的部分 */
}

.cover-container img {
    height: 100%;
    width: 100%;
    object-fit: cover; /* 居中填充容器，不会变形 */
}

.cover-right {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
}

.change-cover-btn {
    margin-bottom: 4px;
}

.cover-tips {
    margin-top: 6px;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    color: #9499a0;
}

.reselect {
    margin-top: 8px;
    width: 94px;
}

.reselect .iconfont {
    font-size: 20px;
    margin-right: 8px;
}

.cover-dialog-header,
.cover-dialog-body,
.cover-dialog-footer {
    width: 800px;
}

.cover-dialog-header {
    border-bottom: 1px solid #e7e7e7;
}

.header-tab {
    padding: 0 32px;
    height: 61px;
    display: flex;
}

.header-tab-item {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 29px;
}

.tab-text {
    color: #18191c;
    font-weight: 500;
    font-size: 16px;
    padding: 20px 0 18px 0;
}

.tab-line {
    height: 3px;
    width: 66px;
}

.currentTab .tab-text {
    color: var(--brand_pink);
}

.currentTab .tab-line {
    background-color: var(--brand_pink);
}

.desc-text {
    width: 80%;
    margin-top: 12px;
}

.submit-container {
    padding: 32px 0 32px 134px;
    position: relative;
}

.submit-draft {
    line-height: 38px;
    border: 1px solid #ccc;
    color: #505050;
    background: #fff;
}

.submit-add {
    margin-left: 16px;
    line-height: 40px;
    color: #fff;
    background-color: var(--brand_pink);
}

.submit-add:hover {
    background-color: var(--Pi4);
}

.submit-draft, .submit-add {
    display: inline-block;
    height: 40px;
    font-size: 14px;
    border-radius: 4px;
    text-align: center;
    vertical-align: middle;
    width: 120px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: all .3s ease-in-out;
}

.pick-version {
    padding: 0 30px;
    height: 450px;
    transition: height .5s;
}

.upload-version {
    padding: 0 30px;
    height: 372px;
    transition: height .5s;
}

.cover-dialog-footer {
    height: 86px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cover-dialog-submit {
    width: 128px;
    font-size: 16px;
    padding: 12px 16px;
    color: #fff;
    background-color: var(--brand_pink);
    display: inline-block;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    position: relative;
    line-height: 1;
}

/* element 元素 */
.cover-dialog /deep/ .el-dialog__body {
    margin: -30px 0 0 0;
    padding: 0;
}

.el-input {
    width: 80%;
    --el-input-hover-border-color: var(--brand_pink);
}

.el-input /deep/ .el-input__wrapper {
    padding: 4px 11px;
}

.el-textarea {
    --el-input-focus-border-color: #dcdfe6;
    --el-input-hover-border-color: #dcdfe6;
}

.el-textarea /deep/ .el-textarea__inner {
    height: 160px !important;
    resize: none;
    font-size: 13px;
    padding: 12px 15px;
    padding-right: 60px;
    line-height: 1.42;
    border-radius: 8px;
}

.el-textarea /deep/ .el-textarea__inner::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.el-textarea /deep/ .el-textarea__inner::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ccc;
}

</style>