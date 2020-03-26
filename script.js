
var savedTasks = new Object();

document.getElementById("addBtnID").addEventListener("click", addTODO);
var taskList = document.getElementById("tasks");
taskList.addEventListener("click", modTODO);

window.onload = function() {
  this.browserSupport();
  this.getLocalTaskList();
};

function addTODO(e) {
  var newTask = document.getElementById("taskDescription").value;
  if (newTask !== "") {
    var li = document.createElement("li");
    li.className = "task-list-item";
    li.appendChild(document.createTextNode(newTask));
    var delBtn = document.createElement("button");
    delBtn.className = "btn-Delete";
    delBtn.appendChild(document.createTextNode("Delete"));
    li.appendChild(delBtn);
    taskList.appendChild(li);
    saveLocalTaskList(taskList);
  } else {
    alert("You cannot add an empty task.");
  }
}

function modTODO(e) {
  if (e.target.className === "btn-Delete") {
    var li = e.target.parentElement;
    if (li.style.textDecoration === "line-through") {
      taskList.removeChild(li);
    } else {
      alert("Cannot DELETE, task is not marked COMPLETE.");
    }
  } else {
    var textToStrike = e.target.innerText;
    if (e.target.style.textDecoration !== "line-through") {
      e.target.style.textDecoration = "line-through";
    } else {
      e.target.style.textDecoration = "";
    }
  }
}

function browserSupport() {
  if (typeof Storage !== "undefined") {
    // Code for localStorage
  } else {
    // No web storage Support.
    alert(
      "Your browser does not support local storage.  Cannot save your tasks."
    );
  }
}

function saveLocalTaskList(taskList) {
  window.localStorage.setItem("task", JSON.stringify(taskList));  
}

function getLocalTaskList() {
  savedTasks = JSON.parse(window.localStorage.getItem("task"));  
  //document.getElementById('task').innerHTML = savedTasks;

}
