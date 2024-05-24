<template>
  <div class="w-[50ch]">
    <div v-if="user" class="flex flex-col gap-4 items-center ">
      <h1>{{ `Welcome, ${user.email}` }}</h1>
      <button class="btn" @click="pb.authStore.clear(); user=null">Logout</button>
    </div>
    <form v-else @submit.prevent="loginMode ? loginUser() : registerUser()" class="flex flex-col items-center gap-3">
      <h2 class="text-xl font-bold">{{ loginMode ? 'Login' : 'Register' }}</h2>
      <input type="email" id="email" v-model="formState.email" required class="text-center border" placeholder="email@domain">
      <input type="password" id="password" v-model="formState.password" required class="text-center border"
        placeholder="password">
      <input v-if="(loginMode === false)" type="password" id="passwordConfirm" v-model="formState.passwordConfirm"
        required class="text-center border" placeholder="confirm password">
      <button type="submit" class="btn">{{ loginMode ? 'Login'
        : 'Register' }}</button>
      <button type="button" @click="toggleLoginMode" class="hover:font-bold text-blue-800">
        {{ loginMode ? 'Need an account?' : 'Already have an account?' }}
      </button>
      <div v-if="message" class="p-3 bg-orange-200 border-orange-400 text-center">{{ message }}</div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import type { RecordModel } from 'pocketbase';

const pb = useNuxtApp().$pb
const user = ref<RecordModel | null>(pb.authStore.model as RecordModel)
const loginMode = ref(true);
const message = ref('')

const formState = reactive({
  email: '',
  password: '',
  passwordConfirm: ''
});

const toggleLoginMode = () => {
  loginMode.value = !loginMode.value;
};

const loginUser = async () => {
  message.value = ''
  try {
    const authData = await pb.collection('users').authWithPassword(formState.email, formState.password);
    user.value = authData.record;
  } catch (error: any) {
    message.value = 'Login failed: ' + error.message;
  }
};

const registerUser = async () => {
  message.value = ''
  try {
    const authData = await pb.collection('users').create({
      email: formState.email,
      password: formState.password,
      passwordConfirm: formState.passwordConfirm
    });
    message.value = 'You have successfully registered. Login to continue.'
    loginMode.value = true
    setTimeout(() => {
      message.value = '';
  
    }, 3000);
    user.value = pb.authStore.model as RecordModel
  } catch (error: any) {
    message.value = 'Registration failed: ' + error.message;
  }
};
</script>

<style scoped>
input {
  @apply rounded
}
.btn {
  @apply border p-2 bg-green-500 text-white rounded hover:contrast-150 w-[100px]
}
</style>
