import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    beforeEnter(to, from, next) {
      if (localStorage.getItem("todo-app")) {
        const users = require("../../fake-api/accountjson.json").accounts;
        users.filter((user) => {
          const userData = JSON.parse(localStorage.getItem("todo-app"));
          if (
            user.username === userData[0].username &&
            user.password === userData[0].password
          ) {
            throw next("/");
          }
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter(to, from, next) {
      if (localStorage.getItem("todo-app")) {
        const users = require("../../fake-api/accountjson.json").accounts;
        users.filter((user) => {
          const userData = JSON.parse(localStorage.getItem("todo-app"));
          if (
            user.username === userData[0].username &&
            user.password === userData[0].password
          ) {
            throw next();
          }
        });
      } else {
        next("/login");
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
