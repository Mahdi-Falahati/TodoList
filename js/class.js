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

            // add  todo in local storage 
            this.AddToLocalStorage(todoInput.value);

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

            // delete todo from local storage
            let delete_todo_content = event.target.parentElement.parentElement.firstElementChild.innerHTML;
            this.removeTodoListFromLocalStorage(delete_todo_content)

            // remove todo list after 2s 
            setTimeout(() => {
                event.target.parentElement.parentElement.remove()
            }, 2000);

        } else if (event.target.classList.contains("complete")) {

            // add class complete to todo complete for add style and animatins
            if (!event.target.parentElement.parentElement.classList.contains("complete")) {

                event.target.parentElement.parentElement.classList += " completed";

                // add todo to loacalstorage as complete todo
                let todoComplete = event.target.parentElement.parentElement.firstElementChild.innerHTML;
                this.completeLocalStorage(todoComplete)
            }

        }

    }

    // show todo list width filters all,complete,uncomplete
    selectOptions(event) {

        //selctors
        let Complete = document.querySelectorAll(".completed");
        let unComplete = document.querySelectorAll(".todo");
        // filter all and show all todo lists
        if (event.target.value == "all") {
            for (let todo of unComplete) {
                todo.style.display = "flex";
            }
            // filter uncomplete for show unomplete todo lists 
        } else if (event.target.value == "unCompleted") {

            for (let todo of unComplete) {
                todo.style.display = "flex";
            }
            for (let com of Complete) {
                com.style.display = "none";
            }

            // filter complte for show complete todo lists
        } else if (event.target.value == "completed") {
            Complete.forEach(element => {
                element.style.display = "flex";
            });

            unComplete.forEach(element => {
                if (element.classList.value == "todo") {
                    element.style.display = "none"
                }
            });

        }
    }

    AddToLocalStorage(todo) {

        // check content local storage if note empty get contents
        let todos = this.checkExistItemInLocalStorage()

        // push note to add array for adding to localstorage
        todos.push(todo.trim());

        // change todos array to todos string for adding to lacal storage
        // add new todos to local storage
        localStorage.setItem("ToDoLists", JSON.stringify(todos))

    }

    checkExistItemInLocalStorage() {
        let notes;

        // get content from localstorage
        let ToDoLists = localStorage.getItem("ToDoLists");

        //if empty local storage key ToDoLists return notes varibel empty array
        if (ToDoLists === null) {
            notes = [];
        } else {
            // else not empty local storage ket ToDoLists pase to JSON
            notes = JSON.parse(ToDoLists);
        }

        return notes
    }

    removeTodoListFromLocalStorage(deleteTodo) {

       //get content for key ToDoLists from localstorage if not empty get content
        let todos = this.checkExistItemInLocalStorage();
        // find delete todo for removing delete todo from localstorage
        todos.forEach((element, index) => {
            if (element.split(" ")[0] == deleteTodo.trim()) {
                todos.splice(index, 1);
            }
        });

        // set new todolists in local storage 
        localStorage.setItem("ToDoLists", JSON.stringify(todos))
    }

    // after loaded page load todos from localstorageL
    LoadingTodosOFLocalstorege() {

        //get content OF localstorege for show in page
        let todos = this.checkExistItemInLocalStorage();

        todos.forEach(element => {
            // todo Div
            const todoDiv = document.createElement("div");

            // add class to todo div
            todoDiv.classList.add("todo");

            // create li
            const newTodo = document.createElement("li");
            // check is complete item or not
            let count = 0;
            if (element.includes("COMPLETETODO")) {
                newTodo.innerHTML = element.replace("COMPLETETODO", "");
                count = 1;
            } else {
                newTodo.innerHTML = element;
            }
            newTodo.classList.add("todo-item");

            // if complete todo add class 
            if (count == 1) {
                todoDiv.appendChild(newTodo);
                todoDiv.classList = "todo completed";
            } else {
                todoDiv.appendChild(newTodo);
            }

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


        })
    }

    completeLocalStorage(todoComplete) {
        // get content OF local storage
        let todos = this.checkExistItemInLocalStorage();

        todos.forEach((element, index) => {
            if (element === todoComplete) {
                todos[index] = element + " COMPLETETODO";
            }
        })

        localStorage.setItem("ToDoLists", JSON.stringify(todos));
    }
}