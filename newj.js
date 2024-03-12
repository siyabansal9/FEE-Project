let tasks = []; // Array to store tasks
let categories = []; // Array to store categories
document.getElementById('mode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

document.addEventListener('DOMContentLoaded', () => {
    showTasks();
    updateCategorySelect();
});

function showTasks() {
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = '';

    let totalTasks = tasks.length;
    let importantTasks = tasks.filter(task => task.important).length;

    document.getElementById('totalTasksCount').textContent = totalTasks;
    document.getElementById('importantTasksCount').textContent = importantTasks;

    tasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        tasksContainer.appendChild(taskElement);
    });
}

function createTaskElement(task, index) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = `
        <p><strong>${task.name}</strong></p>
        <p>${task.description}</p>
        <p>Date: ${task.date}</p>
        <input type="checkbox" ${task.important ? 'checked' : ''} onchange="toggleImportant(${index})"> Important
        <input type="checkbox" ${task.complete ? 'checked' : ''} onchange="toggleComplete(${index})"> Complete
        <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    return taskElement;
}

function toggleImportant(index) {
    tasks[index].important = !tasks[index].important;
    showTasks();
}

function toggleComplete(index) {
    tasks[index].complete = !tasks[index].complete;
    showTasks();
}

function showSection(section) {
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = '';

    let filteredTasks = [];

    if (section === 'important') {
        filteredTasks = tasks.filter(task => task.important);
    } else if (section === 'complete') {
        filteredTasks = tasks.filter(task => task.complete);
    } else if (section === 'incomplete') {
        filteredTasks = tasks.filter(task => !task.complete);
    } else {
        filteredTasks = tasks;
    }

    filteredTasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        tasksContainer.appendChild(taskElement);
    });
}

function addTask() {
    const taskNameInput = document.getElementById('taskName').value.trim();
    const taskDescriptionInput = document.getElementById('taskDescription').value.trim();
    const taskDateInput = document.getElementById('taskDate').value;
    
    const selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
    const taskCategory = document.getElementById('categorySelect').value || 'Daily';

    if (taskNameInput !== '' && taskDescriptionInput !== '' && taskDateInput !== '' && selectedCategory !== '') {
        const newTask = {
            id: tasks.length + 1,
            name: taskNameInput,
            description: taskDescriptionInput,
            date: taskDateInput,
            important: false,
            complete: false,
            category: selectedCategory
        };

        tasks.push(newTask);
        showTasks();

        // Clear input fields
        document.getElementById('taskName').value = '';
        document.getElementById('taskDescription').value = '';
        document.getElementById('taskDate').value = '';
    } else {
        alert('Please fill in all fields.');
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    showTasks();
}

function searchTasks() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(searchInput) ||
        task.description.toLowerCase().includes(searchInput) ||
        task.date.includes(searchInput)
    );
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        tasksContainer.appendChild(taskElement);
    });
}

function toggleOrganizeSection() {
    const modal = document.getElementById('organizeModal');
    modal.classList.toggle('show');
    if (modal.classList.contains('show')) {
        updateCategoriesList();
    }
}

function updateCategoriesList() {
    const categoriesList = document.getElementById('categoriesList');
    categoriesList.innerHTML = '';
    categories.forEach(category => {
        const listItem = document.createElement('li');
        listItem.textContent = category.name;
        listItem.addEventListener('click', () => {
            showTasksByCategory(category.name);
        });
        categoriesList.appendChild(listItem);
    });
}

function addCategory() {
    const categoryName = document.getElementById('organizeCategory').value.trim();
    if (categoryName !== '') {
        const existingCategory = categories.find(category => category.name === categoryName);
        
        if (existingCategory) {
            alert("Category ${categoryName} already exists.");
        } else {
            categories.push({ name: categoryName });
            updateCategoriesList();
            updateCategorySelect();
            
            
        }
    } else {
        alert('Please enter a category name.');
    }
}

function updateCategorySelect() {
    const categorySelect = document.getElementById('categorySelect');
    categorySelect.innerHTML = '<option value="">category </option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

function showTasksByCategory(categoryName) {
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = '';

    const tasksInCategory = tasks.filter(task => task.category === categoryName);
    tasksInCategory.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        tasksContainer.appendChild(taskElement);
    });
}
function showTasksByCategory(categoryName) {
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = '';

    const tasksInCategory = tasks.filter(task => task.category === categoryName);
    tasksInCategory.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        tasksContainer.appendChild(taskElement);
    });
}
function createTaskElement(task, index) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = `
        <p><strong>${task.name}</strong></p>
        <p>${task.description}</p>
        <p>Date: ${task.date}</p>
        <p>Category: ${task.category}</p>
        <input type="checkbox" ${task.important ? 'checked' : ''} onchange="toggleImportant(${index})"> Important
        <input type="checkbox" ${task.complete ? 'checked' : ''} onchange="toggleComplete(${index})"> Complete
        <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    return taskElement;
}
function showTasksByCategory(categoryName) {
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = '';

    const tasksInCategory = tasks.filter(task => task.category === categoryName);
    
    if (tasksInCategory.length === 0) {
        tasksContainer.innerHTML = '<p>No tasks in this category</p>';
    } else {
        tasksInCategory.forEach((task, index) => {
            const taskElement = createTaskElement(task, index);
            tasksContainer.appendChild(taskElement);
        });
    }}
// Function to update tasks displayed
function updateTasks() {
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        tasksContainer.appendChild(taskElement);
    });

    updateTaskCounts();
}

// Function to create task element
function createTaskElement(task, index) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task-box');
    taskElement.innerHTML = `
        <p><strong>${task.name}</strong></p>
        <p>${task.description}</p>
        <p>Date: ${task.date}</p>
        <p>Category: ${task.category}</p>
        <input type="checkbox" ${task.important ? 'checked' : ''} onchange="toggleImportant(${index})" class="important-checkbox"  id="importantCheckbox-${index}"> Important
        <label for="importantCheckbox-${index}" class="checkbox-container"></label>

        <input type="checkbox" ${task.complete ? 'checked' : ''} onchange="toggleComplete(${index})"class="complete-checkbox" id="completeCheckbox-${index}"> Complete
        <label for="completeCheckbox-${index}" class="checkbox-container"></label>

        <button class="delete-button" onclick="deleteTask(${task.id})">Delete</button>
    `;
    return taskElement;
}
// Define an array of messages
const messages = [
    "Hover over the page...",
    "Need to organize your tasks?",
    "Stay productive!",
    "Manage your time effectively!"
  ];
  
  // Function to pick a random message from the array
  function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }
  
  // Get the message box element
  const messageBox = document.getElementById('messageBox');
  
  // Function to update the message
  function updateMessage() {
    messageBox.textContent = getRandomMessage();
    messageBox.classList.add('active');
    // Set a timeout to hide the message box after 10 seconds
    setTimeout(function() {
      messageBox.classList.remove('active');
      // Call the function to update the message again after 10 seconds
      setTimeout(updateMessage, 1000); // 10000 milliseconds = 10 seconds
    }, 10000); // 10000 milliseconds = 10 seconds
  }