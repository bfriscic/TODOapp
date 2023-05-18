// Defining the main application object
function TodoApp() {
    this.tasks = []; // Array for storing tasks
  }
  
  // Method for adding a task to the list
  TodoApp.prototype.addTask = function (taskText) {
    var task = {
      id: Date.now(), // Unique identifier for the task
      text: taskText, // The text of the task
      completed: false, // Flag indicating if the task is completed or not
    };
  
    this.tasks.push(task); // Add the task to the array of tasks
    this.renderTasks(); // Update the task list on the page
  };
  
  // Method for deleting a task from the list
  TodoApp.prototype.deleteTask = function (taskId) {
    this.tasks = this.tasks.filter(function (task) {
      return task.id !== taskId;
    });
  
    this.renderTasks(); // Update the task list on the page
  };
  
  // Method for toggling the status of a task (completed or not completed)
  TodoApp.prototype.toggleTaskStatus = function (taskId) {
    this.tasks.forEach(function(task) {
      if (task.id === taskId) {
        task.completed = !task.completed; // Toggle the completed status of the task
      }
    });
  
    this.renderTasks(); // Update the task list on the page
  };
  
  // Method for rendering the tasks on the page
  TodoApp.prototype.renderTasks = function () {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear the task list before rendering
  
    var filter = this.getFilter(); // Get the currently selected filter
    var filteredTasks = this.filterTasks(filter); // Get the tasks filtered based on the selected filter
  
    filteredTasks.forEach(
      function (task) {
        var listItem = document.createElement("li"); // Create a new list item element
        var checkbox = document.createElement("input"); // Create a checkbox element
        checkbox.type = "checkbox"; // Set the type of the checkbox
        checkbox.checked = task.completed; // Set the checked state based on the task's completed status
        checkbox.addEventListener(
          "change",
          function () {
            this.toggleTaskStatus(task.id); // Toggle the task status when the checkbox is changed
          }.bind(this)
        );
  
        var taskText = document.createElement("span"); // Create a span element for the task text
        taskText.textContent = task.text; // Set the text content of the span element
        taskText.classList.add("task-text"); // Add a CSS class to the span element
  
        listItem.appendChild(checkbox); // Append the checkbox to the list item
        listItem.appendChild(taskText); // Append the task text to the list item
  
        if (task.completed) {
          listItem.classList.add("completed"); // Add a CSS class to the list item if the task is completed
        }
  
        listItem.addEventListener(
          "click",
          function () {
            this.toggleTaskStatus(task.id); // Toggle the task status when the list item is clicked
          }.bind(this)
        );
  
        listItem.addEventListener(
          "contextmenu",
          function (e) {
            e.preventDefault();
            this.deleteTask(task.id); // Delete the task when the list item is right-clicked
          }.bind(this)
        );
  
        taskList.appendChild(listItem); // Append the list item to the task list
      }.bind(this)
    );
  };
  
  // Method for getting the currently selected filter
  TodoApp.prototype.getFilter = function () {
    var allBtn = document.getElementById("allBtn");
    var activeBtn = document.getElementById("activeBtn");
    var completedBtn = document.getElementById("completedBtn");
  
    if (activeBtn.classList.contains("active")) {
      return "active"; // Return "active" if the active button is selected
    } else if (completedBtn.classList.contains("active")) {
      return "completed"; // Return "completed" if the completed button is selected
    }
  
    return "all"; // Return "all" if no filter is selected
  };
  
  // Method for filtering tasks based on the selected filter
  TodoApp.prototype.filterTasks = function (filter) {
    if (filter === "active") {
      return this.tasks.filter(function (task) {
        return !task.completed; // Filter and return tasks that are not completed
      });
    } else if (filter === "completed") {
      return this.tasks.filter(function (task) {
        return task.completed; // Filter and return tasks that are completed
      });
    }
  
    return this.tasks; // Return all tasks if no filter is applied
  };
  
  // Initialize the application after the window has loaded
  window.addEventListener("load", function () {
    var todoApp = new TodoApp();
  
    var taskForm = document.getElementById("taskForm");
    taskForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var taskInput = document.getElementById("taskInput");
      var taskText = taskInput.value.trim();
  
      if (taskText !== "") {
        todoApp.addTask(taskText); // Add the task when the form is submitted
        taskInput.value = "";
      }
    });
  
    var allBtn = document.getElementById("allBtn");
    var activeBtn = document.getElementById("activeBtn");
    var completedBtn = document.getElementById("completedBtn");
  
    allBtn.addEventListener("click", function () {
      // Apply the filter for showing all tasks
      if (!allBtn.classList.contains("active")) {
        allBtn.classList.add("active");
        activeBtn.classList.remove("active");
        completedBtn.classList.remove("active");
        todoApp.renderTasks();
      }
    });
  
    activeBtn.addEventListener("click", function () {
      // Apply the filter for showing only active tasks
      if (!activeBtn.classList.contains("active")) {
        allBtn.classList.remove("active");
        activeBtn.classList.add("active");
        completedBtn.classList.remove("active");
        todoApp.renderTasks();
      }
    });
  
    completedBtn.addEventListener("click", function () {
      // Apply the filter for showing only completed tasks
      if (!completedBtn.classList.contains("active")) {
        allBtn.classList.remove("active");
        activeBtn.classList.remove("active");
        completedBtn.classList.add("active");
        todoApp.renderTasks();
      }
    });
  });
  