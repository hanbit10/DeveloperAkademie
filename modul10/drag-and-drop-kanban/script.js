const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");
const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");

let tasks = [
  {
    id: 2,
    task: "hello",
    lane: "todo-lane",
  },
  { id: 1, task: "this is task", lane: "todo-lane" },
  { id: 2, task: "this is cool", lane: "doing-lane" },
  { id: 1, task: "this is awesome", lane: "doing-lane" },
  {
    id: 2,
    task: "this is done-lane",
    lane: "done-lane",
  },
  {
    id: 1,
    task: "this is great!",
    lane: "done-lane",
  },
];

function init() {
  if (localStorage.getItem("tasks") !== null) {
    getTasks();
  }
  renderTasks("todo-lane");
  renderTasks("doing-lane");
  renderTasks("done-lane");
}

function renderTasks(id) {
  let element = document.getElementById(id);
  let todo = tasks.filter((t) => t["lane"] == id);
  todo.sort((a, b) => a.id - b.id);
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
    const taskToUpdate = tasks.find((taskObj) => taskObj.task === curTask.textContent);
    if (taskToUpdate) {
      taskToUpdate.lane = zone.id;
    }
    if (!bottomTask) {
      zone.appendChild(curTask);
      let todo = tasks.filter((t) => t["lane"] == zone.id);
      // console.log(tasks);

      console.log(zone);
      // console.log(curTask);
      // console.log(taskToUpdate.id);

      taskToUpdate.id = todo.length;
      // for (let i = 0; i < todo.length - 1; i++) {}
      // console.log(todo.length);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
    tasks.forEach((task) => {
      if (task.lane === "doing-lane") {
        task.id -= 1;
      }
    });
    saveTasks();
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

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  let item = localStorage.getItem("tasks");
  tasks = JSON.parse(item);
}
