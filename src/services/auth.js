import Vue from "vue";

export default {
  verify(token) {
    return Vue.http
      .post(`/auth/verify?token=${token}`)
      .then((response) => response.data);
  },

  refreshToken(refresh_token) {
    return Vue.http
      .post(`/auth/refreshtoken`, {
        refresh_token: refresh_token,
      })
      .then((response) => {
        return response.data;
      });
  },
};
