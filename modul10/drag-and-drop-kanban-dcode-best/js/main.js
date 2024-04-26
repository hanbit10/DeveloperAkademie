import kanbanAPI from "./api/kanbanAPI.js";
import Kanban from "./view/kanban.js";

// console.log(kanbanAPI.getItems(1));

// console.log(kanbanAPI.insertItem(2, "My name is Hanbit"));

// kanbanAPI.updateItem(719, { columnId: 1, position: 0, content: "I've changed." });

kanbanAPI.deleteItem();

new Kanban(document.querySelector(".kanban"));
