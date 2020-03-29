
const defaultSystemMessage = "Welcome!"
const id = "COMPLETED: "
const itemBaseHTML = '<Button class="btn-delete">Delete</Button>';
let isComplete = false;
let savedTasks = [];
let taskList = document.getElementById("tasks");
taskList.addEventListener("click", modTODO);

window.onload = function() {
  document
    .getElementById("add-btn-id")
    .addEventListener("click", function(e) {      
      addTODO(document.getElementById("task-description").value); 
      e.preventDefault();               
    });
  document
    .getElementById("clear-local-btn")
    .addEventListener("click", function(e) {
      if (confirm("This will clear all listed and locally saved tasks, Are you sure?")) {
        //document.getElementById("system-message").innerText = "";
        displaySystemMessage("All Items Cleared");
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
}

function updateLocal(task) {
  if (task != "removed-item") {
    savedTasks.push(task);
  }
  window.localStorage.setItem("tasks", JSON.stringify(savedTasks));
  //document.getElementById("system-message").innerText = `"${task}" updated.`
  isComplete = false;
}

function addTODO(task) {
  if (task !== "") {
    document.getElementById("system-message").innerText = `"${task}" added to list.`
    var li = document.createElement("li");
    li.className = "task-list-item";

    if (isComplete) {
      li.style.textDecoration = "line-through";
    } else {
      li.style.textDecoration = "";
    }

    li.appendChild(document.createTextNode(task));
    var deletebutton = document.createElement("button");
    deletebutton.className = "btn-delete";
    //deletebutton.disabled = true;
    deletebutton.appendChild(document.createTextNode("Delete"));
    li.appendChild(deletebutton);
    taskList.appendChild(li);
    updateLocal(task);
    document.getElementById("task-description").value = "";
  } else {
    //document.getElementById("system-message").innerText = "You cannot add an empty task.";
    displaySystemMessage('You cannot add an empty task.');
    //alert("You cannot add an empty task.");
  }
  document.getElementById("task-description").focus();
}

function modTODO(e) {
  if (e.target.className === "btn-delete") {
    var li = e.target.parentElement;
    var task = li.innerText.substring(0, li.innerText.length - 7);
    if (li.style.textDecoration === "line-through") {
      removeLocalTask(task);
        taskList.removeChild(li);
        //document.getElementById("system-message").innerText = `Removed Task: "${task}"`
        displaySystemMessage(`Removed Task: "${task}"`)
        document.getElementById("task-description").focus();
      // if (confirm("Are you sure? This cannot be undone.")) {
      //   removeLocalTask(task);
      //   taskList.removeChild(li);
      //   //document.getElementById("system-message").innerText = `Removed Task: "${task}"`
      //   displaySystemMessage(`Removed Task: "${task}"`)
      //   document.getElementById("task-description").focus();
      // }   
    } else {
      //alert("Cannot DELETE, task is not marked COMPLETE.");
      displaySystemMessage('Cannot DELETE, task is not marked COMPLETE.')
      //document.getElementById("system-message").innerText = "Cannot DELETE, task is not marked COMPLETE."
    }
  } else {
    if (e.target.className === "task-list-item") {
      if (e.target.style.textDecoration !== "line-through") {
        e.target.style.textDecoration = "line-through";
        isComplete = true;
      } else {
        e.target.style.textDecoration = "";
        isComplete = false;
      }

      var targetTextLength = e.target.innerHTML.length;
      targetTask = e.target.innerHTML.substring(
        0,
        targetTextLength - itemBaseHTML.length
      );
      // document.getElementById(
      //   "system-message"
      // ).innerText = `Task "${targetTask}" Complete = ${isComplete}`;
      displaySystemMessage(
        isComplete
          ? `"${targetTask}" Marked Complete`
          : `"${targetTask}" Marked  Not Complete`
      );
      task = addStrikeThroughID(targetTask);
      e.target.innerHTML = task + itemBaseHTML;
      removeLocalTask(targetTask);
      updateLocal(task);
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
        isComplete = localTasks[task].substring(0, id.length) === id;  
      addTODO(localTasks[task]);
    }
    displaySystemMessage(`You have ${localTasks.length} item(s) in your To-Do list`)
  } else {
    displaySystemMessage(defaultSystemMessage)
    console.log("localStorage is empty");
  }    
}

function addStrikeThroughID(task) {
  const taskST_ID = task.substring(0, id.length);
  if(taskST_ID === id) {
    task = task.substring(id.length, task.length);
  } else {
    task = id + task
    isComplete = true;
  }
  return task;
}

function displaySystemMessage(systemMessage) {
  document.getElementById('system-message').innerText = systemMessage;
}
