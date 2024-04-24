const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");
const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");

let tasks = [
  {
    task: "hello",
    lane: "todo-lane",
  },
  {
    task: "this is task",
    lane: "todo-lane",
  },
  {
    task: "this is cool",
    lane: "doing-lane",
  },
  {
    task: "this is awesome",
    lane: "doing-lane",
  },
  {
    task: "this is done-lane",
    lane: "done-lane",
  },
  {
    task: "this is great!",
    lane: "done-lane",
  },
];

function init() {
  renderTasks("todo-lane");
  renderTasks("doing-lane");
  renderTasks("done-lane");
}

function renderTasks(id) {
  let element = document.getElementById(id);
  let todo = tasks.filter((t) => t["lane"] == id);

  for (let i = 0; i < todo.length; i++) {
    let task = todo[i]["task"];
    const newTask = document.createElement("p");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.innerText = task;

    newTask.addEventListener("dragstart", () => {
      newTask.classList.add("is-dragging");
    });

    newTask.addEventListener("dragend", () => {
      newTask.classList.remove("is-dragging");
    });
    element.appendChild(newTask);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;

  if (!value) return;

  const newTask = document.createElement("p");
  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");
  newTask.innerText = value;

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
  });

  todoLane.appendChild(newTask);

  input.value = "";
});

/**
 * If an element dragged add class "is-dragging"
 */
draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    const bottomTask = insertAboveTask(zone, e.clientY);
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });
});

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};
