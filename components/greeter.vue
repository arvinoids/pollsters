<template>
  <div class="">
    <div class="flex items-center justify-between">
      <p>Hello, {{ user!.email }}</p>
      <button class="btn bg-gray-400 text-white" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const pb = useNuxtApp().$pb;
const user = pb.authStore.model;
const loggedIn = ref(user ? true : false);
if (!loggedIn.value) navigateTo("/login");

function logout() {
  pb.authStore.clear();
  loggedIn.value = false;
  navigateTo("/login");
}
</script>

<style></style>
