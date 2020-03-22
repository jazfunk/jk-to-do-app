//  Button to add Task to list
var addButton = document
  .getElementById("addBtnID")
  .addEventListener("click", addTODO);

// Get tasklist (ul called 'tasks'), and add event listener
var taskList = document.getElementById("tasks");
taskList.addEventListener("click", delTODO);

// Function to Add To-Do item to the list
function addTODO(e) {
  // Get Task from user input
  var newTask = document.getElementById("taskDescription").value;

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

function delTODO(e) {
  if (e.target.className === "btn-Delete") {
    var li = e.target.parentElement;
    taskList.removeChild(li);
    console.log("deleted to-do item from list");

    //  Can't seem to hook onto the textDecoration property
    //  to determine whether task is already strikethrough and can be deleted.

    //  Check if completed (strikethrough exists)
    // if (
    //   e.target.style.textDecoration == "line-through"
    // ) {
    //   var li = e.target.parentElement;
    //   taskList.removeChild(li);
    //   console.log("deleted to-do item from list");
    // }
  } else {
    // Not the delete button, strikethrough text, if not already done
    //console.log(e.target.innerText);
    var textToStrike = e.target.innerText;
    if (e.target.style.textDecoration !== "line-through") {
      var result = textToStrike.substring(0, textToStrike.length - 6);
      var buttonHTML =
        '<input type="submit" value="Delete" class="btn-Delete">';

      e.target.innerHTML = result.strike() + buttonHTML;
      console.log(e.target.innerHTML);
    } else {
      console.log(e.target.style.textDecoration);
      //alert('strikethrough encountered');
    }
  }
}
