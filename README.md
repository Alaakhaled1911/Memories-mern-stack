# Memories MERN Stack Application

## Project Description

Memories MERN Stack is a full-stack web application built with MongoDB, Express.js, React, and Node.js. It allows users to create, view, and manage posts (memories) with authentication features. The application provides a seamless user experience for sharing and browsing memories

![image](https://github.com/user-attachments/assets/e645c704-c25f-4fc9-aa63-a31f6de000c0)


## Technologies Used

- **Frontend:** React, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Others:** PostCSS, Tailwind CSS for styling

## Project Structure

### Backend

- `backend/index.js` - Entry point for the backend server
- `backend/config/db.js` - MongoDB connection setup
- `backend/controller/` - Contains controllers for handling business logic (posts, users)
- `backend/models/` - Mongoose models for User and Post
- `backend/routes/` - API route definitions for posts and users
- `backend/middleware.js/` - Middleware for authentication and error handling
- `backend/Utils/` - Utility functions such as token generation

### Frontend

- `frontend/src/` - React source code
- `frontend/src/components/` - React components including Auth, Form, Home, Navbar, Posts
- `frontend/src/store/` - Redux slices for authentication and posts state management
- `frontend/public/` - Static assets like images and favicon

## Features

- User registration and login with JWT authentication
- Create, edit, delete, and view posts (memories)
- Responsive and modern UI with Tailwind CSS
- State management with Redux Toolkit

## Installation and Running the Project

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory and add your environment variables (e.g., MongoDB URI, JWT secret).
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```
4. The frontend will be available at `http://localhost:3000`

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT authentication

## License

This project is licensed under the MIT License.
