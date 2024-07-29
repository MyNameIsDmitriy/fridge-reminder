<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import HeaderInput from "./HeaderInput.vue";
import AddGroceryModal from "./AddGroceryModal.vue";

const router = useRouter();

const isVisible = ref(null);
const isProfileMenuOpen = ref(null);
const profileMenu = ref(null);
const user = ref(null);
const fileInputRef = ref(null);

const toggleAddGroceryModal = () => {
  isVisible.value = !isVisible.value;
};

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

const handleClickOutside = (event) => {
  if (profileMenu.value && !profileMenu.value.contains(event.target)) {
    isProfileMenuOpen.value = false;
  }
};

const getDate = (sqlString) => {
  if (sqlString && sqlString !== "") {
    const utcDate = new Date(sqlString);
    const localDate = utcDate.toLocaleString();

    const [date, time] = localDate.split(",");
    const [month, day, year] = date.split("/");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = months[parseInt(month, 10) - 1];

    return `${monthName} ${year}`;
  }

  return "not found";
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    // localStack s3
    console.log("Selected file:", file);
  }
};

const signOut = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  router.push({ name: "SignIn" });
};

onMounted(async () => {
  document.addEventListener("click", handleClickOutside);

  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser);
    } catch (e) {
      console.error("Ошибка при разборе JSON:", e);
      user.value = null;
    }
  } else {
    console.warn('Нет данных в localStorage для ключа "user"');
  }
});
</script>

<template>
  <header class="p-3">
    <nav class="flex justify-between items-center">
      <img
        class="w-20"
        src="../assets/svg/header/fridge.svg"
        alt="fridge icon"
      />

      <HeaderInput
        class="w-1/3"
        :isVisible="isVisible"
        @toggleAddGroceryModal="toggleAddGroceryModal"
      />

      <div ref="profileMenu" class="relative flex items-center gap-2">
        <!-- <input class="theme-checkbox" type="checkbox" /> -->
        <img
          @click="toggleProfileMenu"
          class="w-10 cursor-pointer"
          src="../assets/svg/header/user.svg"
          alt="user icon"
        />
        <input
          class="hidden"
          type="file"
          ref="fileInputRef"
          @change="handleFileSelect"
        />
        <Transition name="fade">
          <div
            v-show="isProfileMenuOpen"
            class="absolute top-10 right-0 flex flex-col w-60 px-4 py-2 test bg-primary rounded border-0 shadow-thin"
          >
            <span class="flex self-center mb-2">
              <img
                class="w-8"
                src="../assets/svg/header/user.svg"
                alt="profile img"
                @click="$refs.fileInputRef.click()"
              />
            </span>
            <div class="flex flex-col items-center [&>span]:text-sm">
              <span v-if="user" class="font-medium mb-1">{{
                user.userName || "Your name"
              }}</span>
              <span v-if="user" class="font-light mb-1">{{ user.email }}</span>
              <span v-if="user" class="font-light"
                >Together since {{ getDate(user.createdAt) }}</span
              >
            </div>
            <button
              @click="signOut"
              class="mt-2 mb-1 border-0 rounded shadow-thin hover:shadow-thin-purple focus:outline-0 focus:outline-offset-0 focus:outline-transparent focus:shadow-thin-puple-light"
            >
              <span>Sign out</span>
            </button>
          </div>
        </Transition>
      </div>

      <AddGroceryModal
        :isVisible="isVisible"
        @toggleAddGroceryModal="toggleAddGroceryModal"
      />
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.theme-checkbox {
  --toggle-size: 8px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 6.25em;
  height: 3.125em;
  background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(50%, #2a2a2a),
      color-stop(50%, #892cdc)
    )
    no-repeat;
  background: -o-linear-gradient(left, #892cdc 50%, #2a2a2a 50%) no-repeat;
  background: linear-gradient(to right, #892cdc 50%, #2a2a2a 50%) no-repeat;
  background-size: 205%;
  background-position: 0;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
  border-radius: 99em;
  position: relative;
  cursor: pointer;
  font-size: var(--toggle-size);
}

.theme-checkbox::before {
  content: "";
  width: 2.25em;
  height: 2.25em;
  position: absolute;
  top: 0.438em;
  left: 0.438em;
  background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(50%, #efefef),
      color-stop(50%, #2a2a2a)
    )
    no-repeat;
  background: -o-linear-gradient(left, #efefef 50%, #2a2a2a 50%) no-repeat;
  background: linear-gradient(to right, #efefef 50%, #2a2a2a 50%) no-repeat;
  background-size: 205%;
  background-position: 100%;
  border-radius: 50%;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
}

.theme-checkbox:checked::before {
  left: calc(100% - 2.25em - 0.438em);
  background-position: 0;
}

.theme-checkbox:checked {
  background-position: 100%;
}

.fade-enter-active {
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1) 0.15s;
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
