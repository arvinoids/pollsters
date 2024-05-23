<template>
    <div class="prose">
        <h2>Select a survey</h2>
        <div>
            <ul v-for="poll in polls">
                <li><nuxt-link :to="{ name: 'polls-id', params: { id: poll.id } }" class="no-underline">{{ poll.title
                        }}</nuxt-link></li>
            </ul>
        </div>
    </div>
</template>

<script setup lang='ts'>
// use the pocketbase session from plugin
const pb = useNuxtApp().$pb
const polls = await pb.collection('polls').getFullList()

</script>