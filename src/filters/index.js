import Vue from "vue";
import moment from "moment";

// Humanize string
Vue.filter("humanize", (text, join = " ", splitter = "_") => {
  if ((typeof text === "string" || text instanceof String) && text !== "") {
    let frags = text.split(splitter);

    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }

    return frags.join(join);
  } else {
    return "";
  }
});

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
// singularize string (simple version)
Vue.filter("singularize", (text) => {
  let lastLetter = text.slice(-1);
  let last3Letters = text.slice(-3);
  if (last3Letters === "ies") return `${text.slice(0, -3)}y`;
  return lastLetter === "s" ? text.slice(0, -1) : text;
});

// format dateAndHours
Vue.filter("dateAndHours", (date) => {
  return moment(date).format("Do MMM YYYY HH:mm");
});

// format date
Vue.filter("formatDate", (date, format) => {
  return moment(date).format(format);
});

// format fromNow
Vue.filter("fromNow", (date) => {
  return moment(date).fromNow();
});
