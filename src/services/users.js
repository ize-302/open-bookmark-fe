import Vue from "vue";
import { getTokenFromCookies } from "@/utils/cookies";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${getTokenFromCookies()}`,
};

export default {
  addUser() {
    return Vue.http
      .post(
        `/users/add`,
        {},
        {
          headers,
        }
      )
      .then((response) => response.data);
  },
  getUser(sub) {
    return Vue.http
      .get(`/users/${sub}/info`, {
        headers,
      })
      .then((response) => response.data);
  },
  fetchMyBookmarks({ page, per_page }) {
    return Vue.http
      .get(`/users/mybookmarks?q=&page=${page}&per_page=${per_page}`, {
        headers,
      })
      .then((response) => response.data);
  },
  fetchUserPublicBookmarks({ id, page, per_page }) {
    return Vue.http
      .get(`/users/${id}/bookmarks?q=&page=${page}&per_page=${per_page}`, {
        headers,
      })
      .then((response) => response.data);
  },
  followUser(id) {
    return Vue.http
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
    return Vue.http
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
