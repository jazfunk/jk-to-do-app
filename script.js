
let savedTasks = [];
let taskList = document.getElementById("tasks");
taskList.addEventListener("click", modTODO);

window.onload = function() {
  document
    .getElementById("add-btn-id")
    .addEventListener("click", function() {
      addTODO(document.getElementById("task-description").value);
    });
  document
    .getElementById("clear-local-btn")
    .addEventListener("click", function() {
      if (confirm("This will clear all listed and locally saved tasks, Are you sure?")) {
        document.getElementById("task-description").value = "";
        document.getElementById("task-description").focus();
        window.localStorage.clear();
        savedTasks.length = 0;
        while (taskList.firstChild) {
          taskList.removeChild(taskList.firstChild);
        }        
      }
    });
  browserSupport();
  getLocalTaskList();  
};

function updateLocal(task) {
  if (task != "removed-item") {
    savedTasks.push(task);
  }
  window.localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

function addTODO(task) {
  if (task !== "") {
    var li = document.createElement("li");
    li.className = "task-list-item";
    li.appendChild(document.createTextNode(task));
    var deletebutton = document.createElement("button");
    deletebutton.className = "btn-delete";
    deletebutton.appendChild(document.createTextNode("Delete"));
    li.appendChild(deletebutton);
    taskList.appendChild(li);
    updateLocal(task);
    document.getElementById("task-description").value = "";    
  } else {
    alert("You cannot add an empty task.");
  }
  document.getElementById("task-description").focus();
}

function modTODO(e) {
  if (e.target.className === "btn-delete") {
    var li = e.target.parentElement;
    if (li.style.textDecoration === "line-through") {
      // Get innerText from <li> minus delete button text and preceding space character
      var task = li.innerText.substring(0, li.innerText.length - 7);
      removeLocalTask(task);
      taskList.removeChild(li);
      document.getElementById('task-description').focus();
    } else {
      alert("Cannot DELETE, task is not marked COMPLETE.");
    }
  } else {
    if (e.target.style.textDecoration !== "line-through") {
      e.target.style.textDecoration = "line-through";
    } else {
      e.target.style.textDecoration = "";
    }
  }
}

function browserSupport() {
  if (typeof Storage !== "undefined") {
    // localStorage supported
  } else {
    alert("Your browser does not support local storage.");
  }
  document.getElementById("task-description").focus();
}

function removeLocalTask(task) {
  const index = savedTasks.indexOf(task);
  if (index > -1) {
    savedTasks.splice(index, 1);
    updateLocal("removed-item");
  }
}

function getLocalTaskList() {
  var localTasks = JSON.parse(window.localStorage.getItem("tasks"));
  if (localTasks != null) {
    for (task in localTasks) {
      addTODO(localTasks[task]);
    }
  } else {
    console.log("localStorage is empty");
  }  
}