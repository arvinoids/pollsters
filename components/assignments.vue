<template>
  <div class="prose">
    <div v-if="assignments.length > 0">
      <h3>Here are your surveys:</h3>
      <ul v-for="poll in assignments">
        <li>
          <nuxt-link
            :to="{ name: 'polls-id', params: { id: poll.expand!.poll.id } }"
            class="no-underline"
            >{{
                    poll.expand!.poll.title
            }}</nuxt-link
          ><span class="border p-2" v-if="poll.expand!.poll.answered">Answered</span>
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
</script>
