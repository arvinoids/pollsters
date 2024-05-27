<template>
  <div class="prose">
    <div v-if="assignments.length > 0">
      <h3>Here are your surveys:</h3>
      <ul v-for="poll in assignments">
        <li class="list-none text-blue-400">
          <span class="text-gray-600 p-2" v-if="poll.answered"
            >{{poll.expand!.poll.title }} (Answered)</span
          >
          <span v-else
            ><nuxt-link
              :to="{ name: 'polls-id', params: { id: poll.expand!.poll.id } }"
              class="no-underline text-blue-600"
              >{{
                    poll.expand!.poll.title
              }}</nuxt-link
            ></span
          >
        </li>
      </ul>
    </div>
    <div v-else><h3>There are currently no surveys for you.</h3></div>
  </div>
</template>

<script setup lang="ts">
const pb = useNuxtApp().$pb;
const user = pb.authStore.model;

// get the poll IDs assigned to this user
const assignments = await pb
  .collection("assignments")
  .getList(1, 1000, { filter: `user="${user!.id}"`, expand: "poll" })
  .then((res) => res.items);

console.log(assignments);
</script>
