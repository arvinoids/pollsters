<template>
  <div v-if="!submitted" class="prose">
    <h1>{{ poll.title }}</h1>
    <h3>Questions:</h3>
    <ol>
      <li v-for="(question, index) in poll.expand!.questions" :key="index">
        <div>
          <legend>{{ question.question }}</legend>
          <div
            v-for="(option, optionIndex) in question.expand.options"
            :key="optionIndex"
          >
            <input
              type="radio"
              :id="option.id"
              :name="question.id"
              :value="option.id"
              class="mr-3"
              v-model="answers[index]"
            />
            <label :for="option.id">{{ option.name }}</label>
          </div>
        </div>
      </li>
    </ol>
    <div class="flex justify-between">
      <nuxt-link to="/"><button class="btn btn-cancel">Back to Home</button></nuxt-link>
      <button class="btn btn-confirm" @click="submitAnswers">Submit</button>
    </div>
  </div>
  <div v-else class="flex flex-col items-center gap-3">
    <p class="text-lg text-green-600 text-center">Your answer has been submitted!</p>
    <HomeButton />
  </div>
</template>

<script setup lang="ts">
import type { AuthModel } from "pocketbase";

// get route parameter to identify the poll
const route = useRoute();
const id = route.params.id as string;
const submitted = ref(false);

// use pocketbase session from plugin
const pb = useNuxtApp().$pb;
const user = pb.authStore.model;
if (!user) navigateTo("/login");

const poll = await getPoll(id);
const assignment = await getAssignment();

const answers = ref<Record<number, string>>({});

// get the poll and its options
async function getPoll(id: string) {
  const poll = await pb
    .collection("polls")
    .getOne(id, { expand: "questions,questions.options" });
  return poll;
}

async function getAssignment() {
  const record = await pb
    .collection("assignments")
    .getFirstListItem(`user="${user!.id}"&&poll="${id}"`);
  return record;
}

async function submitAnswers() {
  try {
    for (const [index, question] of poll.questions.entries()) {
      console.log(index);
      console.log("question: ", question);
      const answer = answers.value[index];
      await saveAnswer(question, answer);
    }
  } catch (e: any) {
    console.log(e.message);
  }
}

async function setAnswered() {
  await pb.collection("assignments").update(assignment.id, { answered: true });
}

async function saveAnswer(question: string, answer: string) {
  const data = {
    poll: poll.id,
    user: user!.id,
    question,
    answer,
  };
  try {
    await pb.collection("responses").create(data);
    await setAnswered();
    submitted.value = true;
  } catch (e: any) {
    console.log(e);
  }
}
</script>

<style></style>
