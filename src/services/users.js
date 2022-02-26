import Vue from "vue";
import { getTokenFromCookies } from "@/utils/cookies";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${getTokenFromCookies()}`,
};

export default {
  getUser(sub) {
    return Vue.prototype.$http
      .get(`/users/${sub}/info`, {
        headers,
      })
      .then((response) => response.data);
  },
  fetchMyBookmarks({ q, page, per_page }) {
    return Vue.prototype.$http
      .get(`/users/mybookmarks?q=${q}&page=${page}&per_page=${per_page}`, {
        headers,
      })
      .then((response) => response.data);
  },
  fetchUserPublicBookmarks({ id, page, per_page }) {
    return Vue.prototype.$http
      .get(`/users/${id}/bookmarks?q=&page=${page}&per_page=${per_page}`, {
        headers,
      })
      .then((response) => response.data);
  },
  followUser(id) {
    return Vue.prototype.$http
      .post(
        `/users/${id}/follow`,
        {},
        {
          headers,
        }
      )
      .then((response) => response.data);
  },
  unfollowUser(id) {
    return Vue.prototype.$http
      .post(
        `/users/${id}/unfollow`,
        {},
        {
          headers,
        }
      )
      .then((response) => response.data);
  },
};
