var hostname = window.location.protocol + "//" + window.location.hostname;

if (window.location.hostname === "localhost") {
  hostname += ":8000";
}

var version = "1.8.0";

const exports = [hostname, version]; 

export default exports;