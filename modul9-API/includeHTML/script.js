async function init() {
  await includeHTML();
  document.getElementById("headline").innerHTML = "Herzlich willkommen!";
}

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  console.log(includeElements);
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    console.log("this is element", element);
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    console.log("this gets element attribut", file);
    try {
      let resp = await fetch(file);
      element.innerHTML = await resp.text();
    } catch (e) {
      element.innerHTML = "Page not found";
    }
  }
}
