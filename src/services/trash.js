import Vue from "vue";
import { supabase } from "../lib/supabase";
const session = supabase.auth.session();
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${session?.access_token}`,
};

const ENDPOINT = `/trash`;

export default {
  fetchTrashedBookmarks({ page, per_page }) {
    return Vue.http
      .get(`${ENDPOINT}?q=&page=${page}&per_page=${per_page}`, { headers })
      .then((response) => response.data);
  },
  trashBookmark(id) {
    return Vue.http
      .patch(
        `${ENDPOINT}/${id}/trash`,
        {},
        {
          headers,
        }
      )
      .then((response) => response.data);
  },
  restoreBookmark(id) {
    return Vue.http
      .patch(
        `${ENDPOINT}/${id}/untrash`,
        {},
        {
          headers,
        }
      )
      .then((response) => response.data);
  },
};
