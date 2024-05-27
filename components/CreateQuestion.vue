<template>
  <div>
    <button class="btn btn-normal" @click="showDialog = true"><slot /></button>
    <DialogBox v-if="showDialog">
      <div class="text-xl font-bold">Create a question</div>
      <div>
        Question:<input type="" name="" v-model="question" placeholder="What is love?" />
      </div>
      <div>
        <p>Select choices:</p>
        <select
          name="group"
          class="select select-bordered grow"
          v-model="options"
          multiple
        >
          <option v-for="choice in allChoices" :value="choice.id" :key="choice.id">
            {{ choice.name }} ({{ choice.description }})
          </option>
        </select>
        <p class="text-xs text-blue-600">Hold shift to select multiple</p>
        <CreateOption>Add a choice</CreateOption>
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
const allChoices = ref(await pb.collection("options").getFullList());
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

pb.collection("options").subscribe("*", async (event) => {
  allChoices.value = await pb.collection("options").getFullList();
});
</script>

<style></style>
