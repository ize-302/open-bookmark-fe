import Vue from "vue";
import { supabase } from "../lib/supabase";
const session = supabase.auth.session();
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${session?.access_token}`,
};

const ENDPOINT = `/category`;

export default {
  fetchUserCategories() {
    return Vue.http
      .get(`/categories`, {
        headers,
      })
      .then((response) => response.data);
  },
  createCategory({ name }) {
    return Vue.http
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
    return Vue.http
      .delete(`${ENDPOINT}/${id}/delete`, {
        headers,
      })
      .then((response) => response.data);
  },

  updateCategory({ id, name }) {
    return Vue.http
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
