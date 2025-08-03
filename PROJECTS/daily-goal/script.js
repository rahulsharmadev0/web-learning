class Task {
    constructor(content = '') {
        this.content = content;
        this.isDone = false;
        this.id = crypto.randomUUID();
    }
}

const optionsDoc = document.querySelector("#options");
const progressBarDoc = document.querySelector(".progress-value");
const addButton = document.querySelector('#addButton');
const warningTxtEl = document.querySelector('#warningTxt');

let tasks = Array.from({ length: 3 }, () => new Task());

function updateProgress() {
    const completed = tasks.filter(t => t.isDone).length;
    const percent = tasks.length ? (completed / tasks.length) * 100 : 0;
    progressBarDoc.style.width = `${percent}%`;
}

function updateTaskUI(element, task) {
    const checkbox = element.querySelector('.checkbox');
    const input = element.querySelector('.task-input');
    checkbox.className = task.isDone ? 'checkbox check' : 'checkbox uncheck';
    input.style.textDecoration = task.isDone ? 'line-through' : 'none';
    input.style.color = task.isDone ? "#48a300" : "black";
    input.readOnly = task.isDone;
}

function updateWarning() {
    var filled = tasks.filter(e => e.content).length;
    warningTxtEl.style.display = filled == tasks.length ? "none" : "block";
    warningTxtEl.textContent = `Set all your goals (${filled} of ${tasks.length} filled) to continue!`;
}

function createTaskElement(task) {
    const element = document.createElement('div');
    element.className = 'option';
    element.id = task.id;
    element.innerHTML = `
        <span class="checkbox">${task.isDone ? '✔︎' : '✔︎'}</span>
        <input class="task-input" value="${task.content}" type="text" placeholder="Add new goals!"/>
    `;
    const checkbox = element.querySelector('.checkbox');
    const input = element.querySelector('.task-input');

    checkbox.addEventListener('click', () => {
        if (!task.content.trim()) return;
        task.isDone = !task.isDone;
        updateTaskUI(element, task);
        updateProgress();
    });

    input.addEventListener('input', e => {
        task.content = e.target.value.trim();
        updateWarning();
    });
    
    updateTaskUI(element, task);
    return element;
}

function renderTasks() {
    optionsDoc.innerHTML = '';
    const fragment = document.createDocumentFragment();
    tasks.forEach(task => fragment.appendChild(createTaskElement(task)));
    optionsDoc.appendChild(fragment);
    updateProgress();
}

addButton.addEventListener('click', () => {
    tasks.push(new Task());
    renderTasks();
});

renderTasks();
