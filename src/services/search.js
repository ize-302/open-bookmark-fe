import Vue from "vue";
import { getTokenFromCookies } from "@/utils/cookies";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${getTokenFromCookies()}`,
};

export default {
  globalSearch({ search_for, q, page, per_page }) {
    return Vue.prototype.$http
      .get(
        `/search?search_for=${search_for}&q=${q}page=${page}&per_page=${per_page}`,
        {
          headers,
        }
      )
      .then((response) => response.data);
  },
};
