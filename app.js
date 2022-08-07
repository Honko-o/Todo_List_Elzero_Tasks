const taskList = document.querySelector('.tasks');
const taskForm = document.querySelector('form');
const taskInput = document.getElementById('task-input');
const deleteAllTasksBtn = document.querySelector('.delete-all-tasks');
const finishAllTasksBtn = document.querySelector('.finish-all-tasks');
let completedTasksSpan = document.querySelector('.completed-tasks span');
let countTasksSpan = document.querySelector('.count-tasks span');
let tasksArray = [];

taskInput.focus();
/*
    [1] Get Tasks Array => tasksArray
    [2] Loop Over and Generate The DOM
*/
if (localStorage.getItem('tasks')) {
    tasksArray = localStorage.getItem('tasks').split(',');
    console.log(tasksArray);
    // Generate DOM
    tasksArray.forEach((taskVal) => {
        const task = document.createElement('li');
        const taskText = document.createTextNode(taskVal);
        const deleteIcon = document.createElement('i');
        const deleteIconSpan = document.createElement('span');
        // Add Classes
        task.classList.add('task-box');
        deleteIcon.classList.add('fa-solid', 'fa-xmark');
        deleteIconSpan.classList.add('delete-icon');
        // Add Children
        task.append(taskText);
        deleteIconSpan.append(deleteIcon);
        console.log(task);
        task.append(deleteIconSpan);

        taskList.append(task);
    });
}

// Add Task
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (
        taskInput.value.trim() !== '' &&
        !tasksArray.includes(taskInput.value.trim())
    ) {
        generateTask(taskInput.value);
        localStorage.setItem('tasks', tasksArray);
        countTasks();

        taskInput.value = '';

        taskInput.focus();
    } else {
        swal('Enter a Valid Task', '', 'warning');
    }
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('fa-xmark')) {
        let targetIndex = tasksArray.findIndex(
            (el) => el === event.target.parentElement.parentElement.innerText
        );
        console.log(targetIndex);
        tasksArray.splice(targetIndex, 1);
        event.target.parentElement.parentElement.remove();
        countTasks();
        localStorage.setItem('tasks', tasksArray);
    }

    if (event.target.parentElement.classList.contains('fa-xmark')) {
        let targetIndex = tasksArray.findIndex(
            (el) =>
                el ===
                event.target.parentElement.parentElement.parentElement.innerText
        );
        console.log(targetIndex);
        tasksArray.splice(targetIndex, 1);
        console.log(tasksArray);
        event.target.parentElement.parentElement.parentElement.remove();
        countTasks();
        localStorage.setItem('tasks', tasksArray);
    }

    if (event.target.classList.contains('task-box')) {
        event.target.classList.toggle('completed');
        countTasks();
        localStorage.setItem('tasks', tasksArray);
    }

    if (event.target.classList.contains('delete-all-tasks')) {
        [...document.querySelectorAll('.tasks li')].forEach((task) =>
            task.remove()
        );
        tasksArray = [];
        countTasks();
        localStorage.setItem('tasks', tasksArray);
    }

    if (event.target.classList.contains('finish-all-tasks')) {
        [...document.querySelectorAll('.tasks li')].forEach((task) =>
            task.classList.add('completed')
        );
        countTasks();
        localStorage.setItem('tasks', tasksArray);
    }
});

// FUNCTIONS HERE
function countTasks() {
    countTasksSpan.innerText = document.querySelectorAll('li').length;
    completedTasksSpan.innerText =
        document.querySelectorAll('li.completed').length;
}

function generateTask(taskVal) {
    const task = document.createElement('li');
    const taskText = document.createTextNode(taskVal);
    const deleteIcon = document.createElement('i');
    const deleteIconSpan = document.createElement('span');

    // Add Classes
    task.classList.add('task-box');
    deleteIcon.classList.add('fa-solid', 'fa-xmark');
    deleteIconSpan.classList.add('delete-icon');

    // Add Children
    task.append(taskText);
    deleteIconSpan.append(deleteIcon);
    task.append(deleteIconSpan);
    taskList.append(task);

    tasksArray.push(taskText.data);
}
