import Vue from "vue";
import moment from "moment";

// pluralize string (simple version)
Vue.filter("pluralize", (text, count) => {
  if (count === -1) return text;

  // last letter with ch
  if (text.slice(-2) === "ch") return count === 1 ? text : `${text}es`;

  let lastLetter = text.slice(-1);
  return lastLetter === "y"
    ? count === 1
      ? text
      : `${text.slice(0, -1)}ies`
    : count === 1
    ? text
    : `${text}s`;
});

// format date
Vue.filter("formatDate", (date, format) => {
  const timestamp = parseInt(date);
  return moment().diff(timestamp, "days") > -28
    ? moment(timestamp).fromNow()
    : moment(timestamp).format(format);
});
