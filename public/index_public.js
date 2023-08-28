
const createEditBtn = document.querySelector("#create-tasks");
const tasksDiv = document.querySelector("#tasks");
const input = document.querySelector("#task-name");

const baseBackenUrl = `${window.origin}/api`;
// const baseBackenUrl = http://localhost:4000/api



let TASK_TO_EDIT = null;


createEditBtn.addEventListener("click", () => {

  const creating = !TASK_TO_EDIT;
  const path = creating ? "tasks" : `tasks/${TASK_TO_EDIT._id}`;
  const method = creating ? "POST" : "PUT";
  fetch(`${baseBackenUrl}/${path}`, {
    method,
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ text: input.value }),
  })
    .then((res) => {
      getTasks();
      input.value = "";
      createEditBtn.innerText = "Create Task"; 
      return res.json();
    })
    .then((resJSON) => {
      console.log({ resJSON });
    });
});

function getTasks() {
  tasksDiv.innerHTML = null
  fetch(`${baseBackenUrl}/tasks`)
    .then((res) => {;
      return res.json();
    })
    .then((resJSON) => {
      const tasks = resJSON.data;
      for (const task of tasks) {
        const taskParagraph = document.createElement("p");
        const deleteTaskBtn = document.createElement("button");
        const taskContainerDiv = document.createElement("div");
        deleteTaskBtn.innerText = "Delete";
        taskParagraph.innerText = task.name;
        deleteTaskBtn.setAttribute("id", task._id);
        deleteTaskBtn.addEventListener("click", (e) => {
          const taskId = e.target.id;
          fetch(`${baseBackenUrl}/tasks/${taskId}`, {
            method: "DELETE",
          }).then(() => {
            const taskDiv = deleteTaskBtn.parentElement
            taskDiv.remove()
          })
        });
        taskParagraph.addEventListener("click", (e) => {
          input.value = task.name;
          createEditBtn.innerText = "Edit Task";
          TASK_TO_EDIT = task;
        })
        taskContainerDiv.appendChild(taskParagraph);
        taskContainerDiv.appendChild(deleteTaskBtn);
        tasksDiv.appendChild(taskContainerDiv);
      }
    });
}


getTasks();