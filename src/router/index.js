import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../views/Landing.vue";
import MyBookmarks from "../views/MyBookmarks.vue";
import Browse from "../views/Browse.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "landing",
    component: Landing,
  },
  {
    path: "/my-bookmarks",
    name: "myBookmarks",
    component: MyBookmarks,
  },
  {
    path: "/browse",
    name: "browse",
    component: Browse,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
