<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import AuthApi from "../controllers/auth-conroller";

import ValidateForm from "../form-validation";

const authApi = new AuthApi();
const validateForm = new ValidateForm();

const router = useRouter();

const email = ref(null);
const password = ref("");
const passwordConfirm = ref(null);
const errMsg = ref([]);

const register = async () => {
  try {
    errMsg.value.splice(0);

    errMsg.value.push(await validateForm.validateEmail(email.value));
    errMsg.value.push(await validateForm.validatePassword(password.value));
    errMsg.value.push(
      await validateForm.validatePasswordConfirm(
        password.value,
        passwordConfirm.value
      )
    );

    errMsg.value = validateForm.errMsg;

    console.log(errMsg.value);

    if (!errMsg.value[0] && errMsg.value[0] !== "") {
      router.push({ name: "SignIn" });
      return await authApi.register(email.value, password.value);
    } else {
      passwordConfirm.value = null;
    }
  } catch (e) {
    if (e.response.data.message) {
      errMsg.value.push(e.response.data.message);
    } else {
      console.error(e);
    }
  }
};
</script>

<template>
  <div class="w-full h-screen">
    <div
      class="w-[700px] h-2/3 mt-10 m-auto flex flex-col items-center justify-center [&>div]:mb-3"
    >
      <h2 class="text-2xl font-bold">Create an account</h2>

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

      <div class="w-4/6">
        <label class="text-zinc-300 font-light" for="Confirm Password"
          >Confirm Password</label
        >
        <input
          v-model="passwordConfirm"
          class="w-full py-1 px-2 bg-transparent border rounded border-gray-400 outline-none hover:border-purple-300 focus:border-purple-400 transition-all duration-200"
          type="password"
        />
      </div>

      <p v-if="errMsg" class="text-red-500">{{ errMsg[0] }}</p>

      <button
        @click="register()"
        class="py-1 px-2 hover:text-purple-500 active:scale-90"
      >
        Sign up
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
