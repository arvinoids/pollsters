<template>
    <div v-if="loggedIn">
        <Main />
    </div>
</template>

<script setup lang='ts'>
const pb = useNuxtApp().$pb
const user = pb.authStore.model
const loggedIn = user ? true : false
if (!loggedIn) navigateTo('/login')

</script>
