
# React Office Task Management System
=======
# 🗂 Admin-Employee Task Management Web App  

## 🔐 Login Credentials  

### **Admin**  
- **Email:** `admin@example.com`  
- **Password:** `123`  

### **Employees**  
- **Employee 1:** `e@e.com` | **Password:** `123`  
- **Employee 2:** `employee2@example.com` | **Password:** `123`  
- **Employee 3:** `employee3@example.com` | **Password:** `123`  
- **Employee 4:** `employee4@example.com` | **Password:** `123`  
- **Employee 5:** `employee5@example.com` | **Password:** `123`  

---

## 📖 Project Overview  

The **Admin-Employee Task Management Web App** is a React.js-based project designed to streamline task assignments and monitoring between admins and employees.  

- **Admins** can create, assign, and manage tasks.  
- **Employees** can accept, complete, fail, or request new tasks through their personalized dashboard.  

This project simulates a real-world task tracking system, focusing on **workflow automation and intuitive UI/UX.**

---

## ✨ Features  

- **Role-Based Authentication** – Separate dashboards for admin and employees.  
- **Task Management** – Admin can assign new tasks to employees.  
- **Employee Panel** – Employees can update task status (accept, complete, fail).  
- **Persistent State** – Data managed with React state and JSON-based mock backend.  
- **Responsive UI** – Works seamlessly on desktop and mobile.  

---

## 🛠 Tech Stack  

- **Frontend:** React.js, JSX  
- **Styling:** CSS3 / Custom Components  
- **State Management:** React Hooks (useState, useEffect)  
- **Hosting:** Vercel  

---

## 🚀 Live Demo  
**[Click here to try the app](https://react-project-office-task-pud3.vercel.app/)**  

---

## 💻 Local Setup  

1. Clone the repository:  
   ```bash
   git clone https://github.com/AdityaDahake33/React_Project_Office_Task.git
>>>>>>> cd97349b7844d20790ef878912e789ac53b19dc4

A modern, real-time task management system built with React and Tailwind CSS.

## Features

### Real-Time Task Assignment
- **Admin Dashboard**: Create and assign tasks to employees in real-time
- **Employee Dashboard**: Receive instant notifications when new tasks are assigned
- **Live Updates**: Task status changes are reflected immediately across all dashboards
- **Task Management**: Complete workflow from task creation to completion

### Admin Features
- Create and assign tasks to specific employees
- View all employee tasks and their status
- Real-time dashboard with live task counters
- Employee management and overview

### Employee Features
- Real-time notifications for new task assignments
- Task acceptance workflow (New → Accepted → Completed/Failed)
- Live task counters and status updates
- Personal dashboard with task overview

## Technology Stack
- React 18
- Tailwind CSS
- React Icons
- Context API for state management
- LocalStorage for data persistence

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Access the application:
- Admin Login: admin@example.com / 123
- Employee Login: e@e.com / 123

## Real-Time Features

### Task Assignment Flow
1. Admin creates a new task and assigns it to an employee
2. Employee receives instant notification
3. Employee can accept, complete, or fail the task
4. All changes are reflected in real-time across dashboards

### Notification System
- Slide-in notifications for new task assignments
- Task counter badges on navigation
- Auto-dismissing notifications after 5 seconds

### State Management
- Centralized state management using React Context
- Automatic localStorage synchronization
- Real-time updates across all components

## Project Structure
```
src/
├── Components/
│   ├── Auth/          # Login components
│   ├── Dashboard/     # Admin and Employee dashboards
│   └── TaskList/      # Task management components
├── Context/           # AuthContext for state management
└── Utils/            # LocalStorage utilities
```

## Contributing
Feel free to submit issues and enhancement requests!
