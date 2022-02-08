import Vue from "vue";
import { getTokenFromCookies } from "@/utils/cookies";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${getTokenFromCookies()}`,
};

const ENDPOINT = `/bookmarks`;

export default {
  fetchAllPublicBookmarks({ page, per_page }) {
    return Vue.prototype.$http
      .get(`${ENDPOINT}/browse?q=&page=${page}&per_page=${per_page}`, {
        headers,
      })
      .then((response) => response.data);
  },
  createBookmark({ title, url, description, is_private, category }) {
    return Vue.prototype.$http
      .post(
        `${ENDPOINT}/create`,
        {
          title,
          url,
          is_private,
          description,
          category,
        },
        {
          headers,
        }
      )
      .then((response) => response.data);
  },
  deleteBookmark(id) {
    return Vue.prototype.$http
      .delete(`${ENDPOINT}/${id}/delete`, {
        headers,
      })
      .then((response) => response.data);
  },

  updateBookmark({ id, title, url, description, is_private, category }) {
    return Vue.prototype.$http
      .patch(
        `${ENDPOINT}/${id}/update`,
        {
          title,
          url,
          is_private,
          description,
          category,
        },
        {
          headers,
        }
      )
      .then((response) => response.data);
  },
};
