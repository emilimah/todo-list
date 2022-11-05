window.onload = () => {
    const sortingBtn = document.querySelector("#sorting-button"),
        todoList = document.querySelector(".todo-list"),
        addBtn = document.querySelector("#add-button");
    let todoListValues = [],
        todoInputs,
        todoItems;

    sortingBtn.src = "icons/sorting-a.png";

    function getValues() {
        todoListValues = [];
        todoInputs = document.querySelectorAll('.todo-input');

        for (let i = 0; i < todoInputs.length; i++) {
            todoListValues[i] = todoInputs[i].value;
        }
    }

    function getItems() {
        todoItems = document.querySelectorAll(".todo-item");
    }

    function sorting() {
        getValues();

        if (todoListValues.length > 1 && todoListValues.some(elem => elem)) {
            sortingBtn.style.opacity = "1";
            todoListValues.sort();

            if (!sortingBtn.classList.contains("sort-a")) {
                sortingBtn.classList.remove("sort-z");
                sortingBtn.classList.add("sort-a");
                sortingBtn.src = "icons/sorting-a.png";
            } else {
                sortingBtn.classList.remove("sort-a");
                sortingBtn.classList.add("sort-z");
                sortingBtn.src = "icons/sorting-z.png";
                todoListValues.reverse();
            }

            for (let i = 0; i < todoListValues.length; i++) {
                todoInputs[i].value = todoListValues[i];
            }
        }
    }

    function deleteTodo(e) {
        let elem = e.target;

        if (!elem.classList.contains("todo-delete")) {
            return
        } else {
            getItems();
            let todoInput = elem.previousElementSibling;
            if (todoItems.length > 1) {
                elem.parentNode.remove();
            } else {
                todoInput.value = "";
                todoInput.focus();
            }

            if (todoItems.length - 1 == 1) {
                sortingBtn.classList.remove("sort-a");
                sortingBtn.classList.remove("sort-z");
                sortingBtn.style.opacity = ".3";
                sortingBtn.src = "icons/sorting-a.png";
            }
        }
    }

    function createNewTodo() {
        let newTodo = document.querySelector(".todo-item").cloneNode(true),
            todoInput = newTodo.childNodes[1];
        todoInput.value = "";

        todoList.appendChild(newTodo);

        todoInput.focus();
        getItems();
    }

    todoList.addEventListener("dragstart", (e) => {
        e.target.classList.add("selected");
    });

    todoList.addEventListener("dragend", (e) => {
        e.target.classList.remove("selected");
    });

    todoList.addEventListener("dragover", (e) => {
        e.preventDefault();

        const activeElement = todoList.querySelector(".selected");
        const currentElement = e.target;
        const isMoveable = activeElement !== currentElement &&
            currentElement.classList.contains("todo-item");

        if (!isMoveable) {
            return;
        }

        const nextElement = (currentElement === activeElement.nextElementSibling) ?
            currentElement.nextElementSibling :
            currentElement;

        todoList.insertBefore(activeElement, nextElement);
    });

    sortingBtn.addEventListener("click", sorting);
    todoList.addEventListener("click", e => deleteTodo(e));
    addBtn.addEventListener("click", createNewTodo);
}