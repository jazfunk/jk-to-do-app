
document.getElementById("addBtnID").addEventListener("click", addTODO);
var taskList = document.getElementById("tasks");
taskList.addEventListener("click", modTODO);

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
  } else {      
      alert('You cannot add an empty task.')
  }
}

function modTODO(e) {
  if (e.target.className === "btn-Delete") {
    var li = e.target.parentElement;
    if (li.style.textDecoration === "line-through") {
      taskList.removeChild(li);      
    } else {
      alert('Cannot DELETE, task not marked COMPLETE.');
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
