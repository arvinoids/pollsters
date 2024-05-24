<template>
  <div>
    <h1 class="text-xl font-bold">Logged in as admin</h1>
    <div class="flex flex-col">
      <CreateSurvey />
      <CreateAssignment />
      <CreateQuestion />
      <CreateOption />
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateQuestion from "~/components/CreateQuestion.vue";

const pb = useNuxtApp().$pb;
const loggedInAsAdmin = ref(
  pb.authStore.model ? pb.authStore.model.role === "admin" : false
);

console.log("is user admin? ", loggedInAsAdmin.value);
if (!loggedInAsAdmin.value) navigateTo("/admin/login");
</script>

<style></style>
