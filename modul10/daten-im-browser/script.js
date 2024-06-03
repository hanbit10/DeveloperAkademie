let allTasks = [];

function addTask() {
  loadAllTasks();
  let description = document.getElementById("description").value;
  let category = document.getElementById("category").value;

  let task = {
    description: description,
    category: category,
    createdAt: new Date().getTime(),
  };

  allTasks.push(task);

  let allTasksAsString = JSON.stringify(allTasks);
  localStorage.setItem("allTasks", allTasksAsString);

  console.log(allTasks);
}

function loadAllTasks() {
  let allTasksAsString = localStorage.getItem("allTasks");
  allTasks = JSON.parse(allTasksAsString);
  console.log("Loaded all tasks", allTasks);
}
