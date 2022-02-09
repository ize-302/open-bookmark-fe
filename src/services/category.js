import Vue from "vue";
import { getTokenFromCookies } from "@/utils/cookies";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${getTokenFromCookies()}`,
};

const ENDPOINT = `/category`;

export default {
  fetchUserCategories() {
    return Vue.prototype.$http
      .get(`/categories`, {
        headers,
      })
      .then((response) => response.data);
  },
  createCategory({ name }) {
    return Vue.prototype.$http
      .post(
        `${ENDPOINT}/create`,
        {
          name,
        },
        {
          headers,
        }
      )
      .then((response) => response.data);
  },
  deleteCategory(id) {
    return Vue.prototype.$http
      .delete(`${ENDPOINT}/${id}/delete`, {
        headers,
      })
      .then((response) => response.data);
  },

  updateCategory({ id, name }) {
    return Vue.prototype.$http
      .patch(
        `${ENDPOINT}/${id}/update`,
        {
          name,
        },
        {
          headers,
        }
      )
      .then((response) => response.data);
  },
};
