
const getBtn = document.querySelector("#get-tasks");
const createBtn = document.querySelector("#create-tasks");
const input = document.querySelector("#task-name");


getBtn.addEventListener("click", () => {
  console.log("Boton get");
  fetch("http://localhost:4000/api/tasks")
});

createBtn.addEventListener("click", () => {
  console.log("Boton create");
  fetch("http://localhost:4000/api/tasks", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({text:input.value})
  });
});