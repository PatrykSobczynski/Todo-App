const addBar = document.querySelector(".addInput");
const addButton = document.querySelector(".addButton");
const tasks = document.querySelector(".tasks");

// TaskInfo actions
const taskAdded = document.querySelector(".taskAddedConfirm");
const taskEdit = document.querySelector(".taskEditConfirm");
const taskDone = document.querySelector(".taskDoneConfirm");
const taskDeleted = document.querySelector(".taskDeletedConfirm");


function addNewTask(value) {
    // if value in bar is null or blank, dont do anythink
    if (value === "") {
        console.log("pusta wartość");
        return;
    } else {
        // Date, when task was added
        const date = new Date();

        // New Task creating
        const newTask = document.createElement("div");
        newTask.classList.add("task");

        // Creating elements inside new task
        const pValue = document.createElement("p");
        const tEdit = document.createElement("i");
        const tDone = document.createElement("i");
        const tDelete = document.createElement("i");
        const pDate = document.createElement("p");

        // Adding class to new elements
        pValue.classList.add("taskContent");
        tEdit.classList.add("editTask", "fa-solid", "fa-pen-to-square")
        tDone.classList.add("taskDone", "fa-solid", "fa-check");
        tDelete.classList.add("deleteTask", "fa-solid", "fa-xmark");
        pDate.classList.add("dateTaskAdded");

        pValue.innerHTML = value
        pDate.textContent = `${("0" + date.getDate()).slice(-2)}.${("0" + date.getMonth()).slice(-2)}.${date.getFullYear()}`;

        // Adding elements to newTask div
        tasks.appendChild(newTask);
        newTask.appendChild(pValue);
        newTask.appendChild(tEdit);
        newTask.appendChild(tDone);
        newTask.appendChild(tDelete);
        newTask.appendChild(pDate);

        // Clearing input
        addBar.value = "";

        // Animations
        taskInfo(taskAdded);
        AddTaskAnimation(newTask);

        // Do somethink after click
        tEdit.addEventListener("click", () => {
            editTask(newTask, pValue, value);
            // TaskInfo edited below, on modify button
        })

        tDone.addEventListener("click", () => {
            pValue.classList.toggle("taskFinished");
            tDone.classList.toggle("taskFinished-btn");
            taskInfo(taskDone);
        });

        tDelete.addEventListener("click", () => {
            newTask.style.animation = "taskRemoveAnimation .6s linear both"
            setTimeout(() => {
                tasks.removeChild(newTask);
                taskInfo(taskDeleted);
            }, 650);
        })
    }
}

function editTask(task, contentToModify, content) {

    // Editing tasks from
    contentToModify.innerHTML = `
            <form>
            <input class = "newValue" value="${content}">
            <input class = "submitButton" type="submit" value="Modify">
            </form>`;

    const submitButton = document.querySelector(".submitButton");
    const newValue = document.querySelector(".newValue");

    submitButton.addEventListener("click", (e) => {
        editTaskAnimation(task);
        setTimeout(() => {
            // Changing task value
            contentToModify.innerHTML = newValue.value;
            content = newValue.value;
        }, 300);

        // If task value is equal null or empty, task will remove
        if (contentToModify.innerHTML === "") {
            tasks.removeChild(task);
            taskInfo(taskDeleted);
        }
        else {
            taskInfo(taskEdit);
        }

        e.preventDefault();
    })
}

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




// todo
// Memory in local storage
// Task list is downloadable
// Maybe, use only 1 info div, and after click, change the textContent and add/remove class

// bugs
// 1. if you edited task, and you want to edit it again,
// you will see old content value on modify-area

// 2. if there are 2 modify-area open, and you click modify, the page will refresh
