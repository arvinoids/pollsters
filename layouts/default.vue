<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <div
      class="border bg-slate-50 px-10 py-8 shadow-lg min-w-[500px] min-h-[350px] flex items-center"
    >
      <slot />
    </div>
  </div>
</template>

<style>
input {
  @apply rounded border;
}

.btn {
  @apply no-underline border px-4 py-2 rounded hover:contrast-150;
}

.btn-normal {
  @apply bg-blue-400 text-white;
}

.btn-confirm {
  @apply bg-green-700 text-white;
}

.btn-cancel {
  @apply bg-orange-500 text-white;
}

.message {
  @apply p-3 bg-orange-200 border-orange-400 text-center;
}
</style>
