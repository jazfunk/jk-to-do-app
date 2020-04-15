const DEFAULT_MESSAGE = "Welcome!";
var taskList = document.getElementById("tasks");

class Task {
  constructor(text, isComplete) {
    this.text = text;
    this.isComplete = isComplete;
  }
}

window.onload = function () {
  document.getElementById("add-btn-id").addEventListener("click", function (e) {
    const task = new Task(
      document.getElementById("task-description").value,
      false
    );
    renderToDo(task);
    updateLocal(task);
    e.preventDefault();
  });
  document
    .getElementById("clear-local-btn")
    .addEventListener("click", function (e) {
      if (
        confirm(
          "This will clear all listed and locally saved tasks, Are you sure?"
        )
      ) {
        displaySystemMessage("All Items Cleared");
        document.getElementById("task-description").value = "";
        document.getElementById("task-description").focus();
        window.localStorage.clear();
        while (taskList.firstChild) {
          taskList.removeChild(taskList.firstChild);
        }
      }
    });
  browserSupport();
  getLocalTaskList();
};

function renderToDo(task) {
  if (task.text !== "") {
    document.getElementById(
      "system-message"
    ).innerText = `"${task.text}" added to list.`;

    var li = document.createElement("li");
    li.className = "task-list-item";
    li.style.textDecoration = task.isComplete ? "line-through" : "";
    li.appendChild(document.createTextNode(task.text));
    li.addEventListener("click", function (e) {
      if (e.target.className === "task-list-item") {
        if (e.target.style.textDecoration !== "line-through") {
          e.target.style.textDecoration = "line-through";
          task.isComplete = true;
        } else {
          e.target.style.textDecoration = "";
          task.isComplete = false;
        }

        displaySystemMessage(
          task.isComplete
            ? `"${task.text}" Marked Complete`
            : `"${task.text}" Marked  Not Complete`
        );
        updateLocalTask(task);
      }
    });

    var deletebutton = document.createElement("button");
    deletebutton.className = "btn-delete";
    deletebutton.appendChild(document.createTextNode("Delete"));
    deletebutton.addEventListener("click", function (e) {
      if (li.style.textDecoration === "line-through") {
        removeLocalTask(task);
        taskList.removeChild(li);
        displaySystemMessage(`Removed Task: "${task.text}"`);
        document.getElementById("task-description").focus();
      } else {
        displaySystemMessage("Cannot DELETE, task is not marked COMPLETE.");
      }
    });

    li.appendChild(deletebutton);

    taskList.appendChild(li);

    document.getElementById("task-description").value = "";
  } else {
    displaySystemMessage("You cannot add an empty task.");
  }
  document.getElementById("task-description").focus();
}

function getLocalTaskList() {
  var localTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];

  for (task in localTasks) {
    renderToDo(localTasks[task]);
  }

  displaySystemMessage(
    localTasks.length > 0
      ? `You have ${localTasks.length} item(s) in your To-Do list`
      : DEFAULT_MESSAGE
  );
}

function updateLocal(task) {
  const savedTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
  savedTasks.push(task);
  window.localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

// I've ended up with two functions doing basically the same thing.
// This fx was reanamed from "updateLocal", before I realized there was
// an "updateLocal" fx written above.
// I'm leaving this and moving on and maybe come back to it another
// time and see if I really need both of these... I'm certain I don't.
// jk  2020-04-15
function updateLocalTask(task) {
  const savedTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
  const matchingTask = savedTasks.find(function (savedTask) {
    return task.text === savedTask.text;
  });
  const index = savedTasks.indexOf(matchingTask);
  savedTasks[index] = task;
  window.localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

function removeLocalTask(task) {
  const savedTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
  const matchingTask = savedTasks.find(function (savedTask) {
    return task.text === savedTask.text;
  });
  const index = savedTasks.indexOf(matchingTask);
  if (index > -1) {
    savedTasks.splice(index, 1);
    window.localStorage.setItem("tasks", JSON.stringify(savedTasks));
  }
}

function displaySystemMessage(systemMessage) {
  document.getElementById("system-message").innerText = systemMessage;
}

function browserSupport() {
  if (typeof Storage !== "undefined") {
    // localStorage supported
  } else {
    alert("Your browser does not support local storage.");
  }
  document.getElementById("task-description").focus();
}