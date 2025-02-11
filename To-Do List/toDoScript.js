// Select elements
const input = document.querySelector('#taskInput');
const addButton = document.querySelector('#addTask');
const taskList = document.querySelector('#taskList');

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add a new task when the button is clicked
addButton.addEventListener('click', addTask);

function addTask() {
    const taskText = input.value.trim();

    if (taskText) {
        // Create and display the task item
        const taskItem = createTaskElement(taskText);

        // Append the task item to the list
        taskList.appendChild(taskItem);

        // Save the task to local storage
        saveTaskToLocalStorage(taskText);

        // Clear the input field
        input.value = '';
    }
}

function createTaskElement(taskText) {
    // Create a new list item
    const taskItem = document.createElement('li');

    // Create the completion button
    const completeBtn = document.createElement('div');
    completeBtn.classList.add('complete-btn');
    taskItem.appendChild(completeBtn);

    // Add the task text span
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskItem.appendChild(taskSpan);

    // Add task completion event
    completeBtn.addEventListener('click', () => {
        taskSpan.classList.toggle('completed-text');
        completeBtn.classList.toggle('completed');
        updateTaskCompletionInStorage(taskText);
    });

    // Add an Edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-btn');
    taskItem.appendChild(editButton);
    editButton.addEventListener('click', () => editTask(taskSpan));

    // Add a Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    taskItem.appendChild(deleteButton);
    deleteButton.addEventListener('click', () => deleteTask(taskItem, taskText));

    return taskItem;
}

function editTask(taskSpan) {
    const newTaskText = prompt('Edit your task:', taskSpan.textContent);
    if (newTaskText && newTaskText.trim() !== '') {
        const oldTaskText = taskSpan.textContent;
        taskSpan.textContent = newTaskText.trim();
        updateTaskInLocalStorage(oldTaskText, newTaskText);
    }
}

function deleteTask(taskItem, taskText) {
    taskItem.remove();
    removeTaskFromLocalStorage(taskText);
}

function saveTaskToLocalStorage(taskText) {
    const tasks = getTasksFromLocalStorage();
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskCompletionInStorage(taskText) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.find(task => task.text === taskText);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function updateTaskInLocalStorage(oldTaskText, newTaskText) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.find(task => task.text === oldTaskText);
    if (task) {
        task.text = newTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        const taskItem = createTaskElement(task.text);
        if (task.completed) {
            taskItem.querySelector('.complete-btn').classList.add('completed');
            taskItem.querySelector('span').classList.add('completed-text');
        }
        taskList.appendChild(taskItem);
    });
}
