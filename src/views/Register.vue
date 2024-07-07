<script setup>
import { onMounted, ref } from "vue";

import AuthApi from "../controllers/auth-conroller";
import UserApi from "../controllers/user-controller";

const authApi = new AuthApi();
const userApi = new UserApi();

const email = ref(null);
const password = ref("");
const passwordConfirm = ref(null);
const errMsg = ref([]);

const users = ref();

// TODO: put it in a separate file
const formValidate = () => {
  const emailValidation = email.value
    .toLowerCase()
    .match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    );

  // TODO: put all messages and conditions in obj to foreach if

  // if (
  //   users.value.find((user) => {
  //     return user.email === email.value;
  //   })
  // ) {
  //   errMsg.value.push("Email already in use");
  // }

  if (!emailValidation) errMsg.value.push("Invalid email address");

  if (!password.value || password.value === null)
    errMsg.value.push("Password is required field");

  if (password.value.length < 8)
    errMsg.value.push("The password must be at least 8 characters");

  if (password.value.length > 32)
    errMsg.value.push("Let's be honest, you don't need such a long password");

  if (!password.value.match(/(?=.*[a-z])(?=.*[A-Z])/))
    errMsg.value.push(
      "The password must contain at least one lowercase and uppercase character"
    );

  if (!password.value.match(/\d/))
    errMsg.value.push("The password must contain at least one digit");

  if (!password.value.match(/(?=.*?[#?!@$%^&*_-])/))
    errMsg.value.push(
      "The password must contain at least one special character"
    );

  if (password.value !== passwordConfirm.value)
    errMsg.value.push("The passwords must match");

  console.log(errMsg.value);
};

const register = async () => {
  try {
    errMsg.value.splice(0);

    formValidate();

    if (!errMsg.value[0] && errMsg.value[0] !== "") {
      const result = await authApi.register(email.value, password.value);
      if (result.data === false) {
        errMsg.value.push("Email already in use");
      }

      return result;
    } else {
      passwordConfirm.value = null;
    }
  } catch (e) {
    // errMsg.value.push(e.response.data.message);
    console.error(e);
    console.error(e.response);
  }
};

// onMounted(async () => {
//   users.value = await userApi.getAllUsers();
//   console.log(await users.value);
// });
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
