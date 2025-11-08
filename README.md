# TeamTrack - Task Management System

TeamTrack is a full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js). It features user authentication, role-based access control, and comprehensive task management capabilities.

## Features

- **User Authentication**
  - Secure login and signup functionality
  - JWT-based authentication
  - Role-based access control (Admin and User roles)

- **Task Management**
  - Create, read, update, and delete tasks
  - Task status tracking (Pending, In Progress, Completed)
  - Task assignment and management
  - Admin dashboard for task oversight

- **User Interface**
  - Modern, responsive design with Tailwind CSS
  - Intuitive task creation and editing
  - Real-time error handling and validation
  - Clean and user-friendly interface

## Tech Stack

### Frontend
- React.js
- Tailwind CSS for styling
- Vite as build tool
- React Hooks for state management
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Project Structure

```
TeamTrack/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Common/
│   │   │   ├── Layout/
│   │   │   └── Tasks/
│   │   ├── services/
│   │   └── utils/
│   ├── public/
│   └── package.json
│
└── Backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   └── utils/
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/Aleemk75/TeamTrack.git
cd TeamTrack
```

2. Install Backend Dependencies
```bash
cd Backend
npm install
```

3. Configure Environment Variables
Create a `.env` file in the backend directory with:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000
```

4. Install Frontend Dependencies
```bash
cd ../Frontend
npm install
```

5. Start the Application

Backend:
```bash
cd Backend
npm run dev
```

Frontend:
```bash
cd Frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:4000`

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/signin` - Login user
- POST `/api/auth/signout` - Logout user

### Tasks
- GET `/api/tasks` - Get all tasks (user's tasks)
- POST `/api/tasks` - Create new task
- PATCH `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task

### Admin Routes
- GET `/api/admin/tasks` - Get all tasks (admin only)
- DELETE `/api/admin/tasks/:id` - Delete any task (admin only)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.