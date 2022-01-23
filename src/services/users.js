import Vue from "vue";
import { supabase } from "../lib/supabase";
const session = supabase.auth.session();
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${session?.access_token}`,
};

export default {
  user() {
    return Vue.http
      .post(
        `/user`,
        {},
        {
          headers,
        }
      )
      .then((response) => response.data);
  },
};
