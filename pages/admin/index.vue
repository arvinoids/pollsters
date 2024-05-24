<template>
  <div>
    <h1 class="text-xl font-bold">Logged in as admin</h1>
    <div class="flex flex-col">
      <CreateSurvey />
      <CreateAssignment />
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateSurvey from "~/components/CreateSurvey.vue";
import AssignSurvey from "~/components/CreateAssignment.vue";
import CreateAssignment from "~/components/CreateAssignment.vue";

const loggedInAsAdmin = useLoggedInAsAdmin();
if (!loggedInAsAdmin.value) navigateTo("/admin/login");
</script>

<style></style>
