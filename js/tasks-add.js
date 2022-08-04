const addBar = document.querySelector(".addInput");
const addButton = document.querySelector(".addButton");
const tasks = document.querySelector(".tasks");

// const editTask = document.querySelector(".editTask");
// const taskDone = document.querySelector(".taskDone");
// const deleteTask = document.querySelector(".deleteTask");

function addNewTask(value) {
    if (value === "") {
        console.log("pusta wartość");
        return;
    } else {
        console.log(value);

        const date = new Date();
        const task = document.createElement("div");
        task.classList.add("task");
        task.innerHTML =
            `<p class="taskContent">${value}</p>
            <i class="editTask fa-solid fa-pen-to-square"></i>
            <i class="taskDone fa-solid fa-check"></i>
            <i class="deleteTask fa-solid fa-xmark"></i>
            <p class="dateTaskAdded">
                ${("0" + date.getDate()).slice(-2)}.${("0" + date.getMonth()).slice(-2)}.${date.getFullYear()}
            </p>`;

        tasks.appendChild(task);
        addBar.value = "";
    }
}

addButton.addEventListener("click", (e) => {
    addNewTask(addBar.value);
    e.preventDefault();
});

// todo
// All buttons on task, modify, finished, delete
