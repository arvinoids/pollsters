<template>
  <div class="text-center" v-if="loggedIn">
    <Greeter />
    <Assignments />
  </div>
</template>

<script setup lang="ts">
const pb = useNuxtApp().$pb;
const loggedIn = ref(pb.authStore.model ? true : false);
onMounted(() => {
  if (!loggedIn.value) navigateTo("/login");
});
</script>
