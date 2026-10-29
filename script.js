const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const counter = document.getElementById("counter");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = todo.text;

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "delete";

    // click the row to toggle done
    li.addEventListener("click", () => {
      todos[index].done = !todos[index].done;
      save();
      render();
    });

    // click delete to remove (stop the row click from firing)
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      todos.splice(index, 1);
      save();
      render();
    });

    li.append(span, del);
    list.appendChild(li);
  });

  const left = todos.filter((t) => !t.done).length;
  counter.textContent = `${left} task${left === 1 ? "" : "s"} left`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.push({ text, done: false });
  input.value = "";
  save();
  render();
});

render();
