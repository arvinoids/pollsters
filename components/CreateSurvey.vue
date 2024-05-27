<template>
  <div>
    <button class="btn btn-normal" @click="showDialog = true">Create a Survey</button>
    <DialogBox v-if="showDialog">
      <div><p class="font-bold">Create a survey</p></div>
      <div>
        Survey name:<input
          type="text"
          name="name"
          v-model="name"
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
      <div><span>Survey questions:</span><CreateQuestion /></div>
      <div class="flex justify-between gap-3">
        <button class="btn btn-cancel" @click="showDialog = false">Cancel</button>
        <button class="btn btn-confirm" @click="creatSurvey">Create Survey</button>
      </div>
    </DialogBox>
  </div>
</template>

<script setup lang="ts">
const name = ref();
const description = ref();
const showDialog = ref(false);

async function createSurvey() {
  return;
}
</script>

<style></style>
