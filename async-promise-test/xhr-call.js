const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xhr = new XMLHttpRequest();

xhr.open("GET", "https://dog.ceo/api/breeds/list/all", true);
xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    const response = JSON.parse(xhr.responseText);
    const breeds = response.message;
    const breed = breeds["beagle"];
    console.log("First breed:", breed);
    getBreed("beagle");
  } else {
    console.error("Request failed with status:", xhr.status);
  }
};
xhr.send();

const getBreed = (name) => {
  const xhr2 = new XMLHttpRequest();

  xhr2.open("GET", `https://dog.ceo/api/breed/${name}/images/random`, true);
  xhr2.onload = function () {
    if (xhr2.status >= 200 && xhr2.status < 300) {
      const response = JSON.parse(xhr2.responseText);
      const image = response.message;
      console.log(`Random image of ${name}:`, image);
    } else {
      console.error("Request failed with status:", xhr2.status);
    }
  };
xhr2.send();
};
