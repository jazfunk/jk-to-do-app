
var newTask = null;
document.getElementById("addBtnID").addEventListener("click", addTODO);
var taskList = document.getElementById("tasks");
taskList.addEventListener("click", modTODO);

var savedTasks = window.localStorage.getItem("tasks")
  ? JSON.parse(window.localStorage.getItem("tasks"))
  : [];
window.localStorage.setItem("tasks", JSON.stringify(savedTasks));
var localTasks = JSON.parse(window.localStorage.getItem("tasks"));

function clearTaskListUI() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}


var button = document.getElementById("clear-local-btn");
button.addEventListener("click", function() {
  if (confirm("This will delete all tasks, Are you sure?")) {
    // clearTaskListUI;
    window.localStorage.clear();
    console.log(window.localStorage);  
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }  
  }
})

window.onload = function() {
  browserSupport();
  getLocalTaskList();
};



function addTODO() {  
  if(newTask === null) {
    newTask = document.getElementById('task-description').value;
  }
  if (newTask !== "") {
    var li = document.createElement("li");
    li.className = "task-list-item";
    li.appendChild(document.createTextNode(newTask));
    var delBtn = document.createElement("button");
    delBtn.className = "btn-Delete";
    delBtn.appendChild(document.createTextNode("Delete"));
    li.appendChild(delBtn);
    taskList.appendChild(li);

    savedTasks.push(newTask);
    window.localStorage.setItem("tasks", JSON.stringify(savedTasks));
    console.log(localStorage);
    //getLocalTaskList();
  } else {
    //alert("You cannot add an empty task.");
    console.log('You cannot add an empty task.');
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

// function updateTaskList() {
//   for (task in savedTasks) {
    
//   }
// }


function getLocalTaskList() {
  
  for (task in localTasks) {
    newTask = localTasks[task];
    addTODO();    
  }
}
