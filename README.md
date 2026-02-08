# 📌 Online Complaint / Issue Tracker System

A simple full-stack web application that allows users to submit complaints and enables an admin to manage them.
This project is built using HTML, CSS, JavaScript, Node.js, and Express.js without using any database.
All complaints are stored in memory using JavaScript data structures.

## 🎯 Objective

To design and develop an Online Complaint / Issue Tracker System where:

- Users can submit complaints
- An admin can view, update, and delete complaints
- Complaint data is managed without using any database

## 🛠️ Technology Stack

### Frontend

- HTML
- CSS (Vanilla)
- JavaScript (Vanilla)

### Backend

- Node.js
- Express.js

### Database

- ❌ Not used (In-memory storage)

## 📂 Project Folder Structure

```
complaint-tracker/
│
├── server.js
├── package.json
│
├── public/
│   ├── index.html      // User Portal
│   ├── admin.html      // Admin Dashboard
│   ├── style.css       // UI Styling
│   └── script.js       // Frontend Logic
```

## 👤 User Module

- Submit a complaint using a form
- Auto-generated complaint ID (e.g., CMP001)
- Complaint status is set to Pending by default
- Receives complaint ID after successful submission

## 🛠️ Admin Module

- View all complaints
- View complaint details (ID, name, email, subject, status)
- Update complaint status:
  - Pending
  - Resolved
  - Rejected
- Delete complaints
- Dashboard statistics:
  - Total complaints
  - Pending
  - Resolved
  - Rejected

## 🔗 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /complaints | Get all complaints |
| GET | /complaints/:id | Get complaint by ID |
| POST | /complaints | Add a new complaint |
| PUT | /complaints/:id | Update complaint status |
| DELETE | /complaints/:id | Delete a complaint |

## ⚙️ How It Works

- Complaints are stored in an in-memory array
- When the server restarts, all data is reset
- Frontend communicates with backend using Fetch API
- Backend exposes RESTful APIs using Express.js

## ▶️ How to Run the Project

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Start the server

```bash
npm start
```

### 3️⃣ Open in browser

- User Portal: http://localhost:3000/index.html
- Admin Panel: http://localhost:3000/admin.html

## 🎨 User Interface

- Clean and responsive UI
- Card-based layout
- Status badges with colors:
  - 🟡 Pending
  - 🟢 Resolved
  - 🔴 Rejected
- Navigation between User and Admin panels

## 📌 Rules & Constraints Followed

- ✔ No database used
- ✔ Only in-memory data storage
- ✔ No frontend frameworks
- ✔ Vanilla JavaScript only
- ✔ Clean and readable code
- ✔ Follows given project structure

## 📚 Learning Outcomes

- Understanding full-stack development basics
- Working with Express.js REST APIs
- Handling frontend-backend communication
- Managing data without a database
- Building UI using pure HTML & CSS

## 🧑🎓 Academic Use

This project is developed as part of Minor Project – 1 and is suitable for:

- Lab submission
- Viva voce
- Demonstrating backend fundamentals

## 📌 Author

Nabajyoti Kalita
