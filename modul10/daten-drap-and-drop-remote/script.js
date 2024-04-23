let todos = [
  {
    id: 0,
    title: "Putzen",
    category: "open",
  },
  {
    id: 1,
    title: "Kochen",
    category: "open",
  },
  {
    id: 2,
    title: "Einkaufen",
    category: "closed",
  },
];

let currentDraggedElement;

function init() {
  renderOpen();
  renderClosed();
}

/**
 * Renders drag area of open
 */
function renderOpen() {
  let open = todos.filter((t) => t["category"] == "open"); //it filters from todos which contains catergory == open
  console.log(open);
  document.getElementById("open").innerHTML = "";
  for (let i = 0; i < open.length; i++) {
    const element = open[i];
    document.getElementById("open").innerHTML += generateTodoHTML(element);
  }
}

/**
 * Renders drag area of closed
 */
function renderClosed() {
  let closed = todos.filter((t) => t["category"] == "closed");
  document.getElementById("closed").innerHTML = "";
  console.log(closed);
  for (let i = 0; i < closed.length; i++) {
    const element = closed[i];
    document.getElementById("closed").innerHTML += generateTodoHTML(element);
  }
}

/**
 * generates the todo card with parameter of the obj
 * @param {Obj} element
 * @returns
 */
function generateTodoHTML(element) {
  return /*html*/ `
    <div draggable="true" ondragstart='startDragging(${element["id"]})' class="todo">
      ${element["title"]}
    </div>`;
}

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  todos[currentDraggedElement]["category"] = category;
  init();
}

function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}
