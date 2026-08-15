# Quiz App

A full-stack quiz application built with the **MERN stack**, featuring user authentication, quiz participation, and result tracking.

## ✨ Features

- 🔐 User registration and authentication
- 🔑 JWT-based authentication
- 🔒 Password hashing with bcrypt
- 📝 Interactive quiz interface
- 📊 Quiz result tracking
- 👤 User-specific result management
- 🔄 RESTful API for frontend-backend communication
- 📱 Responsive user interface
- ⚡ Fast development and build workflow with Vite

## 🛠️ Tech Stack

### Frontend

- **React 19**
- **React Router**
- **Tailwind CSS**
- **Axios**
- **Vite**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JSON Web Tokens (JWT)**
- **bcryptjs**

### Development Tools

- Git & GitHub
- ESLint
- Nodemon
- dotenv

## 🏗️ Architecture

The application is divided into separate frontend and backend applications.

```text
Quiz-App/
├── frontend/
│   ├── src/
│   │   ├── api.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── resultController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── resultModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── resultRoutes.js
│   │   └── userRoutes.js
│   └── server.js
│
└── README.md
```

### Backend Structure

The backend follows a modular structure separating different responsibilities:

- **Models** — MongoDB/Mongoose schemas for users and quiz results
- **Controllers** — Application logic for user and result operations
- **Routes** — API endpoint definitions
- **Middleware** — Authentication and request processing
- **Config** — Database connection configuration
- **Server** — Express application entry point

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

- [Node.js](https://nodejs.org/)
- MongoDB or a MongoDB Atlas database
- Git

### 1. Clone the repository

```bash
git clone https://github.com/rishav12s/Quiz-App.git
cd Quiz-App
```

### 2. Configure the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Add any additional environment variables required by your local configuration.

### 3. Start the Backend

```bash
npm start
```

The backend will start using Nodemon for development.

### 4. Configure the Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

### 5. Start the Frontend

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

## 🔐 Authentication

The application uses **JWT-based authentication** to protect authenticated routes.

Passwords are securely hashed using **bcryptjs** before being stored, while authentication middleware validates JWTs for protected API requests.

## 📡 API

The backend exposes RESTful endpoints for:

- User registration and authentication
- User-related operations
- Quiz result submission
- Retrieving user results

The frontend communicates with these endpoints using **Axios**.

## 📚 What I Learned

This project provided practical experience with:

- Building a full-stack application using the MERN stack
- Developing React-based user interfaces
- Designing RESTful APIs with Express.js
- Working with MongoDB through Mongoose
- Implementing JWT authentication
- Secure password hashing with bcrypt
- Structuring a backend using models, controllers, routes, and middleware
- Connecting a React frontend to a Node.js backend
- Managing application configuration with environment variables
- Using Git and GitHub for version control

## 🔮 Future Improvements

Potential improvements include:

- Quiz categories and difficulty levels
- Timed quizzes
- Leaderboards
- Detailed performance analytics
- Admin functionality for creating and managing quizzes
- Improved error handling and validation
- Deployment with a production database and hosting environment

## 📄 License

This project is licensed under the ISC License.