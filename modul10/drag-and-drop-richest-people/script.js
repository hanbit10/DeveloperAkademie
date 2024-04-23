const draggable_list = document.getElementById("draggable-list");
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

//Store listitems
const listItems = [];

let dragStartIndex;

createList();

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
  [...richestPeopleNames].forEach((person, index) => {
    console.log(person, index);
    const listItem = document.createElement("li");
    listItem.setAttribute("data-index", index);

    listItem.innerHTML = /*html*/ `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;

    listItems.push(listItem);
    draggable_list.appendChild(listItem);
  });

  console.log(richestPeopleNames);
  console.log(listItems);

  addEventListeners();
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
    item.addEventListener("dropenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

/**
 * When starting to drag a element this function occurs
 */
function dragStart() {
  // console.log("Event: ", "dragstart");
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  // console.log(dragStartIndex);
}

function dragEnter() {
  console.log("Event: ", "dragenter");
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
  console.log(dragEndIndex);
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
  // console.log(itemOne, itemTwo);
}
