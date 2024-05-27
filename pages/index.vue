<template>
  <div class="flex flex-col text-center w-full h-auto" v-if="loggedIn">
    <Greeter class="mb-5" />
    <Assignments class="mb-auto" />

    <nuxt-link to="/admin" class="text-xs text-blue-600">Admin</nuxt-link>
  </div>
</template>

<script setup lang="ts">
const pb = useNuxtApp().$pb;
const loggedIn = ref(pb.authStore.model ? true : false);
onMounted(() => {
  if (!loggedIn.value) navigateTo("/login");
});
</script>
