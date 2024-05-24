<template>
  <div>
    <button class="btn btn-normal" @click="showDialog = true">Create a Question</button>
    <DialogBox v-if="showDialog">
      <div class="text-xl font-bold">Create a question</div>
      <div>
        Question:<input type="" name="" v-model="question" placeholder="What is love?" />
      </div>
      <div>
        Select choices:
        <select
          name="group"
          class="select select-bordered grow"
          v-model="options"
          multiple
        >
          <option v-for="choice in allChoices" :value="choice.id" :key="choice.id">
            {{ choice.name }}({{ choice.description }})
          </option>
        </select>
      </div>
      <div class="flex justify-between gap-3">
        <button class="btn btn-cancel" @click="showDialog = false">Cancel</button>
        <button class="btn btn-confirm" @click="createQuestion">Create Question</button>
      </div>
    </DialogBox>
  </div>
</template>

<script setup lang="ts">
const pb = useNuxtApp().$pb;
const allChoices = await pb.collection("options").getFullList();
let question: string;
let options: string[];
const showDialog = ref(false);
async function createQuestion() {
  try {
    await pb.collection("questions").create({ question, options });
    showDialog.value = false;
    alert("Question has been added.");
  } catch (e: any) {
    alert(e.message);
  }
}
</script>

<style></style>
