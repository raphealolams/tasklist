// Define UI var


const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Function to Load event listeners
loadEventListeners();

// load all event
function loadEventListeners(){
  // Load DOM
  document.addEventListener('DOMContentLoaded' , getTasks);
  // Add Tasks
  form.addEventListener('submit' , addTask);

  // Remove Task
  taskList.addEventListener('click' , removeTask);

  // Clear Tasks
  clearBtn.addEventListener('click' , clearTasks);

  // Filter Tasks
  filter.addEventListener('keyup' , filterTask);
}

// getTasks
function getTasks(){
  let tasks; 
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    // Create Li element
    const li = document.createElement('li');
    // Add Class Name
    li.className = 'collection-item';

    // Add textNode and Append
    li.appendChild(document.createTextNode(task));

    // Create New link Element
    const link = document.createElement('a');

    // Add Class
    link.className = 'delete-item secondary-content';

    // Add Icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append link to LI
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  })
}

// Add Task
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a Task');
  }

  // Create Li element
  const li = document.createElement('li');
  // Add Class Name
  li.className = 'collection-item';

  // Add textNode and Append
  li.appendChild(document.createTextNode(taskInput.value));

  // Create New link Element
  const link = document.createElement('a');

  // Add Class
  link.className = 'delete-item secondary-content';

  // Add Icon
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Append link to LI
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear Input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task 
function storeTaskInLocalStorage(task){
  let tasks; 
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks' , JSON.stringify(tasks));
}

// Remove Task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you Sure ?')){
      e.target.parentElement.parentElement.remove();

      // Remove Task from LocalStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove Task form LocalStorage
function removeTaskFromLocalStorage(taskItem){
  let tasks; 
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task , index){
    if(taskItem.textContent === task){
      tasks.splice(index , 1);
    }
  });
  localStorage.setItem('tasks' , JSON.stringify(tasks));
}

// Clear Task
function clearTasks(){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  // Clear Tasks from local Storage
  clearTasksFromLocalStorage();
}

// Clear from Local storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// Filter Task
function filterTask(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';      
    }
  })
}
