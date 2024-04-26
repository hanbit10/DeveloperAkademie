import kanbanAPI from "../api/kanbanAPI.js";

export default class Column {
  constructor(id, title) {
    this.elements = {};
    this.elements.root = Column.createRoot();
    this.elements.title = this.elements.root.querySelector(".kanban_column-title");
    this.elements.items = this.elements.root.querySelector(".kanban_column-items");
    this.elements.addItem = this.elements.root.querySelector(".kanban_add-item");
    this.elements.root.dataset.id = id;
    this.elements.title.textContent = title;

    this.elements.addItem.addEventListener("click", () => {
      //TODO: add item
    });

    kanbanAPI.getItems(id).forEach((item) => {
      this.renderItem(item);
    });
  }

  static createRoot() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(/*html*/ `
      <div class="kanban_column">
        <div class="kanban_column-title">Not Started</div>
        <div class="kanban_column-items">
          <div contenteditable class="kanban_item-input">Wash the dishes please</div>
          <div class="kanban_dropzone"></div>
        </div>
        <button class="kanban_add-item" type="button">+ Add</button>
      </div>
    `).children[0];
  }

  renderItem(data) {}
}
