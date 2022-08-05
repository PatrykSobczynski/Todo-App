const addBar = document.querySelector(".addInput");
const addButton = document.querySelector(".addButton");
const tasks = document.querySelector(".tasks");

function addNewTask(value) {
    // if value in bar is null or blank, dont do anythink
    if (value === "") {
        console.log("pusta wartość");
        return;
    } else {
        // Date, when task was added
        const date = new Date();

        // New Task created
        const newTask = document.createElement("div");
        newTask.classList.add("task");

        // creating elements inside new task
        const pValue = document.createElement("p");
        const tEdit = document.createElement("i");
        const tDone = document.createElement("i");
        const tDelete = document.createElement("i");
        const pDate = document.createElement("p");

        // adding class to new elements
        pValue.classList.add("taskContent");
        tEdit.classList.add("editTask", "fa-solid", "fa-pen-to-square")
        tDone.classList.add("taskDone", "fa-solid", "fa-check");
        tDelete.classList.add("deleteTask", "fa-solid", "fa-xmark");
        pDate.classList.add("dateTaskAdded");

        pValue.innerHTML = value
        pDate.textContent = `${("0" + date.getDate()).slice(-2)}.${("0" + date.getMonth()).slice(-2)}.${date.getFullYear()}`;

        tasks.appendChild(newTask);
        newTask.appendChild(pValue);
        newTask.appendChild(tEdit);
        newTask.appendChild(tDone);
        newTask.appendChild(tDelete);
        newTask.appendChild(pDate);

        addBar.value = "";

        tEdit.addEventListener("click", () => {
            editTask(newTask, pValue, value);
        })

        tDone.addEventListener("click", () => {
            pValue.classList.toggle("taskFinished");
            tDone.classList.toggle("taskFinished-btn");
        });

        tDelete.addEventListener("click", () => {
            tasks.removeChild(newTask);
        })
    }
}

function editTask(task, contentToModify, content) {

    contentToModify.innerHTML = `
            <form>
            <input class = "newValue" value="${content}">
            <input class = "submitButton" type="submit" value="Modify">
            </form>`;

    const submitButton = document.querySelector(".submitButton");
    const newValue = document.querySelector(".newValue");

    submitButton.addEventListener("click", (e) => {
        contentToModify.innerHTML = newValue.value;
        if (contentToModify.innerHTML === "") {
            tasks.removeChild(task);
        }
        e.preventDefault();
    })
}

addButton.addEventListener("click", (e) => {
    addNewTask(addBar.value);
    e.preventDefault();
});


// todo
// Memory in local storage
// Task list is downloadable
// Animation after task deleted/finished
// Maybe, if is only 1 task, bottom-border doeasn't exist

// bugs
// if you edited task, and you want to edit it again,
// you will see old content value on modify-area
