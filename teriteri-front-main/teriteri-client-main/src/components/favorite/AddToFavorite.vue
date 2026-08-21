<template>
    <div class="add-to-favorite">
        <div class="title">添加到收藏夹</div>
        <div class="content">
            <div class="group-list">
                <ul>
                    <li :class="currSelected.has(item.fid) ? 'selected' : ''" @click="selectOrCancel(item.fid)" v-for="(item, index) in favorites" :key="index">
                        <label>
                            <span class="select-box">
                                <i class="iconfont icon-gou"></i>
                            </span>
                            <span :title="item.title" class="fav-title">{{ item.title }}</span>
                            <span class="count">{{ item.count }}{{ item.type === 1 ? "" : "/1000" }}</span>
                        </label>
                    </li>
                    <div class="collection-mask" v-if="isCreating"></div>
                </ul>
                <div class="add-group">
                    <div class="add-btn" v-if="!isCreating" @click="(e) => startCreating(e)"><i class="iconfont icon-jia"></i>新建收藏夹</div>
                    <div class="input-group" v-else>
                        <input type="text" v-model="input" maxlength="20" placeholder="最多输入20个字">
                        <button class="create-btn" @click="create">新建</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <button class="submit" :class="{'disable': isCreating || areSetsEqual}" @click="submit">确定</button>
        </div>
    </div>
</template>

<script lang="ts">
export default { name: "AddToFavorite" };
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { ElMessage } from 'element-plus';
import { useUserStore, useVideoStore } from '@/stores';
import { createFavorite, collectVideo } from '@/api';

const userStore = useUserStore();
const videoStore = useVideoStore();

const props = defineProps({
    // 原本已经收藏了的收藏夹ID 方便比较新添加和移除
    lastSelected: {
        type: Set,
        default() {
            return new Set();
        }
    },
    vid: {
        type: Number,
        default() {
            return 0;
        }
    }
});

const emit = defineEmits(['collected']);

const favorites = ref<any[]>(JSON.parse(JSON.stringify(userStore.favorites)));    // 收藏夹列表 store中的副本 方便修改收藏数
const currSelected = ref<Set<any>>(new Set([...props.lastSelected]));   // 当前选中的收藏夹ID（将 lastSelected 中的元素添加到新的 Set 中）
const isCreating = ref(false);  // 是否正在创建收藏夹
const input = ref("");  // 新建收藏夹名字

// 判断勾选的收藏夹ID集合是否跟之前有变化
const areSetsEqual = computed(() => {
    if (props.lastSelected.size !== currSelected.value.size) {
        return false;
    }
    return Array.from(props.lastSelected).every(value => currSelected.value.has(value));
});

///////// 请求 ///////////
// 创建新收藏夹
async function create() {
    if (input.value.length === 0) {
        ElMessage.error("请输入收藏夹名字");
        return;
    }
    const res = await createFavorite({ title: input.value, desc: "", visible: 1 });
    if (!res) {
        ElMessage.error("特丽丽被玩坏了QAQ");
        return;
    }
    currSelected.value = new Set([...props.lastSelected]);    // 初始化已选的，防止出现收藏数量偏差
    userStore.favorites.splice(1, 0, res.data);    // 在第二个位置插入新收藏夹，即默认收藏夹后面
    input.value = "";
    isCreating.value = false;
}

// 添加收藏夹提交
async function submit() {
    if (areSetsEqual.value) return;
    if (props.vid === 0) {
        ElMessage.error("视频不存在");
        return;
    }
    const remove = Array.from(props.lastSelected).filter(value => !currSelected.value.has(value));
    const add = Array.from(currSelected.value).filter(value => !props.lastSelected.has(value));
    // 如果之前没有收藏，现在有新加入的收藏夹，就标记为收藏
    const isCollect = props.lastSelected.size === 0 && add.length > 0;
    // 如果没有要新加入的收藏夹，且之前有收藏，并且现在要移除的收藏夹与之前的全部一样，就标记为需要取消收藏
    const isCancel = add.length === 0 && props.lastSelected.size > 0 && props.lastSelected.size === remove.length && remove.every(value => props.lastSelected.has(value));
    const res = await collectVideo({ vid: props.vid, adds: add.join(','), removes: remove.join(',') });
    if (!res) return;
    if (isCollect) {
        videoStore.attitudeToVideo.collect = true;
    } else if (isCancel) {
        videoStore.attitudeToVideo.collect = false;
    }
    const info = {
        fids: currSelected.value,
        num: isCollect ? 1 : isCancel ? -1 : 0
    }
    userStore.favorites = favorites.value;
    emit("collected", info);
}


///////// 事件 ///////////
// 选择或者取消选择
function selectOrCancel(fid: any) {
    const favItem = favorites.value.find(item => item.fid === fid);
    if (currSelected.value.has(fid)) {
        currSelected.value.delete(fid);
        favItem.count --;
    } else {
        currSelected.value.add(fid);
        favItem.count ++;
    }
}

// 开始创建收藏夹
function startCreating(event: MouseEvent) {
    isCreating.value = true;
    event.stopPropagation();
}

// 点击空白处关闭创建输入框
function handleOutsideClick(event: MouseEvent) {
    const addGroup = document.querySelector(".add-group")!;
    const submitBtn = document.querySelector(".submit")!;
    if (!addGroup.contains(event.target as Node) && !submitBtn.contains(event.target as Node)) {
        isCreating.value = false;
    }
}

onMounted(() => {
    window.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
    window.removeEventListener("click", handleOutsideClick);
});

watch(() => userStore.favorites, (curr) => {
    favorites.value = JSON.parse(JSON.stringify(curr));
}, { deep: true });
</script>

<style scoped>
.add-to-favorite {
    width: 420px;
    border-radius: 4px;
    background: #FFFFFF;
    overflow: hidden;
}

.title {
    position: relative;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: var(--text1);
    border-bottom: var(--line_regular);
    text-align: center;
}

.content {
    padding: 0 36px;
    height: 300px;
    overflow: auto;
}

.group-list {
    max-height: 300px;
    padding-bottom: 14px;
}

ol, ul {
    list-style: none;
}

.group-list ul {
    position: relative;
    margin-top: 24px;
    min-height: 210px;
}

.group-list li {
    padding-bottom: 24px;
    font-size: 14px;
    color: var(--text1);
    cursor: pointer;
}

.group-list li:hover {
    color: var(--brand_pink);
}

.group-list li label {
    cursor: pointer;
    display: block;
}
.group-list li .select-box {
    position: relative;
    display: inline-flex;
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 3px;
    align-items: center;
    justify-content: center;
    margin-right: 18px;
    vertical-align: middle;
}

.group-list li:hover .select-box {
    border: 2px solid var(--brand_pink);
}

.selected .select-box {
    background-color: var(--brand_pink);
    border: 1px solid var(--brand_pink) !important;
}

.icon-gou {
    color: #fff;
    font-size: 25px;
    transform: translateX(0.5px);
}

.fav-title {
    max-width: 220px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    line-height: 20px;
}

.selected .fav-title {
    color: var(--brand_pink);
}

.count {
    float: right;
    color: var(--text2);
    font-size: 12px;
    line-height: 18px;
}

.collection-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #FFFFFF;
    background: var(--bg1_float);
}

.add-group {
    margin-bottom: 5px;
    width: 348px;
}

.add-btn {
    height: 34px;
    line-height: 34px;
    border: 1px solid var(--text3);
    border-radius: 4px;
    font-size: 12px;
    color: var(--text2);
    cursor: pointer;
    box-sizing: unset;
}

.add-btn:hover {
    border: 1px solid var(--brand_pink);
}

.icon-jia {
    margin: 0 10px;
}

.input-group {
    height: 34px;
    line-height: 34px;
    border: 1px solid var(--brand_pink);
    border-radius: 4px;
    position: relative;
    box-sizing: unset;
}

.input-group input {
    border: none;
    font-size: 12px;
    width: 200px;
    margin-left: 10px;
    padding: 0;
    box-shadow: none;
    height: 100%;
    background: transparent;
    color: var(--text1);
    outline: none;
}

.input-group .create-btn {
    float: right;
    height: 34px;
    width: 90px;
    background: var(--Pi1);
    border: none;
    border-left: 1px solid var(--brand_pink);
    border-radius: 0 4px 4px 0;
    font-size: 14px;
    color: var(--brand_pink);
    cursor: pointer;
}

.bottom {
    height: 76px;
    text-align: center;
    margin: 0 36px;
    border-top: 1px solid var(--line_regular);
}

.submit {
    font-size: 14px;
    width: 160px;
    height: 40px;
    margin-top: 18px;
    background: var(--brand_pink);
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
}

.submit:hover {
    background: var(--Pi4);
}

.submit.disable {
    background-color: var(--graph_bg_thick);
    color: var(--text3);
}
</style>