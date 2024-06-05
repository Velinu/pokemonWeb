const taskKey = '@tasks';

// Função para adicionar tarefa
function addTask(event) {
    event.preventDefault(); // Evita o recarregamento da página
    const taskId = new Date().getTime();
    const taskList = document.querySelector('#taskList');

    const form = document.querySelector('#taskForm');
    const formData = new FormData(form);

    const taskTitle = formData.get('title');
    const taskDescription = formData.get('description');

    const li = document.createElement('li');

    li.id = taskId;
    li.innerHTML = `
        <h2>${taskTitle}</h2>
        <p>${taskDescription}</p>
        <button class="edit-btn" title="Editar tarefa" onclick="openEditDialog(${taskId})">✏️</button>
        <button class="delete-btn" title="Excluir tarefa" onclick="deleteTask(${taskId})">❌</button>
    `;

    taskList.appendChild(li);

    // Salvar tarefas no localStorage
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
    tasks.push({ id: taskId, title: taskTitle, description: taskDescription });
    localStorage.setItem(taskKey, JSON.stringify(tasks));

    form.reset();
}

// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
    const taskList = document.querySelector('#taskList');
    taskList.innerHTML = tasks
        .map((task) => `
            <li id="${task.id}">
                <h2>${task.title}</h2>
                <p>${task.description}</p>
                <button class="edit-btn" title="Editar tarefa" onclick="openEditDialog(${task.id})">✏️</button>
                <button class="delete-btn" title="Excluir tarefa" onclick="deleteTask(${task.id})">❌</button>
            </li>
        `)
        .join('');
});

// Função para abrir o diálogo de edição
function openEditDialog(taskId) {
    const tasks = JSON.parse(localStorage.getItem(taskKey));
    const task = tasks.find(task => task.id === taskId);

    document.querySelector('#editTaskId').value = taskId;
    document.querySelector('#editTitle').value = task.title;
    document.querySelector('#editDescription').value = task.description;

    document.querySelector('#editDialog').showModal();
}

// Função para fechar o diálogo de edição
function closeEditDialog() {
    document.querySelector('#editDialog').close();
}

// Função para editar tarefa
function editTask(event) {
    event.preventDefault();

    const taskId = document.querySelector('#editTaskId').value;
    const taskTitle = document.querySelector('#editTitle').value;
    const taskDescription = document.querySelector('#editDescription').value;

    const tasks = JSON.parse(localStorage.getItem(taskKey));
    const taskIndex = tasks.findIndex(task => task.id == taskId);

    tasks[taskIndex].title = taskTitle;
    tasks[taskIndex].description = taskDescription;
    localStorage.setItem(taskKey, JSON.stringify(tasks));

    const li = document.getElementById(taskId);
    li.querySelector('h2').textContent = taskTitle;
    li.querySelector('p').textContent = taskDescription;

    closeEditDialog();
}

// Função para excluir tarefa
function deleteTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem(taskKey));
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem(taskKey, JSON.stringify(updatedTasks));

    document.getElementById(taskId).remove();
}