<div align="center">

# 🚨 Emergency Alert & Response System

### Real-Time SOS Platform with React Frontend & Secure API Integration

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![JWT](https://img.shields.io/badge/JWT_Auth-000000?style=for-the-badge)](https://jwt.io)
[![REST API](https://img.shields.io/badge/REST_API-0052CC?style=for-the-badge)](https://github.com/shri695/YesMadam-SOS)

**A consumer-facing emergency response web application that enables users to trigger real-time SOS alerts with automated SMS notifications.**

[Features](#-features) · [Tech Stack](#-tech-stack) · [Architecture](#-architecture) · [Installation](#-installation) · [API Overview](#-api-overview)

</div>

---

## 📌 Overview

**Emergency Alert & Response System** is a full-stack web application built to handle critical emergency scenarios. Users can authenticate securely, trigger SOS alerts, and notify emergency contacts in real time via **Twilio SMS integration**.

The project demonstrates end-to-end ownership: responsive **React frontend**, **Node.js/Express REST API**, **MongoDB** data layer, and **JWT-based authentication**.

---

## ✨ Features

### Frontend (React)
- 📱 **Responsive UI** — Mobile-friendly layouts for emergency use cases
- 🧩 **Reusable Components** — Modular component architecture for maintainability
- 🔐 **Protected Routes** — JWT-based auth with secure session handling
- ⚡ **Real-Time Actions** — Instant SOS trigger with live API feedback
- 🎨 **Clean UX Flows** — Structured user journeys for login, dashboard, and alert actions

### Backend (Node.js)
- 🔑 **JWT Authentication** — Secure login, token validation, protected endpoints
- 📡 **REST API** — Clean API design for frontend-backend communication
- 📨 **Twilio Integration** — Automated SMS alerts to emergency contacts
- 🗄️ **MongoDB Storage** — User data and alert history persistence

---

## 🛠 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React.js, JavaScript (ES6+), HTML5, CSS3, Redux |
| **Backend** | Node.js, Express.js, REST APIs |
| **Database** | MongoDB, MongoDB Atlas, Mongoose |
| **Auth** | JWT (JSON Web Tokens) |
| **Integrations** | Twilio SMS API |
| **Tools** | Git, GitHub, Postman, VS Code |

---

## 🏗 Architecture

```
┌─────────────────┐     REST API      ┌─────────────────┐     SMS      ┌──────────────┐
│  React Frontend │ ◄──────────────► │  Node.js API    │ ───────────► │ Twilio API   │
│  (Components,   │     JWT Auth      │  (Express.js)   │              │ (Alerts)     │
│   Protected     │                   │                 │              └──────────────┘
│   Routes)       │                   │                 │
└─────────────────┘                   └────────┬────────┘
                                               │
                                               ▼
                                      ┌─────────────────┐
                                      │  MongoDB Atlas  │
                                      │  (Users, Alerts)│
                                      └─────────────────┘
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Twilio account (for SMS alerts)

### 1. Clone the repository

```bash
git clone https://github.com/shri695/YesMadam-SOS.git
cd YesMadam-SOS
```

### 2. Backend setup

```bash
cd backend
npm install

# Create .env file with:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# TWILIO_ACCOUNT_SID=your_twilio_sid
# TWILIO_AUTH_TOKEN=your_twilio_token
# TWILIO_PHONE_NUMBER=your_twilio_number

npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install

# Create .env file with:
# REACT_APP_API_URL=http://localhost:5000

npm start
```

Open **http://localhost:3000** in your browser.

---

## 🔌 API Overview

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login and receive JWT | No |
| POST | `/api/alerts/sos` | Trigger emergency SOS alert | Yes |
| GET | `/api/alerts/history` | Get user's alert history | Yes |
| GET | `/api/users/profile` | Get user profile | Yes |

---

## 🔐 Security Practices

- JWT tokens for stateless authentication
- Protected API routes with middleware validation
- Environment variables for secrets (never committed to repo)
- HTTPS-ready API communication design

---

## 📂 Project Structure

```
YesMadam-SOS/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level pages
│   │   ├── services/       # API service layer
│   │   ├── context/        # Auth context / state
│   │   └── App.js
│   └── package.json
├── backend/
│   ├── routes/             # API route handlers
│   ├── models/             # MongoDB schemas
│   ├── middleware/         # JWT auth middleware
│   ├── controllers/        # Business logic
│   └── server.js
└── README.md
```

---

## 👩‍💻 Author

**Shrilakshmi Doijode**

- GitHub: [@shri695](https://github.com/shri695)
- LinkedIn: [shrilakshmidoijode](https://linkedin.com/in/shrilakshmidoijode)
- Email: shrilakshmidoijode1@gmail.com

---

<div align="center">

⭐ Star this repo if you find it useful!

**Built with ❤️ for real-world emergency response use cases**

</div>
