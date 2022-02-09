import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "@/views/Landing.vue";
import MyBookmarksPage from "@/views/Dashboard/MyBookmarksPage.vue";
import Browse from "@/views/Dashboard/Browse.vue";
import Trash from "@/views/Dashboard/Trash.vue";
import Categories from "@/views/Dashboard/Categories.vue";
import UserProfile from "@/views/UserProfile/Base.vue";

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
    component: MyBookmarksPage,
  },
  {
    path: "/browse",
    name: "browse",
    component: Browse,
  },
  {
    path: "/trash",
    name: "trash",
    component: Trash,
  },
  {
    path: "/categories",
    name: "categories",
    component: Categories,
  },
  {
    path: "/u/:id",
    name: "profile",
    component: UserProfile,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
