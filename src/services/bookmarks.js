import Vue from "vue";

const ENDPOINT = `/bookmarks`;

export default {
  getBookmark(id) {
    return Vue.http.get(`${ENDPOINT}/${id}`).then((response) => response.data);
  },
  getAllBookmarks({ page, per_page }) {
    return Vue.http
      .get(`${ENDPOINT}?q=&page=${page}&per_page=${per_page}`)
      .then((response) => response.data);
  },
  createBookmark({ title, url, comment, isPrivate }) {
    return Vue.http
      .post(`${ENDPOINT}/create`, {
        title,
        url,
        isPrivate,
        comment,
      })
      .then((response) => response.data);
  },
  deleteBookmark(id) {
    return Vue.http
      .delete(`${ENDPOINT}/${id}/delete`)
      .then((response) => response.data);
  },

  updateBookmark({ id, title, url, comment, isPrivate }) {
    return Vue.http
      .patch(`${ENDPOINT}/${id}/update`, {
        title,
        url,
        isPrivate,
        comment,
      })
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
