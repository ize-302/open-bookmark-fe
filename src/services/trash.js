import Vue from "vue";
import { getTokenFromCookies } from "@/utils/cookies";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${getTokenFromCookies()}`,
};

const ENDPOINT = `/trash`;

export default {
  fetchUserTrashedBookmarks({ page, per_page }) {
    return Vue.prototype.$http
      .get(`${ENDPOINT}?q=&page=${page}&per_page=${per_page}`, { headers })
      .then((response) => response.data);
  },
  trashBookmark(id) {
    return Vue.prototype.$http
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
    return Vue.prototype.$http
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
