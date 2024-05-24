<template>
    <div class="prose">
        <div>{{ poll.title }}</div>
        <h3>Questions:</h3>
        <ol>
            <li v-for="question in poll.expand!.questions">
                <div>
                    <legend>{{ question.question }}</legend>
                    <div v-for="options in question.expand.options">
                    <input type="radio" :id="options.id" :name="question.identifier" :value="options.id">
                    <label :for="options.id">{{ options.name }}</label>
                    </div>
                </div>
            </li>
        </ol>
    </div>
</template>

<script setup lang='ts'>
// get route parameter to identify the poll
const route = useRoute()
const id = route.params.id as string

// use pocketbase session from plugin
const pb = useNuxtApp().$pb

const poll = await getPoll(id)

// get the poll and its options
async function getPoll(id: string) {
    const poll = await pb.collection('polls').getOne(id, { expand: 'questions,questions.options' })
    console.log(poll)
    return poll
}



</script>

<style></style>