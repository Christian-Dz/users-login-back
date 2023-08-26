

const createBtn = document.querySelector("#create-tasks");
const input = document.querySelector("#task-name");


createBtn.addEventListener("click", () => {
  console.log("Create Buttom");
  fetch("http://localhost:4000/api/tasks", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({text:input.value})
  }).then((res) => {
    console.log({ res });
    return res.json();
  }).then((resJSON) => {
    console.log({resJSON})
  })
});