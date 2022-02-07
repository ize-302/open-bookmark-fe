import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "@/views/Landing.vue";
import MyBookmarksPage from "@/views/Dashboard/MyBookmarksPage.vue";
import Browse from "@/views/Dashboard/Browse.vue";
import Trash from "@/views/Dashboard/Trash.vue";
import Categories from "@/views/Dashboard/Categories.vue";
import UserProfile from "@/views/UserProfile/Base.vue";
import { verifyToken } from "@/utils/jwt";
import { getTokenFromCookies } from "@/utils/cookies";
import AuthService from "@/services/auth";
import { saveTokenInCookies, removeTokenFromCookies } from "@/utils/cookies";

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

// https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
router.beforeEach(async (to, from, next) => {
  const protectedRouteNames = [
    "myBookmarks",
    "browse",
    "trash",
    "categories",
    "profile",
  ];
  const unprotectedRouteNames = ["landing"];
  // For Protected Routes
  if (protectedRouteNames.includes(to.name)) {
    try {
      const token = getTokenFromCookies();
      const isValidToken = verifyToken(token);

      // if token is available and not expired
      if (isValidToken) {
        return next();
      }
      // if token is available and expired
      if (!isValidToken) {
        // attempt to refresh token
        const refresh_token = localStorage.getItem("refresh_token");
        AuthService.refreshToken(refresh_token)
          .then((data) => {
            saveTokenInCookies(data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            window.location.reload();
          })
          .catch(() => {
            localStorage.removeItem("refresh_token");
            removeTokenFromCookies();
            return next({ name: "landing" });
          });

        return next();
      }
    } catch (e) {
      return next({ name: "landing" });
    }
  }

  // Unprotected Routes
  if (unprotectedRouteNames.includes(to.name)) {
    // allow through
    return next();
  }
  // Default Route Action
  return next();
});

export default router;
