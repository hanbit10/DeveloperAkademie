let bundeslaender = [
  {
    name: "Baden-Württemberg",
    population: 11.1,
    url: "https://www.baden-wuerttemberg.de/de/startseite/",
    comments: [],
  },
  {
    name: "Bayern",
    population: 13.1,
    url: "https://www.bayern.de/",
    comments: [
      "Tolles Wetter und gute Wander-Routen",
      "München ist eine schöne Stadt",
    ],
  },
  {
    name: "Berlin",
    population: 3.7,
    url: "https://www.berlin.de/",
    comments: [],
  },
  {
    name: "Brandenburg",
    population: 2.5,
    url: "https://www.brandenburg.de/",
    comments: [],
  },
  {
    name: "Bremen",
    population: 0.7,
    url: "https://www.bremen.de/",
    comments: ["Die Stadtmusikanten haben mir schon immer gefallen!"],
  },
  {
    name: "Hamburg",
    population: 1.8,
    url: "https://www.hamburg.de/",
    comments: ["Ein wirklich tolles Bundesland"],
  },
  {
    name: "Hessen",
    population: 6.3,
    url: "https://www.hessen.de/",
    comments: [],
  },
  {
    name: "Mecklenburg-Vorpommern",
    population: 1.6,
    url: "https://www.mecklenburg-vorpommern.de/startseite/",
    comments: [],
  },
  {
    name: "Niedersachsen",
    population: 8,
    url: "https://www.niedersachsen.de/startseite/",
    comments: [],
  },
  {
    name: "Nordrhein-Westfalen",
    population: 17.9,
    url: "https://www.land.nrw/",
    comments: [],
  },
  {
    name: "Rheinland-Pfalz",
    population: 4.1,
    url: "https://www.rlp.de/de/startseite/",
    comments: [],
  },
  {
    name: "Saarland",
    population: 1,
    url: "https://www.saarland.de/DE/home/home_node.html",
    comments: [],
  },
  {
    name: "Sachsen",
    population: 4.1,
    url: "https://www.sachsen.de/",
    comments: [],
  },
  {
    name: "Sachsen-Anhalt",
    population: 2.2,
    url: "https://www.sachsen-anhalt.de/startseite/",
    comments: [],
  },
  {
    name: "Schleswig-Holstein",
    population: 2.9,
    url: "https://www.schleswig-holstein.de/DE/Home/home_node.html",
    comments: [],
  },
  {
    name: "Thüringen",
    population: 2.1,
    url: "https://thueringen.de/",
    comments: [],
  },
];

let bundesland = [];

function render() {
  let content = document.getElementById("content");
  content.innerHTML = "";

  for (let i = 0; i < bundesland.length; i++) {
    // const land = bundeslaender[i];
    const land = bundesland[i];
    content.innerHTML += /*html*/ `
    <div>     ${land["name"]}</div>


    <!-- <div class='card'>
      <h2>${land["name"]}</h2>
      <div id="landcontent${i}"></div>
      <input id="input${i}" type="text">
      <button onclick="addComment(${i})">OK</button>
    </div> -->
  `;
  }
}

function addComment(index) {
  let input = document.getElementById(`input${index}`);
  bundeslaender[index]["comments"].push(input.value);
  render();
}

async function printJSON() {
  const response = await fetch("./bundesland.json");
  const json = await response.json();
  bundesland = json;
}

printJSON();
