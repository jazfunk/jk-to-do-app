//  Button to add Task to list
var addButton = document.getElementById("addBtnID").addEventListener("click", addTODO);

// Get tasklist (ul called 'tasks'), and add event listener
var taskList = document.getElementById("tasks");
taskList.addEventListener("click", modTODO);

// Function to Add To-Do item to the list
function addTODO(e) {
  // Get Task from user input
  var newTask = document.getElementById("taskDescription").value;

  // Check for empty strings, skip and do not notify user
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

    console.log("add to-do item to list");
  }
}

function modTODO(e) {
  if (e.target.className === "btn-Delete") {
    // Delete Button detected, delete accordingly
    var li = e.target.parentElement;
      taskList.removeChild(li);
      console.log("deleted to-do item from list");
    // Check first character, determine if line-through
    //var liSubString = li.innerText.substring(0, 1);
    // if (li.innerText.style.textDcoration !== "line-through") {
    //   taskList.removeChild(li);
    //   console.log("deleted to-do item from list");
    // }
  } else {
    // Toggle Strike-through action detected
    var textToStrike = e.target.innerText;
    if (e.target.style.textDecoration !== "line-through") {
      e.target.style.textDecoration = "line-through";
    } else {
      e.target.style.textDecoration = "";
      console.log(e.target.style.textDecoration);
    }
  }
}

