
   

//  Button to add Task to list
var addButton = document.getElementById('addBtnID').addEventListener('click', addTODO);

// Get tasklist (ul called 'tasks'), and add event listener
var taskList = document.getElementById('tasks');
taskList.addEventListener('click', delTODO);



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

  //   // Create Complete task button, ad class, append text node
  //   var compBtn = document.createElement('button');
  //   compBtn.className = 'btn-Complete';
  //   compBtn.appendChild(document.createTextNode('Completed'));

  // Appen buttons to li
  li.appendChild(delBtn);
  //   li.appendChild(compBtn);

  // Append i to list
  taskList.appendChild(li);

  console.log("add to-do item to list");
}

function delTODO(e) {
  if (e.target.className === "btn-Delete") {
    var li = e.target.parentElement;
    taskList.removeChild(li);
    console.log("deleted to-do item from list");
    // Check if completed (strikethrough exists)
    // if (
    //   e.target.style.textDecoration == "line-through"
    // ) {
    //   var li = e.target.parentElement;
    //   taskList.removeChild(li);
    //   console.log("deleted to-do item from list");
    // }
  } else {
    // The text area was clicked, change text to strikthrough
    //console.log(e.target.innerText);
    var textToStrike = e.target.innerText;
    if (e.target.style.textDecorationLine !== 'line-through') {
      var result = textToStrike.substring(0, textToStrike.length - 6);
      var buttonHTML =
        '<input type="submit" value="Delete" class="btn-Delete">';

      e.target.innerHTML = result.strike() + buttonHTML;
      console.log(e.target.innerHTML);
    } else {
      console.log(e.targetstyle.textDecorationLine);
      //alert('strikethrough encountered');
    }
  }
}

