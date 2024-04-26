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
    title: "Completed",
  },
];

async function init() {
  getItems(1);
  renderKanban();
  const draggables = document.querySelectorAll(".kanban-dropzone");
  draggables.forEach((task) => {
    task.addEventListener("dragover", () => {
      console.log(task);
      task.classList.add("kanban-dropzone--active");
    });
  });
}

function renderKanban() {
  let data = read();
  let kanban = document.getElementById("kanban");
  kanban.innerHTML = "";
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    const id = data[i]["id"];
    kanban.innerHTML += /*html*/ `
      <div class="kanban-container" >
        <div id="kanban-title-${id}" class="kanban-title"></div>

          <div id="kanban-contents-${id}">
          <div ondragover="allowDrop(event); doDragOver()" id="dropzone" class="kanban-dropzone"></div>
          ${createDropZone()}
        </div>

          <button onclick="addContent(${id})" class="kanban-add-item" type="button">+ Add</button>
        </div>
      </div>`;

    getTitle(title[i], id);
    getContents(data[i]["items"], id);
  }
}

function createDropZone() {
  // console.log("thisi is body", document.body);
  const range = document.createRange();
  range.selectNode(document.body);
  const dropZone = range.createContextualFragment(/*html*/ `
  <div class="kanban-dropzone"></div>
`).children[0];

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    // console.log("dragover");
    // dropZone.classList.add("kanban-dropzone--active");
  });
}

function allowDrop(ev) {
  ev.preventDefault();
}

function doDragOver() {
  // console.log("dragover");
  // classList.add("kanban-dropzone--active");
}

function getTitle(title, id) {
  let element = document.getElementById(`kanban-title-${id}`);
  element.innerHTML = title["title"];
}

function getContents(contents, id) {
  // console.log("contents", contents);
  let content = document.getElementById(`kanban-contents-${id}`);
  contents.forEach(function (index) {
    // console.log("index", index);
    content.innerHTML += /*html*/ `
      <div id='${index["id"]}' class="kanban-item" draggable="true">
        <div id='input-${index["id"]}' onblur='saveBlur(${index["id"]})' contenteditable class="kanban-item-input">${index["content"]}</div>
        <div onclick='deleteContent(${index["id"]})'>x</div>
        <!-- <div ondragover="allowDrop(event); doDragOver()" id="dropzone" class="kanban-dropzone"></div> -->
      </div>
    `;
  });
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
  // Use the find() method to search for the item with the specified ID
  const item = data.flatMap((obj) => obj.items).find((item) => item.id === id);
  // Return the content if the item is found, otherwise return null
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
  if (!column) {
    return [];
  }
  return column.items;
}

function insertItem(columnId, content) {
  const data = read();
  const column = data.find((column) => column.id == columnId);
  const obj = {
    id: Math.floor(Math.random() * 1000),
    content: content,
  };

  if (!column) {
    throw new Error("Column does not exist");
  }

  column.items.push(obj);
  save(data);

  return obj;
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

      if (item) {
        return [item, column];
      }
    }
  })();

  if (!item) {
    throw new Error("Item not found!");
  }

  item.content = newProps.content === undefined ? item.content : newProps.content;

  // Update column and position
  if (newProps.columnId !== undefined && newProps.position !== undefined) {
    const targetColumn = data.find((column) => column.id == newProps.columnId);

    if (!targetColumn) {
      throw new Error("Target column not found");
    }
    //Delete the item from it's current column
    currenColumn.items.splice(currenColumn.items.indexOf(item), 1);

    // Move item into its new column and position
    targetColumn.items.splice(newProps.position, 0, item);
  }
  save(data);
}

function deleteItem(itemId) {
  const data = read();
  for (const column of data) {
    const item = column.items.find((item) => item.id == itemId);

    if (item) {
      column.items.splice(column.items.indexOf(item), 1);
    }
  }
  save(data);
}
