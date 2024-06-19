<script setup></script>

<template>
  <header class="my-3 px-3">
    <nav class="flex justify-between items-center">
      <img
        class="w-20"
        src="../assets/svg/header/fridge.svg"
        alt="fridge icon"
      />

      <div class="relative w-1/3">
        <img
          class="absolute w-7 top-1.5 left-1"
          src="../assets/svg/header/search-icon.svg"
          alt="search icon"
        />
        <input
          class="w-full h-10 pl-12 border-0 border-animation rounded-md outline-0 bg-transparent cursor-pointer"
          disabled
          placeholder="add grocery"
          type="text"
          name="text"
        />
      </div>

      <div class="flex items-center gap-2">
        <input class="theme-checkbox" type="checkbox" />
        <img class="w-10" src="../assets/svg/header/user.svg" alt="user icon" />
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.border-animation {
  animation: rotateShadow 2s infinite cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.border-animation:hover {
  animation-play-state: paused;
  // animation-duration: 4s;
}

@keyframes rotateShadow {
  0% {
    box-shadow: -2px -2px 0px 0px #bc6ff1, 2px 2px 0px 0px #892cdc;
  }
  25% {
    box-shadow: -2px 2px 0px 0px #bc6ff1, 2px -2px 0px 0px #892cdc;
  }
  50% {
    box-shadow: 2px 2px 0px 0px #bc6ff1, -2px -2px 0px 0px #892cdc;
  }
  75% {
    box-shadow: 2px -2px 0px 0px #bc6ff1, -2px 2px 0px 0px #892cdc;
  }
  100% {
    box-shadow: -2px -2px 0px 0px #bc6ff1, 2px 2px 0px 0px #892cdc;
  }
}

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
</style>
