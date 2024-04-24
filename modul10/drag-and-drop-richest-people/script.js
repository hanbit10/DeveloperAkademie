const draggable_list = document.getElementById("draggable-list");
const todo_list = document.getElementById("todo-list");
const check = document.getElementById("check");

const richestPeopleNames = [
  "Elon Musk",
  "Jeff Bezos",
  "Bernard Arnault & family",
  "Bill Gates",
  "Mark Zuckerberg",
  "Warren Buffett",
  "Larry Ellison",
  "Larry Page",
  "Sergey Brin",
  "Mukesh Ambani",
];

const richPeople = [
  {
    id: 1,
    name: "Jeff Bezos",
    category: "Rich",
  },
  {
    id: 2,
    name: "Elon Musk",
    category: "Rich",
  },
  {
    id: 3,
    name: "Bernard Arnault & family",
    category: "Rich",
  },
  {
    id: 4,
    name: "Bill Gates",
    category: "Rich",
  },
  {
    id: 5,
    name: "Mark Zuckerberg",
    category: "Rich",
  },
  {
    id: 6,
    name: "Warren Buffett",
    category: "Rich",
  },
  {
    id: 7,
    name: "Larry Ellison",
    category: "Rich",
  },
  {
    id: 8,
    name: "Larry Page",
    category: "Rich",
  },
  {
    id: 9,
    name: "Sergey Brin",
    category: "Todo",
  },
  {
    id: 10,
    name: "Mukesh Ambani",
    category: "Todo",
  },
];

//Store listitems
const listItems = { Rich: [], Todo: [] };
const listItemsTodo = [];

let dragStartIndex;
let dragStartKategorie;

async function init() {
  createList();
  createTodo();
  addEventListeners();
}

// const numbers = [1, 3, 110, 40, 302];
// console.log(
//   "numbers sort",
//   numbers.sort(function (a, b) {
//     console.log(a - b);
//     return a - b;
//   })
// );

// Insert list items into DOM
function createList() {
  let list = richPeople.filter((t) => t["category"] == "Rich");
  // console.log("this is filtered", list);
  [...list].forEach((person, index) => {
    // console.log("this is person", person);
    // console.log("this is index", index);
    const name = person["name"];
    const listItem = document.createElement("li");
    listItem.setAttribute("data-index", index);
    listItem.setAttribute("id", "Rich");

    listItem.innerHTML = /*html*/ `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${name}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;

    listItems["Rich"].push(listItem);
    draggable_list.appendChild(listItem);
  });

  // console.log(richestPeopleNames);
  console.log(listItems);
}

function createTodo() {
  let list = richPeople.filter((t) => t["category"] == "Todo");
  // console.log("this is filtered", list);
  [...list].forEach((person, index) => {
    // console.log("this is person", person);
    // console.log("this is index", index);
    const name = person["name"];
    const listItem = document.createElement("li");
    listItem.setAttribute("data-index", index);
    listItem.setAttribute("id", "Todo");

    listItem.innerHTML = /*html*/ `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${name}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;

    listItems["Todo"].push(listItem);
    todo_list.appendChild(listItem);
  });

  // console.log(richestPeopleNames);
  console.log("This is listItemsTodo", listItemsTodo);
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

/**
 * When starting to drag a element this function occurs
 */
function dragStart() {
  // console.log("Event: ", "dragstart");
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  dragStartKategorie = this.closest("li").getAttribute("id");
  // console.log(dragStartKategorie);
  // console.log(dragStartIndex);
}

function dragEnter() {
  // console.log("Event: ", "dragenter");
  this.classList.add("over");
}

/**
 * The function triggers tith dragging the element out of the position
 */
function dragLeave() {
  this.classList.remove("over");
  // console.log("Event: ", "dragleave");
}

/**
 * The function triggers tith dragging the element out of the position
 */
function dragOver(e) {
  // console.log("Event: ", "dragover");
  e.preventDefault();
}
function dragDrop() {
  // console.log("Event: ", "dragdrop");
  const dragEndIndex = +this.getAttribute("data-index");
  const dragEndKategorie = this.getAttribute("id");
  // console.log(dragEndIndex);
  swapItems(dragStartIndex, dragEndIndex, dragStartKategorie, dragEndKategorie);
  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex, fromKategorie, toKategorie) {
  const itemOne = listItems[fromKategorie][fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toKategorie][toIndex].querySelector(".draggable");
  console.log("this is listItems", listItems);
  console.log(itemOne);
  console.log(itemTwo);
  console.log(fromKategorie);
  if (fromKategorie == toKategorie) {
    listItems[fromKategorie][fromIndex].appendChild(itemTwo);
    listItems[toKategorie][toIndex].appendChild(itemOne);
  } else if (fromKategorie != toKategorie) {
    draggable_list.innerHTML = "";
    richPeople[fromIndex]["category"] == `${toKategorie}`;
    init();
  }

  // console.log(itemOne, itemTwo);
}
