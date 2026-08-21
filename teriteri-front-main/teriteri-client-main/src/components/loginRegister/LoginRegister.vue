<template>
    <div class="login-register">
        <div class="canvas-wrapper">
            <div class="video-wrapper">
                <video
                    src="~assets/video/BadApple.mp4"
                    id="login-video" ref="loginVideo"
                    muted autoplay loop
                ></video>
            </div>
            <canvas id="cvs" width="360" height="360"></canvas>
            <canvas id="cvs2" width="360" height="360" @click="playVideo" loop></canvas>
        </div>
        <div class="login-register-container">
            <el-tabs stretch class="login-tabs" @tab-click="handleClick">
                <el-tab-pane label="登录" lazy>
                    <div class="login-box">
                        <el-input type="text" class="input" v-model="usernameLogin" placeholder="请输入账号" />
                        <el-input type="password" show-password class="input" v-model="passwordLogin" placeholder="请输入密码" />
                        <div class="submit" @click="submitLogin">登&nbsp;录</div>
                        <div class="tips">登录即代表你同意我们的<span class="agreement">用户协议</span></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="注册" lazy>
                    <div class="register-box">
                        <el-input type="text" class="input" v-model="usernameRegister" placeholder="请输入账号" maxlength="50" />
                        <el-input type="password" show-password class="input" v-model="passwordRegister" placeholder="请输入密码" />
                        <el-input type="password" show-password class="input" v-model="confirmedPassword" placeholder="再次确认密码" />
                        <div class="submit" @click="submitRegister">注&nbsp;册</div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script lang="ts">
export default { name: "LoginRegister" };
</script>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { useAppStore, useUserStore, useMessageStore, useChatStore } from '@/stores';
import { register as registerApi, getFavoriteListForUser, getLikeAndDislike } from '@/api';
import { TOKEN_KEY } from '@/constants';

const appStore = useAppStore();
const userStore = useUserStore();
const messageStore = useMessageStore();
const chatStore = useChatStore();

const emit = defineEmits(['loginSuccess']);

const loginVideo = ref<HTMLVideoElement | null>(null);
const usernameLogin = ref("");
const passwordLogin = ref("");
const usernameRegister = ref("");
const passwordRegister = ref("");
const confirmedPassword = ref("");
const type = ref(1);    // 1登录 2注册

// canvas 动画
function init() {
    const ctx = (document.getElementById("cvs") as HTMLCanvasElement).getContext("2d")!;
    const ctx2 = (document.getElementById("cvs2") as HTMLCanvasElement).getContext("2d")!;

    const video = loginVideo.value!;
    video.crossOrigin = "anonymous";    // 允许在不同域之间共享资源

    const playVideo = () => {
        requestAnimationFrame(playVideo);   // 每一帧之间调用 playVideo 函数，实现连续播放
        const { width, height } = ctx.canvas;
        ctx.drawImage(video, 0, 0, width, height);   // 从视频元素中绘制图像数据到画布上
        const data = ctx.getImageData(0, 0, width, height).data;
        ctx2.clearRect(0, 0, width, height);    // 清除第二个画布，以便在每一帧之间重新绘制像素数据
        const bl = 12;
        // 计算 x 和 y 坐标的最大值
        const maxX = Math.ceil(width / bl);
        const maxY = Math.ceil(height / bl);
        ctx.font = "5px serif";
        for (let x = 0; x < maxX; x++) {
            for (let y = 0; y < maxY; y++) {
                const i = (y * bl * width + x * bl) * 4;
                const g = parseInt(
                    (data[i] + data[i + 1] + data[i + 2]) / 1.5
                );  // 计算当前像素的灰度值
                ctx2.fillStyle = `rgba(${g}, ${g}, ${g}, ${data[i + 3]})`;  // 绘制文本的颜色，透明度取自当前像素
                ctx2.fillText("0", x * bl, y * bl);   // 文本填充
            }
        }
    };
    playVideo();
}

function playVideo() {
    loginVideo.value?.play();
}

// 点击标签页触发的事件
function handleClick(tab: any) {
    if (tab.props.label === '登录') {
        type.value = 1;
    } else {
        type.value = 2;
    }
}

// 监听键盘回车触发登录
function handleKeyboard(event: KeyboardEvent) {
    if (event.keyCode === 13 && type.value === 1) {
        submitLogin();
    }
}

// 登录的回调
async function submitLogin() {
    // 前端先做判断，减轻服务器负担
    if (usernameLogin.value.trim() == "") {
        ElMessage.error("请输入账号");
        return;
    }
    if (passwordLogin.value == "") {
        ElMessage.error("请输入密码");
        return;
    }
    appStore.isLoading = true;
    // 这里为了更方便捕捉到错误后给出提示，就不使用封装的函数了
    const result = await axios.post("/api/user/account/login", {
        username: usernameLogin.value.toString(),
        password: passwordLogin.value.toString(),
    }).catch(() => {
        ElMessage.error("特丽丽被玩坏了");
        appStore.isLoading = false;
    });
    if (!result) {
        appStore.isLoading = false;
        return;
    }
    if (result.data.code !== 200) {
        ElMessage.error(result.data.message);
        appStore.isLoading = false;
    }
    if (result.data.code === 200) {
        localStorage.setItem(TOKEN_KEY, result.data.data.token);    // 浏览器缓存token
        userStore.user = result.data.data.user;                     // 更新当前用户信息
        await messageStore.fetchMsgUnread();
        await initIMServer();   // 开启即时通信websocket
        await getFavorites();
        await getLikeAndDisLikeComment();
        ElMessage.success(result.data.message);
        userStore.isLogin = true;   // 修改在线状态
        emit("loginSuccess");   // 触发父组件关闭登录框的回调
        appStore.isLoading = false;
    }
}

async function submitRegister() {
    // 前端先做判断，减轻服务器负担
    if (usernameRegister.value.trim() == "") {
        ElMessage.error("账号不能为空");
        return;
    }
    if (passwordRegister.value == "" || confirmedPassword.value == "") {
        ElMessage.error("密码不能为空");
        return;
    }
    if (passwordRegister.value != confirmedPassword.value) {
        ElMessage.error("两次输入的密码不一致");
        return;
    }

    const result = await registerApi({
        username: usernameRegister.value.toString(),
        password: passwordRegister.value.toString(),
        confirmedPassword: confirmedPassword.value.toString(),
    });
    if (!result) return;
    if (result.code === 200) {
        ElMessage.success(result.message);
        usernameRegister.value = "";
        passwordRegister.value = "";
        confirmedPassword.value = "";
    }
}


// 开启实时通信消息服务
async function initIMServer() {
    await chatStore.connectWebSocket();
    const connection = JSON.stringify({
        code: 100,
        content: "Bearer " + localStorage.getItem(TOKEN_KEY),
    });
    chatStore.ws?.send(connection);
}

// 获取当前用户的收藏夹列表
async function getFavorites() {
    const res = await getFavoriteListForUser(userStore.user!.uid);
    if (!res.data) return;
    // 将默认置顶
    const data: any[] = res.data;
    const defaultFav = data.find(item => item.type === 1);
    const list = data.filter(item => item.type !== 1);
    list.unshift(defaultFav);
    userStore.favorites = list;
}

// 获取用户赞踩的评论集合
async function getLikeAndDisLikeComment() {
    const res = await getLikeAndDislike(userStore.user!.uid);
    if (!res.data) return;
    userStore.likeComment = res.data.userLike;
    userStore.dislikeComment = res.data.userDislike;
}

onMounted(() => {
    init();
    document.addEventListener('keydown', handleKeyboard);
});

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeyboard);
});
</script>

<style scoped>
.login-register {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
}
.canvas-wrapper {
    position: relative;
    width: 360px;
    height: 360px;
}

.video-wrapper {
    visibility: hidden;
    position: absolute;
    width: 360px;
    height: 360px;
}

.video-wrapper video {
    object-fit: fill;
    display: block;
}

#cvs {
    visibility: hidden;
    position: absolute;
}

#cvs2 {
    position: absolute;
    top: 4px;
    left: 5px;
}

.login-register-container {
    display: block;
    width: 360px;
    height: 360px;
    padding: 30px 40px;
}

.login-tabs {
    width: 80%;
    margin: 0 auto;
}

.login-box, .register-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login-box .input, .login-box .submit, .login-box .tips {
    margin-top: 30px;
    width: 100%;
}

.register-box .input, .register-box .submit, .register-box .tips {
    margin-top: 20px;
    width: 100%;
}

.submit {
    color: #fff;
    border-radius: 4px;
    background-color: var(--brand_pink);
    text-align: center;
    padding: 10px 15px;
    cursor: pointer;
}

.submit:hover {
    background-color: #f992af;
}

.tips {
    color: var(--text2);
    font-size: 12px;
    text-align: center;
}

.tips .agreement {
    color: var(--brand_blue);
    margin-left: 4px;
    cursor: pointer;
}

/* element 元素 */
.el-input {
    --el-input-focus-border: #ccc;
    --el-input-focus-border-color: #ccc;
    --el-input-border-radius: 10px;
    --el-input-height: 40px;
}

.el-input /deep/ .el-input__inner {
    padding: 8px 15px;
}

.el-input /deep/ .el-input__icon {
    margin-right: 8px;
}

.login-register-container /deep/ .el-tabs__active-bar {
    height: 3px;
}

.login-register-container /deep/ .el-tabs__nav-wrap::after {
    height: 0;
}

.login-register-container /deep/ .el-tabs__item {
    font-size: 17px;
}
</style>