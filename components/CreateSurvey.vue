<template>
  <div>
    <button class="btn btn-normal" @click="showDialog = true">Create a Survey</button>
    <DialogBox v-if="showDialog">
      <div><p class="font-bold">Create a survey</p></div>
      <div>
        Survey title:<input
          type="text"
          name="title"
          v-model="title"
          placeholder="Name your survey"
        />
      </div>
      <div>
        Description:<input
          type="text"
          name="desc"
          v-model="description"
          placeholder="Describe your survey"
        />
      </div>
      <div>
        <span>Survey questions:</span>
        <select
          name="group"
          class="select select-bordered grow"
          v-model="questions"
          multiple
        >
          <option
            v-for="question in allQuestions"
            :value="question.id"
            :key="question.id"
          >
            {{ question.question }}
          </option>
        </select>
        <p class="text-xs text-blue-600">Hold shift to select multiple</p>
        <CreateQuestion />
      </div>
      <div class="flex justify-between gap-3">
        <button class="btn btn-cancel" @click="showDialog = false">Cancel</button>
        <button class="btn btn-confirm" @click="createSurvey">Create Survey</button>
      </div>
    </DialogBox>
  </div>
</template>

<script setup lang="ts">
const pb = useNuxtApp().$pb;
const title = ref();
const description = ref();
const questions = ref<string[]>([]);
const showDialog = ref(false);

const allQuestions = ref(await pb.collection("questions").getFullList());

// subscribe to questions collection
pb.collection("questions").subscribe("*", async (event) => {
  allQuestions.value = await pb.collection("questions").getFullList();
});

async function createSurvey() {
  const data = {
    title,
    description,
    questions,
  };
  return;
}
</script>

<style></style>
