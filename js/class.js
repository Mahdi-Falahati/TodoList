// oop
class TODO {
    addToDo(event) {

        // prevent form from submiting
        event.preventDefault();

        if (todoInput.value != "") {
            // todo Div
            const todoDiv = document.createElement("div");

            // add class to todo div
            todoDiv.classList.add("todo");

            // create li
            const newTodo = document.createElement("li");
            newTodo.innerHTML = todoInput.value;
            newTodo.classList.add("todo-item");
            todoDiv.appendChild(newTodo);

            // check mark button
            const completedButton = document.createElement('button');
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);

            // check img mark button
            const imgCompletedButton = document.createElement("img");
            imgCompletedButton.src = "img/icons/check.png";
            imgCompletedButton.classList.add("complete");
            completedButton.appendChild(imgCompletedButton);

            // check trash button
            const trashButton = document.createElement('button');
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);

            // check img trash button
            const imgTrashButton = document.createElement("img");
            imgTrashButton.src = "img/icons/icons8-wastebasket-48.png";
            imgTrashButton.classList.add("trash");
            trashButton.appendChild(imgTrashButton);

            // append
            todoList.appendChild(todoDiv);

            // empty todoInput content 
            todoInput.value = "";

        } else {

            // if input is empty show box shadow
            todoInput.style.boxShadow = "5px 5px 20px red"

            setTimeout(() => {

                todoInput.style.boxShadow = "none"

            }, 1000);

        }

    }

    // delte and comlplete  todo list from page 
    deleteANDcompletedITEM(event) {

        if (event.target.classList.contains('trash')) {

            // add class delete to todo delete for add style and animatins
            event.target.parentElement.parentElement.classList += " delete";

            // remove todo list after 2s 
            setTimeout(() => {

                event.target.parentElement.parentElement.remove()

            }, 2000);

        } else if (event.target.classList.contains("complete")) {

            // add class complete to todo complete for add style and animatins
            if (!event.target.parentElement.parentElement.classList.contains("complete")) {

                event.target.parentElement.parentElement.classList += " completed";

            }
        }
    }
}