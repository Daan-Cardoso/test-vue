import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from "vue-router";
import TodoView from '@/features/ToDo/views/MainView.vue'
import LoginView from '@/features/Login/views/MainView.vue'

const isAuthenticated = () => !!localStorage.getItem("access_token");

const authGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' });
  } else {
    next();
  }
};

const routes = [
  { path: "/", name: 'login', component: LoginView },
  { path: "/todo", name: 'Todo', component: TodoView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Adiciona o guard globalmente
router.beforeEach(authGuard);

export default router;
