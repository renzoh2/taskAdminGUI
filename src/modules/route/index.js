import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

//Routes
const routes = [
  { path: "/", name: "index", component: () => import("@/pages/loginPage.vue") },
  { path: "/register", name: "register", component: () => import("@/pages/registerPage.vue") },
  { path: "/admin/tasks", name: "admin.tasks", component: () => import("@/pages/admin/tasksPage.vue"), meta: { requiresAuth: true } },
  { path: "/admin/tasks/trash", name: "admin.tasks.trash", component: () => import("@/pages/admin/dashboardPage.vue"), meta: { requiresAuth: true } },
];

//Router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

//Middleware check if authenticate
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuth) {
      next();
    } else {
      router.push({ path: "/" });
    }
  } else {
    next();
  }
});

export default router;
