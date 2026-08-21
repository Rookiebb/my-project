<template>
    <div class="message-reply">
        
    </div>
</template>

<script lang="ts">
export default { name: "MessageReply" };
</script>

<script setup lang="ts">
import { clearMsgUnread } from '@/api';

async function clearUnread() {
    await clearMsgUnread("reply");
}

clearUnread();
</script>

<style scoped>

</style>