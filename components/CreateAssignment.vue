<template>
  <div>
    <button class="btn btn-normal" @click="showDialog = true">
      Assign Survey to User
    </button>
    <DialogBox v-if="showDialog">
      <div><p class="font-bold">Assign survey</p></div>
      <div>
        <p>Select a survey:</p>
        <select
          name="survey"
          class="select select-bordered grow"
          v-model="surveys"
          multiple
        >
          <option v-for="poll in allPolls" :value="poll.id" :key="poll.id">
            {{ poll.title }} ({{ poll.description }})
          </option>
        </select>
        <p class="text-xs text-blue-600">Hold shift to select multiple</p>
      </div>
      <div>
        <p>Assign to users:</p>
        <select name="users" class="select select-bordered grow" v-model="users" multiple>
          <option v-for="user in allUsers" :value="user.id" :key="user.id">
            {{ user.email }}
          </option>
        </select>
        <p class="text-xs text-blue-600">Hold shift to select multiple</p>
      </div>
      <button class="btn btn-cancel" @click="showDialog = false">Cancel</button>
      <button class="btn btn-confirm" @click="assignSurvey">Assign</button>
    </DialogBox>
  </div>
</template>

<script setup lang="ts">
const showDialog = ref(false);
const pb = useNuxtApp().$pb;
const surveys = ref<string[]>([]);
const users = ref<string[]>([]);

const allUsers = ref(await pb.collection("users").getFullList());
const allPolls = ref(await pb.collection("polls").getFullList());

pb.collection("polls").subscribe("*", async (event) => {
  allPolls.value = await pb.collection("polls").getFullList();
});

pb.collection("users").subscribe("*", async (event) => {
  allUsers.value = await pb.collection("users").getFullList();
});

async function assignSurvey() {
  let status = false;
  for (let user of users.value) {
    for (let poll of surveys.value) {
      try {
        await pb.collection("assignments").create({ user, poll, answered: false });
        status = true;
      } catch (e: any) {
        alert(e.message);
      }
    }
  }
  if ((status = true)) {
    alert("Assignments created");
    showDialog.value = false;
  } else {
    alert("Assignment failed");
  }
}
</script>
