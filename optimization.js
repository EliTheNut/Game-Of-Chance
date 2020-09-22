function element(type, location) {
  let elem = document.createElement(type);
  location.appendChild(elem);
  return elem;
}
function get(identity, num = "", type = "") {
  if (num === "") {
    return document.getElementById(identity);
  } else if (type === "") {
    return document.getElementsByClassName(identity)[num];
  }
  if (type.toLowerCase() === "name") {
    return document.getElementsByName(identity)[num];
  }
  if (type.toLowerCase() === "tag") {
    return document.getElementsByTagName(identity)[num];
  }
}
