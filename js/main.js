// selctors
const todoInput = document.querySelector(".todo-input"),
    btnInput = document.querySelector("#btn-input"),
    todoList = document.querySelector(".todo-list"),
    ToDo = new TODO(),
    select = document.querySelector(".selected");

// eventlistners
eventListres();

function eventListres() {
    // add todo from input value  to page 
    btnInput.addEventListener("click", function(event) {
        ToDo.addToDo(event)
    });
}