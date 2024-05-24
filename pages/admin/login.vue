<template>
  <div class="text-center w-full">
    <div v-if="!loggedInAsAdmin">
      <h2 class="text-xl font-bold py-3">Administrator Login</h2>
      <form @submit.prevent="login" class="flex flex-col gap-3">
        <div class="form-group">
          <label for="username">Username: </label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            placeholder="administrator"
            class="text-center"
          />
        </div>
        <div class="form-group">
          <label for="password">Password: </label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="text-center"
          />
        </div>
        <button
          class="btn btn-confirm w-fit self-center"
          type="submit"
          @click="adminLogin"
        >
          Login
        </button>
      </form>
    </div>
    <div class="message mt-2" v-if="message">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
let username: string, password: string;
const loggedInAsAdmin = useLoggedInAsAdmin();
const message = ref("");
const pb = useNuxtApp().$pb;
async function adminLogin() {
  try {
    const authData = await pb.collection("users").authWithPassword(username, password);
    if (authData.record.role === "admin") loggedInAsAdmin.value = true;
    navigateTo("/admin");
  } catch (e: any) {
    message.value = e.message;
  }
}
</script>

<style></style>
