let bundeslander = [];
let filter = [];
let filteredlander = [];

async function init() {
  await fetchBundeslander();
}

async function fetchBundeslander() {
  let url = "./bundesland.json";
  let response = await fetch(url);
  let responseBundesland = await response.json();
  responseBundesland.forEach(function (bundesland) {
    bundeslander.push(bundesland);
  });

  render(bundeslander);
}

function render(bundeslander) {
  let content = document.getElementById("content");

  for (let i = 0; i < bundeslander.length; i++) {
    let land = bundeslander[i];
    let population = (land["population"] + "").replace(".", ",");
    console.log(population);
    content.innerHTML += /*html*/ `
    <a href=${bundeslander[i]["url"]} class="bundesland-card">
      <div class="bundesland-content">
        <div  >
          <div class="bundesland-name"> ${bundeslander[i]["name"]}</div>
          <div class="bundesland-population"> ${population} Millionen</div>
        </div>
      </div>
    </a>
    `;
  }

  for (let i = 0; i < bundeslander.length; i++) {
    let char = Array.from(`${bundeslander[i]["name"]}`)[0];
    if (!filter.includes(char)) {
      filter.push(char);
    }
  }
  let filter_content = document.getElementById("filter-content");
  filter_content.innerHTML = "";
  for (let i = 0; i < filter.length; i++) {
    filter_content.innerHTML += /*html*/ `
    <div class="filter-btn" onclick="showFilters('${filter[i]}')">${filter[i]}</div>
    `;
  }
}

function showFilters(letter) {
  let content = document.getElementById("content");
  content.innerHTML = "";
  filteredlander = [];

  for (let i = 0; i < bundeslander.length; i++) {
    let char = Array.from(bundeslander[i]["name"])[0];
    if (char == letter) {
      filteredlander.push(bundeslander[i]);
    }
  }
  render(filteredlander);
}

function restore() {
  bundeslander = [];
  let content = document.getElementById("content");
  content.innerHTML = "";
  init();
}
