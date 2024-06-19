<template>
  <main
    class="w-5/6 m-auto mt-10 [&>div]:grid [&>div]:grid-cols-[1fr_1fr_2fr_1fr_1fr]"
  >
    <div
      class="[&>p]:text-center [&>p]:py-1 [&>p]:border-b-2 [&>p]:border-purple-600"
    >
      <p>Name</p>
      <p>Image</p>
      <p>Amount</p>
      <p>Added</p>
      <p>Actions</p>
    </div>

    <div class="mt-4 [&>*]:text-center">
      <div class="">Banana</div>
      <div class="">some image</div>
      <div class="">
        <div class="flex justify-center gap-3">
          <img
            class="w-6"
            src="../assets/svg/main/minus.svg"
            alt="minus button"
          />
          <input
            class="w-3/5 py-1 px-2 text-center border border-purple-600 rounded-lg bg-transparent"
            type="text"
          />
          <img
            class="w-6"
            src="../assets/svg/main/plus.svg"
            alt="plus button"
          />
        </div>
      </div>
      <div class="">16:33 / 25.04.24</div>
      <div class="">edit / delete</div>
    </div>
  </main>
</template>

<script lang="ts" setup></script>

<style></style>
