const title = [
  {
    id: 1,
    title: "Not Started",
  },
  {
    id: 2,
    title: "In Progress",
  },
  {
    id: 3,
    title: "Await feedback",
  },
  {
    id: 4,
    title: "Done",
  },
];

async function init() {
  await renderKanban();
  getDropZones();
}

///////////////////////////////////////////////////
/////////////////Render Kanban
///////////////////////////////////////////////////

async function renderKanban() {
  let data = read();
  let kanban = document.getElementById("kanban");
  kanban.innerHTML = "";
  for (let i = 0; i < title.length; i++) {
    const id = data[i]["id"];
    kanban.innerHTML += getKanbanContainer(id);
    getTitle(title[i], id);
    getContents(data[i]["items"], id);
  }
}

function getKanbanContainer(id) {
  return /*html*/ `
  <div class="kanban-container" >
    <div id="kanban-title-${id}" class="kanban-title"></div>
      <div id="${id}" class="kanban-content">
        <div ondragover="allowDrop(event)" id="dropzone" class="kanban-dropzone"></div>
      </div>
      <button onclick="addContent(${id})" class="kanban-add-item" type="button">+ Add</button>
    </div>
  </div>`;
}

function allowDrop(ev) {
  ev.preventDefault();
}
function getTitle(title, id) {
  let element = document.getElementById(`kanban-title-${id}`);
  element.innerHTML = title["title"];
}

function getContents(contents, id) {
  let content = document.getElementById(`${id}`);
  contents.forEach(function (index) {
    content.innerHTML += /*html*/ `
      <div id='${index["id"]}' class="kanban-item" draggable="true" ondragstart='doSetData(event, ${index["id"]})'>
        <div id='input-${index["id"]}' onblur='saveBlur(${index["id"]})' contenteditable class="kanban-item-input">${index["content"]}</div>
        <div onclick='deleteContent(${index["id"]})'>x</div>
        <div ondragover="allowDrop(event)" id="dropzone" class="kanban-dropzone"></div>
      </div>
    `;
  });
}

function doSetData(e, id) {
  e.dataTransfer.setData("text/plain", id);
}

function saveBlur(id) {
  let newContent = document.getElementById(`input-${id}`).textContent.trim();
  let data = read();
  let content = getContentById(data, id);
  if (newContent != content) {
    updateItem(id, { content: newContent });
  }
  init();
}

function getContentById(data, id) {
  const item = data.flatMap((obj) => obj.items).find((item) => item.id === id);
  return item ? item.content : null;
}

function addContent(id) {
  insertItem(id, "");
  init();
}

function deleteContent(id) {
  deleteItem(id);
  init();
}

function getItems(columnId) {
  const column = read().find((column) => column.id == columnId);
  if (!column) return [];
  return column.items;
}

function insertItem(columnId, content) {
  const data = read();
  const column = data.find((column) => column.id == columnId);
  const obj = {
    id: Math.floor(Math.random() * 10000),
    content: content,
  };

  if (!column) throw new Error("Column does not exist");
  column.items.push(obj);
  save(data);
  return obj;
}

///////////////////////////////////////////////////
/////////////////Kanban DropZones
///////////////////////////////////////////////////

function getDropZones() {
  const draggables = document.querySelectorAll(".kanban-dropzone");
  draggables.forEach((task) => {
    doDragOver(task);
    doDragLeave(task);
    doDrop(task);
  });
}

function doDragOver(task) {
  task.addEventListener("dragover", () => {
    task.classList.add("kanban-dropzone--active");
  });
}

function doDragLeave(task) {
  task.addEventListener("dragleave", () => {
    task.classList.remove("kanban-dropzone--active");
  });
}

function doDrop(task) {
  task.addEventListener("drop", (e) => {
    e.preventDefault();
    task.classList.remove("kanban-dropzone--active");
    let closestTask = task.closest(".kanban-content");
    let contentId = Number(closestTask.id);
    let dropZonesInColumn = Array.from(closestTask.querySelectorAll(".kanban-dropzone"));
    let droppedIndex = dropZonesInColumn.indexOf(task);
    let itemId = Number(e.dataTransfer.getData("text/plain"));
    let droppedItemElement = document.querySelector(`[id="${itemId}"]`);
    const insertAfter = task.parentElement.classList.contains("kanban-item") ? task.parentElement : task;

    if (droppedItemElement.contains(task)) {
    } else {
      insertAfter.after(droppedItemElement);
      updateItem(itemId, {
        contentId,
        position: droppedIndex,
      });
      init();
    }
  });
}

///////////////////////////////////////////////////
/////////////////Kanban APIs
///////////////////////////////////////////////////
function read() {
  const json = localStorage.getItem("kanban-data");
  //if it runs for the first time
  if (!json) {
    return [
      { id: 1, items: [] },
      { id: 2, items: [] },
      { id: 3, items: [] },
      { id: 4, items: [] },
    ];
  }
  return JSON.parse(json);
}

function save(data) {
  localStorage.setItem("kanban-data", JSON.stringify(data));
}

function updateItem(itemId, newProps) {
  const data = read();
  const [item, currenColumn] = (() => {
    for (const column of data) {
      const item = column.items.find((item) => item.id == itemId);
      if (item) return [item, column];
    }
  })();

  if (!item) throw new Error("Item not found!");

  item.content = newProps.content === undefined ? item.content : newProps.content;
  // Update column and position
  if (newProps.contentId !== undefined && newProps.position !== undefined) {
    const targetColumn = data.find((column) => column.id == newProps.contentId);
    if (!targetColumn) throw new Error("Target column not found");

    currenColumn.items.splice(currenColumn.items.indexOf(item), 1); //Delete the item from it's current column
    targetColumn.items.splice(newProps.position, 0, item); // Move item into its new column and position
  }
  save(data);
}

function deleteItem(itemId) {
  const data = read();
  for (const column of data) {
    const item = column.items.find((item) => item.id == itemId);
    if (item) column.items.splice(column.items.indexOf(item), 1);
  }
  save(data);
}
