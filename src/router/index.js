import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import MyUser from '@/components/main/MyUser'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/home",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
    redirect: "/home/user",
    children: [
      {
        path: "user",
        component: () =>
          import(/* webpackChunkName: "user" */ "../components/main/MyUser.vue"),
      },
      {
        path: "goods",
        component: () =>
          import(/* webpackChunkName: "goods" */ "../components/main/MyGoods.vue"),
      },
      {
        path: "goodslist",
        component: () =>
          import(
            /* webpackChunkName: "goodslist" */ "../components/main/MyGoodsList.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    const token = localStorage.getItem("token");
    if (token) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
