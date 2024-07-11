<script setup>
import { onMounted, ref } from "vue";

import OwnedGroceryAPI from "../controllers/owned-grocery-controller";

const ownedGroceryApi = new OwnedGroceryAPI();

const ownedGroceries = ref();
const user = ref();

const getImageUrl = (name) => {
  return new URL(`../assets/svg/groceries-icon/${name}.svg`, import.meta.url)
    .href;
};

const getDate = (sqlString) => {
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

  const date = sqlString.split("T")[0];
  const [year, month, day] = date.split("-");
  let noZeroDay = "";

  const monthName = months.filter((name, idx) => {
    return "0" + (idx + 1) === month;
  });

  if (day.split("")[0] == 0) {
    noZeroDay = day.split("")[1];
  } else {
    noZeroDay = day;
  }

  return `${monthName} ${noZeroDay}, ${year}`;
};

const getTime = (sqlString) => {
  const time = sqlString.split("T")[1];

  return time.split("").splice(0, 5).join("");
};

onMounted(async () => {
  user.value = JSON.parse(localStorage.getItem("user"));

  ownedGroceries.value = await ownedGroceryApi.getUserOwnedGroceries(
    user.value.userId
  );

  console.log(ownedGroceries.value);
});
</script>

<template>
  <main
    class="w-5/6 m-auto mt-10 [&>div]:grid [&>div]:grid-cols-[1fr_1fr_2fr_1fr_1fr]"
  >
    <div
      class="[&>*]:flex [&>*]:justify-center [&>*]:items-center [&>p]:py-1 [&>p]:border-b-2 [&>p]:border-purple-600"
    >
      <p>Name</p>
      <p>Image</p>
      <p>Amount</p>
      <p>Added</p>
      <p>Actions</p>
    </div>

    <div
      v-for="ownedGrocery in ownedGroceries"
      :key="ownedGrocery.ownedGroceryId"
      class="mt-4 [&>*]:flex [&>*]:justify-center [&>*]:items-center"
    >
      <div>{{ ownedGrocery.Grocery.groceryName }}</div>
      <div>
        <img class="w-6" :src="getImageUrl(ownedGrocery.Grocery.groceryName)" />
      </div>
      <div>
        <div class="flex justify-center gap-3">
          <img
            class="w-5"
            src="../assets/svg/main/minus.svg"
            alt="minus button"
          />
          <input
            class="w-5/6 py-1 px-2 text-center border border-purple-600 rounded-lg bg-transparent"
            type="text"
          />
          <img
            class="w-5"
            src="../assets/svg/main/plus.svg"
            alt="plus button"
          />
        </div>
      </div>
      <div class="flex flex-col">
        <p>{{ getDate(ownedGrocery.createdAt) }}</p>
        <p>{{ getTime(ownedGrocery.createdAt) }}</p>
      </div>
      <div class="flex gap-3">
        <svg
          class="w-7 [&>path]:hover:stroke-yellow-500"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="stroke-[#892cdc] stroke-[1.5]"
            d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            class="stroke-[#892cdc] stroke-[1.5]"
            d="M21 21H12"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="text-2xl text-purple-600">|</span>
        <svg
          class="w-7 fill-[#892cdc] hover:fill-red-600"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M767 336H233q-12 0-21 9t-9 21l38 505q1 13 12 21.5t30 8.5h434q18 0 29-8.5t13-21.5l38-505q0-12-9-21t-21-9zM344 841q-10 0-18-9t-8-21l-26-386q0-12 9-20.5t21-8.5 21 8.5 9 20.5l18 386q0 12-7.5 21t-18.5 9zm182-31q0 13-7.5 22t-18.5 9-18.5-9-7.5-22l-4-385q0-12 9-20.5t21-8.5 21 8.5 9 20.5zm156 1q0 12-8 21t-18 9q-11 0-18.5-9t-7.5-21l18-386q0-12 9-20.5t21-8.5 21 8.5 9 20.5zm101-605l-179-30q-12-2-15-15l-8-33q-4-20-14-26-6-3-22-3h-90q-16 0-23 3-10 6-13 26l-8 33q-2 13-15 15l-179 30q-19 3-31.5 14.5T173 249v28q0 9 6.5 15t15.5 6h610q9 0 15.5-6t6.5-15v-28q0-17-12.5-28.5T783 206z"
          />
        </svg>
      </div>
    </div>
  </main>
</template>

<style></style>
