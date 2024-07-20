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
      path: "/home",
      name: "Home",
      component: () => import("../views/Home.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken.exp * 1000 > Date.now();
  } else {
    return false;
  }
};

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ path: "/sign-in" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
