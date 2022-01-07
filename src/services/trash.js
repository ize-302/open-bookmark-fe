import Vue from "vue";

const ENDPOINT = `/trash`;

export default {
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
