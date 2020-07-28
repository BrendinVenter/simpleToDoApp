/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* ==============================================================================
                              *Global Scope Variables*
============================================================================== */

// UI Variables for Task List
const taskAdd = document.querySelector(`.addTask`);
const taskInput = document.querySelector(`#inputTask`);
const taskList = document.querySelector(`#task-collection`);
const taskPlaceholder = document.querySelector(`.list-group-item`);

// Counts & Limits Tasks
let x = 1;

/* ==============================================================================
                              *Functions - To Do List*
============================================================================== */

/* =================================
Local Storage Functions 
================================= */

/* Get Tasks on Load from Local Storage */

function getTasks() {
        let tasks;
        // First Check Local Storage
        if (localStorage.getItem(`tasks`) === null) {
                tasks = []; // Empty Array List of Tasks in Local Storage
        } else {
                tasks = JSON.parse(localStorage.getItem(`tasks`)); // Non-Empty Array List of Tasks in Local Storage
        }

        // The Add List Items Back In
        tasks.forEach(task => {
                // Variables
                let listItem = document.createElement(`li`);
                let listItemRemoveLink = document.createElement(`a`);
                let listItemRemoveIcon = document.createElement(`i`);
                let listItemDoneLink = document.createElement(`a`);
                let listItemDoneIcon = document.createElement(`i`);

                // eslint-disable-next-line no-constant-condition
                if (true) {
                        // Create List Item & Add Classes
                        listItem.classList.add(`list-group-item`);
                        listItemRemoveLink.classList.add(
                                `list-group-links`,
                                `list-group-link-remove`,
                                `list-group-link-remove:hover`
                        );
                        listItemRemoveIcon.classList.add(
                                `far`,
                                `fa-trash-alt`,
                                `list-group-icon`,
                                `list-group-icon-remove`
                        );
                        listItemDoneLink.classList.add(
                                `list-group-links`,
                                `list-group-link-done`,
                                `list-group-link-done:hover`
                        );
                        listItemDoneIcon.classList.add(`fas`, `fa-check`, `list-group-icon`, `list-group-icon-done`);

                        // Add Input Text To List Item
                        listItem.textContent = task;

                        // Add Icons To List Item
                        listItem.appendChild(listItemRemoveLink);
                        listItemRemoveLink.appendChild(listItemRemoveIcon);
                        listItem.appendChild(listItemDoneLink);
                        listItemDoneLink.appendChild(listItemDoneIcon);

                        //       Replace, Add List Item To Page
                        if (x <= 6) {
                                taskList.replaceChild(listItem, taskList.children[x]); // replaces current items
                                x += 1;
                        } else if (x <= 10) {
                                taskList.appendChild(listItem); // adds 4 new items to the list
                                x += 1;
                        } else {
                                alert(`The curren task limit is 10.`);
                        }
                }
        });
}

/* Local Storage Store Task Function */

function storeTaskInLocalStorage(task) {
        let tasks; // new array

        // First Check Local Storage for Items - List Default

        if (localStorage.getItem(`tasks`) === null) {
                tasks = []; // Empty Array List of Tasks in Local Storage
        } else {
                tasks = JSON.parse(localStorage.getItem(`tasks`)); // Non-Empty Array List of Tasks in Local Storage

                // Then Add Current Task from Parameter
                tasks.push(task);

                // And Add New Task to Array List and Put Back Into Local Storage

                localStorage.setItem(`tasks`, JSON.stringify(tasks));
        }
}

/* Local Storage Remove Function */

function removeTaskFromLocalStorage(taskItem) {
        let tasks; // array

        // First Check Local Storage

        if (localStorage.getItem(`tasks`) === null) {
                tasks = []; // Empty Array List of Tasks in Local Storage
        } else {
                tasks = JSON.parse(localStorage.getItem(`tasks`)); // Non-Empty Array List of Tasks in Local Storage
        }

        // Removes Task by Index from Tasks Array
        tasks.forEach((task, index) => {
                if (taskItem.textContent === task) {
                        tasks.splice(index, 1);
                }
        });

        // Add Editted Array List Back Into Local Storage

        localStorage.setItem(`tasks`, JSON.stringify(tasks));
}

/* =================================
Task List Functions 
================================= */

/* Add Task Function */

function addTask(e) {
        // Variables for Elements
        let listItem = document.createElement(`li`);
        let listItemRemoveLink = document.createElement(`a`);
        let listItemRemoveIcon = document.createElement(`i`);
        let listItemDoneLink = document.createElement(`a`);
        let listItemDoneIcon = document.createElement(`i`);

        // Logic

        if (taskInput.value === ``) {
                alert(`Please add a task`); // alerts user of empty input
        } else {
                // Create List Item & Add Classes
                listItem.classList.add(`list-group-item`);
                listItemRemoveLink.classList.add(
                        `list-group-links`,
                        `list-group-link-remove`,
                        `list-group-link-remove:hover`
                );
                listItemRemoveIcon.classList.add(`far`, `fa-trash-alt`, `list-group-icon`, `list-group-icon-remove`);
                listItemDoneLink.classList.add(
                        `list-group-links`,
                        `list-group-link-done`,
                        `list-group-link-done:hover`
                );
                listItemDoneIcon.classList.add(`fas`, `fa-check`, `list-group-icon`, `list-group-icon-done`);

                // Add Input Text To List Item
                listItem.textContent = taskInput.value;

                // Add Icons To List Item
                listItem.appendChild(listItemRemoveLink);
                listItemRemoveLink.appendChild(listItemRemoveIcon);
                listItem.appendChild(listItemDoneLink);
                listItemDoneLink.appendChild(listItemDoneIcon);

                //       Replace, Add List Item To Page
                if (x <= 6) {
                        taskList.replaceChild(listItem, taskList.children[x]); // replaces current items
                        x += 1;
                        // Store in Local Storage
                        storeTaskInLocalStorage(taskInput.value);
                } else if (x <= 10) {
                        taskList.appendChild(listItem); // adds 4 new items to the list
                        x += 1;
                        // Store in Local Storage
                        storeTaskInLocalStorage(taskInput.value);
                } else {
                        alert(`The current task limit is 10.`);
                }

                // Clear Input

                taskInput.value = ``;
        }

        e.preventDefault(); // prevents reload
}

/* Max Char Reached Function */

function charAlert(e) {
        if (taskInput.value.length >= 10) {
                alert(`Whoa! We currently only allow 20 characters per task.`);
        }
}

/* Remove Task Function */

function removeTask(e) {
        // Variables

        let listItem = document.createElement(`li`);

        // Add Classes
        listItem.classList.add(`list-group-item`);

        // Logic
        // Link Target
        if (e.target.parentElement.classList.contains(`list-group-link-remove`)) {
                if (x <= 7) {
                        if (confirm(`Are you sure?`)) {
                                e.target.parentElement.parentElement.remove();
                                taskList.appendChild(listItem); // Adding Original Elements Back
                                x -= 1;

                                // Remove from Local Storage
                                removeTaskFromLocalStorage(e.target.parentElement.parentElement);
                        } else if (e.target.firstElementChild.classList.contains(`list-group-icon-remove`)) {
                                if (confirm(`Are you sure?`)) {
                                        e.target.parentElement.remove();
                                        taskList.appendChild(listItem); // Adding Original Elements Back
                                        x -= 1;

                                        // Remove from Local Storage
                                        removeTaskFromLocalStorage(e.target.parentElement);
                                }
                        }
                }
                if (x > 7) {
                        if (confirm(`Are you sure?`)) {
                                e.target.parentElement.parentElement.remove();
                                x -= 1;

                                // Remove from Local Storage
                                removeTaskFromLocalStorage(e.target.parentElement.parentElement);
                        } else if (e.target.firstElementChild.classList.contains(`list-group-icon-remove`)) {
                                if (confirm(`Are you sure?`)) {
                                        e.target.parentElement.remove();
                                        x -= 1;

                                        // Remove from Local Storage
                                        removeTaskFromLocalStorage(e.target.parentElement);
                                }
                        }
                }
        }
}

/* Complete Task Function */

function completeTask(e) {
        // Variables

        let listItem = document.createElement(`li`);

        // Add Classes
        listItem.classList.add(`list-group-item`);

        // Logic

        if (e.target.parentElement.classList.contains(`list-group-link-done`)) {
                if (x <= 7) {
                        if (confirm(`Are you sure?`)) {
                                e.target.parentElement.parentElement.remove();
                                taskList.appendChild(listItem); // Adding Original Elements Back
                                x -= 1;

                                // Remove from Local Storage
                                removeTaskFromLocalStorage(e.target.parentElement.parentElement);
                        } else if (e.target.firstElementChild.classList.contains(`list-group-icon-done`)) {
                                if (confirm(`Are you sure?`)) {
                                        e.target.parentElement.remove();
                                        taskList.appendChild(listItem); // Adding Original Elements Back
                                        x -= 1;

                                        // Remove from Local Storage
                                        removeTaskFromLocalStorage(e.target.parentElement);
                                }
                        }
                }
                if (x > 7) {
                        if (confirm(`Are you sure?`)) {
                                e.target.parentElement.parentElement.remove();
                                x -= 1;

                                // Remove from Local Storage
                                removeTaskFromLocalStorage(e.target.parentElement.parentElement);
                        } else if (e.target.firstElementChild.classList.contains(`list-group-icon-done`)) {
                                if (confirm(`Are you sure?`)) {
                                        e.target.parentElement.remove();
                                        x -= 1;

                                        // Remove from Local Storage
                                        removeTaskFromLocalStorage(e.target.parentElement);
                                }
                        }
                }
        }
}

/* ==============================================================================
                              *Event Listeners*
============================================================================== */

// Load All Event Listeners - Function
function loadEventListeners() {
        // DOM Load Event
        document.addEventListener(`DOMContentLoaded`, getTasks);

        // Add Task Submit & Click Event
        taskAdd.addEventListener(`click`, addTask);
        taskAdd.addEventListener(`submit`, addTask);

        // Max Char. Reached Event
        taskInput.addEventListener(`input`, charAlert);

        // Remove Task Event
        taskList.addEventListener(`click`, removeTask);

        // Complete Task Event
        taskList.addEventListener(`click`, completeTask);
}

// load All event Listeners - Execute

loadEventListeners();

/* ==============================================================================
                              *Theme Selector*
============================================================================== */

// Local Storage

let theme = localStorage.getItem(`theme`);

// Theme Function & Events

let themeDots = document.getElementsByClassName(`theme-dot`);

function setTheme(mode) {
        if (mode === `darkBlue`) {
                document.getElementById(`theme-style`).href = `css/main.css`;
        }

        if (mode === `blackYellow`) {
                document.getElementById(`theme-style`).href = `css/blackYellow.css`;
        }

        if (mode === `purplePink`) {
                document.getElementById(`theme-style`).href = `css/purplePink.css`;
        }

        if (mode === `blueYellow`) {
                document.getElementById(`theme-style`).href = `css/blueYellow.css`;
        }

        localStorage.setItem(`theme`, mode);
}

// eslint-disable-next-line no-plusplus
for (let index = 0; themeDots.length > index; index++) {
        themeDots[index].addEventListener(`click`, function() {
                let { mode } = this.dataset;

                setTheme(mode);
        });
}

// Theme Function

if (theme === null) {
        setTheme(`darkBlue`);
} else {
        setTheme(theme);
}
