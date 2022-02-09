import Vue from "vue";

export default {
  async fetchUrlTitle(url) {
    return Vue.prototype.$http
      .get(`/fetchUrlTitle?url=${url}`)
      .then((response) => response.data);
  },
};
