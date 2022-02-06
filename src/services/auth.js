import Vue from "vue";

export default {
  verify(token) {
    return Vue.http
      .post(`/auth/verify?token=${token}`)
      .then((response) => response.data);
  },
};
