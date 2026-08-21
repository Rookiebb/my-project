<template>
    <div class="message-love">

    </div>
</template>

<script lang="ts">
export default { name: "MessageLove" };
</script>

<script setup lang="ts">
import { clearMsgUnread } from '@/api';

async function clearUnread() {
    await clearMsgUnread("love");
}

clearUnread();
</script>

<style scoped>

</style>