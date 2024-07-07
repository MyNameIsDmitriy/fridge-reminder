<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const errMsg = ref([]);
</script>

<template>
  <div class="w-full h-screen">
    <div
      class="w-[700px] h-2/3 mt-10 m-auto flex flex-col items-center justify-center [&>div]:mb-3"
    >
      <h2 class="text-2xl font-bold">Login</h2>

      <div class="w-4/6">
        <label class="text-zinc-300 font-light" for="Email">Email</label>
        <input
          v-model="email"
          class="w-full py-1 px-2 bg-transparent border rounded border-gray-400 outline-none hover:border-purple-300 focus:border-purple-400 transition-all duration-200"
          type="email"
        />
      </div>

      <div class="w-4/6">
        <label class="text-zinc-300 font-light" for="Password">Password</label>
        <input
          v-model="password"
          class="w-full py-1 px-2 bg-transparent border rounded border-gray-400 outline-none hover:border-purple-300 focus:border-purple-400 transition-all duration-200"
          type="password"
        />
      </div>

      <p v-if="errMsg" class="text-red-500">{{ errMsg[0] }}</p>

      <button
        @click="login()"
        class="py-1 px-2 hover:text-purple-500 active:scale-90"
      >
        Sign in
      </button>

      <div class="mt-4">
        <p class="text-zinc-300 font-light">Do it with social accounts</p>
        <div class="flex justify-around mt-1">
          <img
            class="w-10 hover:animate-[pulsating_0.8s_linear_infinite] cursor-pointer"
            src="../assets/svg/auth/google.svg"
            alt="google icon"
          />
          <img
            class="w-10 hover:animate-[pulsating_0.8s_linear_infinite] cursor-pointer"
            src="../assets/svg/auth/github.svg"
            alt="github icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
