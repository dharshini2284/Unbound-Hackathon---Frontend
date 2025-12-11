# Command Gateway Frontend

This repository contains the frontend UI for **Command Gateway**, a React + Vite web application.  
It connects to the backend API to allow users and admins to:

- Login with API key
- Submit commands
- View command history
- (Admins) Manage rules
- (Admins) Manage users
- (Admins) View audit logs

---

## 📦 Features

### Member Users
- Authenticate using API key
- View current credits
- Submit commands for execution
- See command history and status

### Admin Users
- Manage rules (AUTO_ACCEPT / AUTO_REJECT)
- View all users and API keys
- See audit logs and command activity

---

## 🛠 Tech Stack

- **React 18**
- **React Router**
- **Vite**
- **Axios**
- **Tailwind CSS**
- **Context API for authentication**

---
## 🧩 Prerequisites

Make sure you have **Node.js (>= 16)** and **npm** installed.

Check versions:
node -v
npm -v

## 🛠 Setup & Installation

Clone the repository

git clone https://github.com/dharshini2284/Unbound-Hackathon---Frontend.git
cd Unbound-Hackathon---Frontend

Install dependencies
npm install

Create environment file
Create a .env file in the project root with:
VITE_API_URL=http://127.0.0.1:8000

🚀 Running the App (Development)

Start the development server:
npm run dev

Open in browser:
http://localhost:5173


| Page      | Description                         |
| --------- | ----------------------------------- |
| Login     | Enter API key                       |
| Dashboard | Welcome screen + recent commands    |
| Commands  | Submit new commands + history       |
| Rules     | Add / view regex rules (Admin)      |
| Users     | Create users + show credits (Admin) |
| Audit     | View audit logs (Admin)             |


