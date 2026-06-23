// In-memory store: { id, text, completed }
let todos = [];
let nextId = 1;
let currentFilter = "all";

const listEl = document.getElementById("list");
const formEl = document.getElementById("todoForm");
const inputEl = document.getElementById("todoInput");
const dueInput = document.getElementById("dueInput");
const itemCountEl = document.getElementById("itemCount");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

function addTodo(text, dueDate) {
  todos.push({ id: nextId++, text: text, completed: false, dueDate: dueDate || null });
  render();
}

// date input value comes as "YYYY-MM-DD"; parse it as a local date so it
// doesn't shift a day backward/forward depending on the user's timezone
function parseDueDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDueDate(dateStr) {
  return parseDueDate(dateStr).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function isOverdue(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parseDueDate(dateStr) < today;
}

function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) todo.completed = !todo.completed;
  render();
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  render();
}

function clearCompleted() {
  todos = todos.filter((t) => !t.completed);
  render();
}

function getFilteredTodos() {
  if (currentFilter === "active") {
    return todos.filter((t) => !t.completed);
  }
  if (currentFilter === "completed") {
    return todos.filter((t) => t.completed);
  }
  return todos;
}

function render() {
  const filtered = getFilteredTodos();
  listEl.innerHTML = "";

  if (filtered.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent =
      todos.length === 0 ? "No tasks yet." : "Nothing matches this filter.";
    listEl.appendChild(empty);
  } else {
    filtered.forEach((todo) => {
      const li = document.createElement("li");
      li.className = "todo-item";

      const checkbox = document.createElement("button");
      checkbox.className = "checkbox";
      checkbox.classList.toggle("checked", todo.completed);
      checkbox.textContent = todo.completed ? "✓" : "";
      checkbox.addEventListener("click", () => toggleTodo(todo.id));

      const text = document.createElement("span");
      text.className = "todo-text";
      text.classList.toggle("completed", todo.completed);
      text.textContent = todo.text;

      li.appendChild(checkbox);
      li.appendChild(text);

      if (todo.dueDate) {
        const dueEl = document.createElement("span");
        dueEl.className = "due-date";
        const overdue = !todo.completed && isOverdue(todo.dueDate);
        dueEl.classList.toggle("overdue", overdue);
        dueEl.textContent = overdue ? "Overdue" : formatDueDate(todo.dueDate);
        li.appendChild(dueEl);
      }

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Remove";
      deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

      li.appendChild(deleteBtn);
      listEl.appendChild(li);
    });
  }

  const remaining = todos.filter((t) => !t.completed).length;
  itemCountEl.textContent = `${remaining} task${
    remaining === 1 ? "" : "s"
  } left`;
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = inputEl.value.trim();
  if (value === "") return;
  addTodo(value, dueInput.value);
  inputEl.value = "";
  dueInput.value = "";
  inputEl.focus();
});

clearCompletedBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    render();
  });
});

render();