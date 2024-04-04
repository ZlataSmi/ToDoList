const displayTaskList = () => {
    const todoListHTMLBlock = document.querySelector('.todo__list')
    const todoListStorage = JSON.parse(localStorage.getItem('todo'))

    if (todoListStorage && todoListStorage.length> 0) {
        todoListStorage.sort((a) => a.includes('isdone="true"') ? 1 : -1)
        let todoListItems = ''
        for (let item of todoListStorage) {
            todoListItems += item
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
        const todoList = JSON.parse(localStorage.getItem('todo')) || []
        const newTask = `<div class="todo__list__item" id=${Date.now()}>
                            <span class="task__name">${input.value}</span>
                            <span class="task__status" isdone = false>Не выполнено</span>
                            <button class="task__delete">Удалить</button>
                        </div>`
        todoList.push(newTask)
        localStorage.setItem('todo', JSON.stringify(todoList))
        input.value = ''
        displayTaskList()
    }
}

const deleteTask = (deletingTask) => {
    let todoList = JSON.parse(localStorage.getItem('todo'))
    todoList = todoList.filter((task) => !task.includes(deletingTask.id))
    localStorage.setItem('todo', JSON.stringify(todoList))
    displayTaskList()
}

const changeTaskStatus = (changingTask) => {
    let todoList = JSON.parse(localStorage.getItem('todo'))
    let taskIndex = todoList.findIndex((task) => task.includes(changingTask.id))
    let status = changingTask.querySelector('.task__status')
    if (status.getAttribute('isdone') == 'false') {
        status.innerHTML = 'Выполнено'
        status.setAttribute('isdone', 'true')
    } else {
        status.innerHTML = 'Не выполнено'
        status.setAttribute('isdone', 'false')
    }
    todoList[taskIndex] = changingTask.outerHTML 
    localStorage.setItem('todo', JSON.stringify(todoList))
    displayTaskList()
}

displayTaskList()