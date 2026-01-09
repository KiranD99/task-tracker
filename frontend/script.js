// ===============================
// CONFIG
// ===============================
const API = "http://127.0.0.1:8000/api/tasks/";

// ===============================
// REMAINING HOURS (STATIC)
// ===============================
function getRemainingHours(endTime) {
  const end = new Date(endTime);
  const now = new Date();

  const diffMs = end - now;

  if (diffMs <= 0) return "0";

  const hours = Math.ceil(diffMs / (1000 * 60 * 60));
  return hours.toString();
}

// ===============================
// LOAD ACTIVE TASKS (DASHBOARD)
// ===============================
function loadTasks() {
  fetch(API + "?completed=false")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      return response.json();
    })
    .then(tasks => {
      const table = document.getElementById("taskTable");
      table.innerHTML = "";

      if (tasks.length === 0) {
        table.innerHTML = `
          <tr>
            <td colspan="6" style="text-align:center;">No active tasks</td>
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
          <td>${getRemainingHours(task.end_time)} hrs</td>
          <td>${task.notes || ""}</td>
          <td>
            <button onclick="completeTask(${task.id})">✔</button>
          </td>
        `;

        table.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Error loading tasks:", error);
      alert("Failed to load tasks. Check console.");
    });
}

// ===============================
// ADD NEW TASK (TOP INPUT ROW)
// ===============================
function addTask() {
  const task_name = document.getElementById("taskName").value.trim();
  const start_time = document.getElementById("startTime").value;
  const end_time = document.getElementById("endTime").value;
  const notes = document.getElementById("notes").value.trim();

  if (!task_name || !start_time || !end_time) {
    alert("Task name, start time, and end time are required.");
    return;
  }

  if (new Date(end_time) <= new Date(start_time)) {
    alert("End time must be after start time.");
    return;
  }

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      task_name,
      start_time,
      end_time,
      notes
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      return response.json();
    })
    .then(() => {
      // Clear input fields
      document.getElementById("taskName").value = "";
      document.getElementById("startTime").value = "";
      document.getElementById("endTime").value = "";
      document.getElementById("notes").value = "";

      loadTasks();
    })
    .catch(error => {
      console.error("Error adding task:", error);
      alert("Error adding task. Check console.");
    });
}

// ===============================
// MARK TASK AS COMPLETED
// ===============================
function completeTask(taskId) {
  fetch(`${API}${taskId}/complete/`, {
    method: "PATCH"
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to complete task");
      }
      return response.json();
    })
    .then(() => {
      loadTasks();
    })
    .catch(error => {
      console.error("Error completing task:", error);
      alert("Error completing task. Check console.");
    });
}

// ===============================
// INITIAL LOAD (NO POLLING)
// ===============================
loadTasks();
