let todoList = JSON.parse(localStorage.getItem('todo')) || []

const displayTaskList = () => {
    const todoListHTMLBlock = document.querySelector('.todo__list')

    if (todoList && todoList.length> 0) {
        todoList.sort((a, b) => a.time > b.time ? 1 : -1 )
        todoList.sort((a) => a.isDone === true ? 1 : -1)
        let todoListItems = ''
        for (let item of todoList) {
            todoListItems += `<div class="todo__list__item" time=${item.time}>
                                <span class="task__name">${item.name}</span>
                                <span class="task__status" isDone = ${item.isDone}>${item.isDone ? 'Сделано' : 'Сделать'}</span>
                                <button class="task__delete"><img class="task__delete__img"src="/img/delete.png" alt="Удалить"></button>
                            </div>`
        }
        todoListHTMLBlock.innerHTML = todoListItems
    } else {
        todoListHTMLBlock.innerHTML = `<span class="todo__list__no_elements">Нет никаких дел</span>`
    }
    
    addEventListeners()   
}

const addEventListeners = () => {
    const taskInput = document.querySelector('#todo__add__input')
    if (taskInput) {
        taskInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                createTask(taskInput)
            }
        })
    }
    const addTaskBtn = document.querySelector('.todo__add__button')
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => createTask(taskInput))
    }

    const deleteTaskBtn = document.querySelectorAll('.task__delete');
    deleteTaskBtn.forEach(item => {
        item.addEventListener('click', (e) => {
            const task = e.target.closest('.todo__list__item')
            deleteTask(task)
        } )
    })

    const status = document.querySelectorAll('.task__status');
    status.forEach(item => {
        item.addEventListener('click', (e) => {
            const task = e.target.closest('.todo__list__item')
            changeTaskStatus(task)
        } )
    })
}

const createTask = (input) => {
    if (input.value != '') {
        const newTask = {
            name: input.value,
            time: Date.now(),
            isDone: false
        }
        todoList.push(newTask)
        localStorage.setItem('todo', JSON.stringify(todoList))
        input.value = ''
        displayTaskList()
    }
}

const deleteTask = (deletingTask) => {
    todoList = todoList.filter((task) => task.time != deletingTask.attributes.time.value)
    localStorage.setItem('todo', JSON.stringify(todoList))
    displayTaskList()
}

const changeTaskStatus = (changingTask) => {
    for (let task of todoList) {
        if (task.time == changingTask.attributes.time.value) {
            task.isDone = !task.isDone
        }
    }
    localStorage.setItem('todo', JSON.stringify(todoList))
    displayTaskList()
}

displayTaskList()