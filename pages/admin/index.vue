<template>
  <div class="w-full" v-if="loggedInAsAdmin">
    <Greeter class="w-full" />
    <h1 class="text-xl font-bold my-4">Logged in as admin</h1>
    <div class="flex flex-col">
      <CreateSurvey />
      <CreateAssignment />
    </div>
    <HomeButton />
    <div class="mt-5">
      <nuxt-link to="/admin/results" class="btn btn-confirm">Results</nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const pb = useNuxtApp().$pb;
const loggedInAsAdmin = ref(
  pb.authStore.model ? pb.authStore.model.role === "admin" : false
);

console.log("is user admin? ", loggedInAsAdmin.value);
if (!loggedInAsAdmin.value) navigateTo("/admin/login");
</script>

<style></style>
