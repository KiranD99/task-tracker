const API = "http://127.0.0.1:8000/api/tasks/";

function getDurationHours(start, end) {
  const diffMs = new Date(end) - new Date(start);
  const hours = Math.ceil(diffMs / (1000 * 60 * 60));
  return hours;
}

function loadCompletedTasks() {
  fetch(API + "?completed=true")
    .then(response => response.json())
    .then(tasks => {
      const table = document.getElementById("completedTable");
      table.innerHTML = "";

      if (tasks.length === 0) {
        table.innerHTML = `
          <tr>
            <td colspan="5" style="text-align:center;">No completed tasks</td>
          </tr>
        `;
        return;
      }

      tasks.forEach(task => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${task.task_name}</td>
          <td>${new Date(task.start_time).toLocaleString()}</td>
          <td>${new Date(task.end_time).toLocaleString()}</td>
          <td>${getDurationHours(task.start_time, task.end_time)} hrs</td>
          <td>${task.notes || ""}</td>
        `;

        table.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Error loading completed tasks:", error);
    });
}

loadCompletedTasks();
