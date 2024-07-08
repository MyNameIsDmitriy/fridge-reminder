import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../views/SignIn.vue") },
    {
      path: "/sign-in",
      name: "SignIn",
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/Home",
      name: "Home",
      component: () => import("../views/Home.vue"),
    },
  ],
});

export default router;
