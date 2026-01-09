# Task Tracker 🗂️

A clean and practical **full-stack Task Tracker** application built using **Django REST Framework** for the backend and **HTML, CSS, JavaScript** for the frontend.

This project allows users to manage tasks with start and end date-time, track remaining duration, and archive completed tasks separately.

---

## 🚀 Features

- Add tasks with:
  - Task name
  - Start date & time
  - End date & time
  - Notes
- View **active (incomplete) tasks** on the dashboard
- View **completed tasks** on a separate page
- Mark tasks as completed
- Static remaining-time calculation (hours)
- Clean **dark theme UI**
- Simple navigation with navbar
- REST API–driven architecture

---

## 🧱 Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- SQLite (development)

### Frontend
- HTML
- CSS (Dark theme)
- Vanilla JavaScript

---

## 📁 Project Structure
```
task-tracker/
│
├── tasktracker/ # Django project settings
├── tracker/ # Django app (models, views, APIs)
├── frontend/ # Frontend files
│ ├── index.html # Active tasks dashboard
│ ├── completed.html # Completed tasks page
│ ├── script.js
│ ├── completed.js
│ └── style.css
│
├── manage.py
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/tasks/?completed=false` | Get active tasks |
| GET | `/api/tasks/?completed=true` | Get completed tasks |
| POST | `/api/tasks/` | Create a new task |
| PATCH | `/api/tasks/<id>/complete/` | Mark task as completed |

---

## ▶️ How to Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/KiranD99/task-tracker.git
cd task-tracker
```

### 2️⃣ Create virtual environment
```bash
python -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate
```

### 3️⃣ Install dependencies
```bash
pip install django djangorestframework django-cors-headers
```

### 4️⃣ Run migrations
```bash
python manage.py migrate
```

### 5️⃣ Start backend server
```bash
python manage.py runserver
```

## 6️⃣ Open frontend
```
Open frontend/index.html using Live Server (VS Code)
OR
Open directly in browser
```

## 🎯 Design Decisions

- Live second-by-second timers were intentionally avoided to:
- Reduce backend polling
- Improve performance
- Keep architecture clean
- Remaining duration is calculated statically on the frontend
- Completed tasks are archived instead of deleted

## 📌 Future Improvements

- User authentication
- Export completed tasks to CSV / Excel
- React frontend
- Date range filtering
- Deployment to cloud (Render / AWS)

## 👤 Author
- Kiran
GitHub: https://github.com/KiranD99

## ⭐ If you like this project

- Give it a star ⭐ on GitHub!


---

