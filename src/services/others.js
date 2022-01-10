import Vue from "vue";

export default {
  async fetchUrlTitle(url) {
    return Vue.http
      .get(`/fetchUrlTitle?url=${url}`)
      .then((response) => response.data);
  },
};
