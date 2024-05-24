<template>
  <div>
    <button @click="showDialog = true" class="btn btn-normal">Create a Choice</button>
    <DialogBox v-if="showDialog"
      ><h2 class="text-xl font-bold mb-4">Create an answer choice</h2>
      <div>
        Choice:
        <input type="text" v-model="name" />
      </div>
      <div>Description: <input type="text" v-model="description" /></div>
      <div class="flex justify-between">
        <button @click="showDialog = false" class="btn btn-cancel">Cancel</button>
        <button @click="submit()" class="btn btn-confirm">Submit</button>
      </div></DialogBox
    >
  </div>
</template>

<script setup lang="ts">
const pb = useNuxtApp().$pb;
const showDialog = ref(false);
let name: string, description: string;

async function submit() {
  const data = { name, description };
  try {
    await pb.collection("options").create(data);
    showDialog.value = false;
  } catch (e: any) {
    alert(e.message);
  }
}
</script>

<style></style>
