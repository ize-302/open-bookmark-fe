import Vue from "vue";
import { supabase } from "../lib/supabase";
const session = supabase.auth.session();
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${session?.access_token}`,
};

const ENDPOINT = `/bookmarks`;

export default {
  fetchAllPublicBookmarks({ page, per_page }) {
    return Vue.http
      .get(`${ENDPOINT}/browse?q=&page=${page}&per_page=${per_page}`, {
        headers,
      })
      .then((response) => response.data);
  },
  createBookmark({ title, url, description, is_private, category }) {
    return Vue.http
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
    return Vue.http
      .delete(`${ENDPOINT}/${id}/delete`, {
        headers,
      })
      .then((response) => response.data);
  },

  updateBookmark({ id, title, url, description, is_private, category }) {
    return Vue.http
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
