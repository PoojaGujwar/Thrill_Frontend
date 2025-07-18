# ThrillTeamsUp
A task management app where users can register, log in, and manage their tasks in an organized way. It's built with React, Node.js, and MongoDB.

---

## Demo Link
[Live Demo](https://taskapp-beryl.vercel.app)

---

## Quick Start
```
git clone https://github.com/PoojaGujwar/Thrill_Frontend.git
cd <your-repo>
npm install
npm run dev #or `npm start`
```

---

## Technologies
- React JS
- React Router
- Node JS
- Express
- MongoDB
- JWT Authentication

---

## Features
**Login / Signup**
- Intro to the app
- Navigation to Login / Signup

**Authentication**
- User sign-up and login with JWT
- Protected routes for adding tasks

**Home**
- Displays a list of projects and tasks
- Add new tasks and projects
- Filter tasks by status

**Projects**
- Displays a list of projects
- Add projects
- Filter projects by owner and tag

**Task**
- Displays a list of tasks
- Add a new task
- Filter tasks by status

**Task Details**
- View full task information
- Mark the task as completed using a button

**Teams**
- Displays a list of teams
- Add a new team

**Team Details**
- Displays all members
- Add new members

---

## API Reference

### **GET /tasks**
List all tasks<br>
Sample Response: <br>
```
[{_id, name, project, team, owners, tags, timeToComplete, status, dueDate, createdAt, updatedAt }...]
```

### **GET /project**
List all projects<br>
Sample Response: <br>
```
[{_id, name, description, createdAt}]
```

### **GET /teams**
List all teams<br>
Sample Response:<br>
```
[{_id, name, members}]
```

###  **POST /tasks**
Create a new task<br>
Sample Response:<br>
```
{name, project, team, owners, tags, timeToComplete, status, dueDate, createdAt, updatedAt}
```


### **POST /project**
Create a new project<br>
Sample Response:<br>
```
{name, description, createdAt}
```

### **POST /teams**
Create a new team<br>
Sample Response:<br>
```
{name, members}
```

---

## Contact
For bugs or feature requests, please reach out to gujwarpooja@gmail.com