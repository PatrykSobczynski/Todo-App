const addBar = document.querySelector(".addInput");
const addButton = document.querySelector(".addButton");
const tasks = document.querySelector(".tasks");
const ul = document.querySelector(".tasks ul");

// TaskInfo actions
const taskAdded = document.querySelector(".taskAddedConfirm");
const taskEdit = document.querySelector(".taskEditConfirm");
const taskDone = document.querySelector(".taskDoneConfirm");
const taskDeleted = document.querySelector(".taskDeletedConfirm");

let tasksList = JSON.parse(localStorage.getItem("Task")) || [];

const date = new Date();

// Task class object
class Task {
    constructor(value, date) {
        this.value = value;
        this.date = date;
        this.isDone = false;
    }
}

function addNewTask(value) {
    if (value === "") {
        console.log("empty value");
        return;
    } else {
        const date = new Date();
        const taskCreatedDate = `
            <span class="time">${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}</span>
            <span class="date">${("0" + date.getDate()).slice(-2)}.${("0" + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}</span>`;

        // Automaticly adding dot
        const val = value[value.length - 1];
        if (val != "." && val != "!" && val != "?") {
            value += ".";
        }

        const createTask = new Task(value, taskCreatedDate);
        tasksList.push(createTask);

        addBar.value = "";

        // Save task in browser's memory
        localStorage.setItem("Task", JSON.stringify(tasksList))

        ShowList(tasksList, ul);

        // Animations
        taskInfo(taskAdded);
        // AddTaskAnimation(task);

    }
}

function ShowList(tasks = [], tasksHolder) {
    tasksHolder.innerHTML = tasks.map((task, i) => {
        return `
        <li class="task task-active" data-id=${i}>
            <p class="taskContent ${task.isDone ? 'taskFinished' : ''}">${task.value}</p>
            <div class="optionsDiv">
                <i class="editTask fa-solid fa-pen-to-square"></i>
                <i class="taskDone ${task.isDone ? 'taskFinished-btn' : ''} fa-solid fa-check"></i>
                <i class="deleteTask fa-solid fa-xmark"></i>
                <p class="dateTaskAdded">${task.date}</p>
            </div>
        </li>`
    }).join('');
}

function changeTaskStatus(e) {
    const elementParent = e.target.parentElement.parentElement;
    const id = elementParent.dataset.id;

    tasksList[id].isDone = !tasksList[id].isDone;
    localStorage.setItem("Task", JSON.stringify(tasksList));

    console.log(tasksList[id].value, tasksList[id].isDone);

    ShowList(tasksList, ul);
    taskInfo(taskDone);
}

function deleteTask(e) {
    const elementParent = e.target.parentElement.parentElement;
    const id = elementParent.dataset.id;

    elementParent.style.animation = "taskRemoveAnimation .6s linear both";

    setTimeout(() => {
        // second param is 1, because we want to delete only one element
        tasksList.splice(id, 1);

        localStorage.setItem("Task", JSON.stringify(tasksList));

        ShowList(tasksList, ul);
        taskInfo(taskDeleted);
    }, 650);
}

ShowList(tasksList, ul);

const taskStatusBtn = [...document.querySelectorAll(".task .taskDone")];
const taskDeleteBtn = [...document.querySelectorAll(".task .deleteTask")];

taskStatusBtn.forEach(task => {
    task.addEventListener("click", changeTaskStatus);
})

taskDeleteBtn.forEach(task => {
    task.addEventListener("click", deleteTask)
})


// ANIMATIONS ⬇ ⬇ ⬇ ⬇
function taskInfo(taskAction) {
    taskAction.classList.add("taskInfo-active");
    setTimeout(() => {
        taskAction.classList.remove("taskInfo-active");
    }, 1200);
}

function AddTaskAnimation(task) {
    setTimeout(() => {
        task.classList.add("task-active");
    }, 100);
}

function editTaskAnimation(task) {
    task.style.opacity = 0;
    setTimeout(() => {
        task.style.opacity = 1.0;
    }, 500);
}

addButton.addEventListener("click", (e) => {
    addNewTask(addBar.value);
    e.preventDefault();
});


// Tasks to PDF
function downloadTasks() {
    const options = {
        margin: 10,
        filename: "Tasks.pdf",
    }
    const taskList = document.querySelectorAll(".task .taskContent");
    const downloadList = ["Tasks: "];

    taskList.forEach(task => {
        downloadList.push(task.textContent);
    })

    // const listJoined = downloadList.join("\n");
    const listJoined = downloadList.join(" ");

    console.log(listJoined);
    window.html2pdf().set(options).from(listJoined).save();
}

const downloadTasksBtn = document.querySelector(".downloadTasks");
downloadTasksBtn.addEventListener("click", downloadTasks);

// todo
// Edit task function
// PDF downloader - new line brake doens't work in html2pdf. Figure out something
// Maybe, use only 1 info div, and after click, change the textContent and add/remove class

// bugs
// 1. (If you added new task) Before task will be clicable, you need refresh website.
// 2. You can only one time click button, if you want to click again it doesn't work
//      untill you refresh the website
