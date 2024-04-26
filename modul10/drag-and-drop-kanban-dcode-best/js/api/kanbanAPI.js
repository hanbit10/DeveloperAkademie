export default class kanbanAPI {
  static getItems(columnId) {
    const column = read().find((column) => column.id == columnId);
    console.log("this is column", column);
    if (!column) {
      return [];
    }
    return column.items;
  }

  static insertItem(columnId, content) {
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

  static updateItem(itemId, newProps) {
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

  static deleteItem(itemId) {
    const data = read();

    for (const column of data) {
      const item = column.items.find((item) => item.id == itemId);

      if (item) {
        column.items.splice(column.items.indexOf(item), 1);
      }
    }

    save(data);
  }
}

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
