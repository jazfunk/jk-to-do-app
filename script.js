//  Button to add task to list
document.getElementById("addBtnID").addEventListener("click", addTODO);

// Get tasklist (ul called 'tasks'), and add event listener
var taskList = document.getElementById("tasks");
taskList.addEventListener("click", modTODO);

// Function to Add To-Do item to the list
function addTODO(e) {
  // Get Task from user input
  var newTask = document.getElementById("taskDescription").value;

  // Check for empty strings, notify user.
  if (newTask !== "") {
    // Create new li element, add className
    var li = document.createElement("li");
    li.className = "task-list-item";
    // Add Task text to the li element
    li.appendChild(document.createTextNode(newTask));

    // Create delete button, ad class, append text node
    var delBtn = document.createElement("button");
    delBtn.className = "btn-Delete";
    delBtn.appendChild(document.createTextNode("Delete"));

    // Appen button to li
    li.appendChild(delBtn);

    // Append li to list
    taskList.appendChild(li);
    
    // Notate progress
    console.log("Add to TO-DO List");
  } else {
      // newTask = ""
      alert('You cannot add an empty task.')
  }
}

// Modify TODO - Delete, or Strike-Through
function modTODO(e) {
  if (e.target.className === "btn-Delete") {
    // Delete Button detected, delete accordingly

    // Get <li> from target.parentElement
    var li = e.target.parentElement;

    //  Here I would like to be able to get the textDecoration property
    //  of the task descrition and only delete it if the property is 'line-through'
    //  I can't seem to get it.  Ugh.  3/23/20 - jk


    // Delete <li> from the taskList object
    taskList.removeChild(li);

    // Notate progress
    console.log("Delete from TO-DO List");
    
  } else {
    // Toggle Strike-through action detected

    // Get text to modify
    var textToStrike = e.target.innerText;

    // Toggle Strike-through action
    if (e.target.style.textDecoration !== "line-through") {
      e.target.style.textDecoration = "line-through";
    } else {
      e.target.style.textDecoration = "";
    }
  }
}
