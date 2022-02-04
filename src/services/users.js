import Vue from "vue";
import { supabase } from "../lib/supabase";
const session = supabase.auth.session();
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${session?.access_token}`,
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
};
