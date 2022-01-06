import Vue from "vue";

const ENDPOINT = `/bookmarks`;

export default {
  getByID(id) {
    return Vue.http.get(`${ENDPOINT}/${id}`).then((response) => response.data);
  },
  bookmarks() {
    return Vue.http
      .get(`${ENDPOINT}?q=&page=1&per_page=10`)
      .then((response) => response.data);
  },
  create(title, url, description, isPrivate) {
    return Vue.http
      .post(`${ENDPOINT}/create`, {
        title,
        url,
        isPrivate,
        description,
      })
      .then((response) => response.data);
  },
  delete(id) {
    return Vue.http
      .delete(`${ENDPOINT}/${id}`)
      .then((response) => response.data);
  },
};
