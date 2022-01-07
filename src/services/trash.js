import Vue from "vue";

const ENDPOINT = `/trash`;

export default {
  fetchTrashedBookmakrs({ page, per_page }) {
    return Vue.http
      .get(`${ENDPOINT}?q=&page=${page}&per_page=${per_page}`)
      .then((response) => response.data);
  },
  trashBookmark(id) {
    return Vue.http
      .patch(`${ENDPOINT}/${id}/trash`)
      .then((response) => response.data);
  },
  restoreBookmark(id) {
    return Vue.http
      .patch(`${ENDPOINT}/${id}/untrash`)
      .then((response) => response.data);
  },
};
