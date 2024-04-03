const init = () => {
    const todoListHTMLBlock = document.querySelector('.todo__list')
    const todoListStorage = JSON.parse(localStorage.getItem('todo'))
    
    if (todoListStorage) {
        console.log(todoListStorage)
        let todoListItems = ''
        for (let item of todoListStorage) {
            todoListItems += item
        }
        todoListHTMLBlock.innerHTML = todoListItems
    } else {
        todoListHTMLBlock.innerHTML = `<span class="todo__list__no_elements">Нет никаких дел</span>`
    }
    const newTaskInput = document.querySelector('#todo__add__input')
    if (newTaskInput) {
        newTaskInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                createTask(newTaskInput)
            }
        })
    }
    const addTaskButton = document.querySelector('.todo__add__button')
    if (addTaskButton) {
        addTaskButton.addEventListener('click', () => createTask(newTaskInput))
    }
}

const createTask = (input) => {
    if (input.value != '') {
        const newTask = `<div class="todo__list__item">
                            <span class="task__name">${input.value}</span>
                            <select class="task__status" size="1">
                                <option value="active">Не сделано</option>
                                <option value="done">Сделано</option>
                            </select>
                            <button>Удалить</button>
                        </div>`
        const todoList = JSON.parse(localStorage.getItem('todo')) || []
        todoList.push(newTask)
        localStorage.setItem('todo', JSON.stringify(todoList))
        input.value = ''
        init()
    }
}



init()

let arr = []
