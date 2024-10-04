# Exam Proctoring App

This project is an AI-powered exam proctoring application built using the **MERN stack** (MongoDB, Express, React, Node.js), **TensorFlow** for real-time face detection, and **JWT authentication** for securing user sessions. The system monitors various activities during exams, such as detecting multiple faces, preventing copy-pasting, tab changes, and use of unauthorized devices, ensuring a secure and fair exam environment.

## Features
- **Face Detection**: Uses TensorFlow to monitor the live video feed and detect multiple faces, flagging suspicious activities during exams.
- **Copy-Paste Detection**: Monitors clipboard activity and prevents users from copying and pasting text during the exam.
- **Tab Switching**: Tracks if the user navigates away from the exam tab and logs it as a suspicious event.
- **Unauthorized Devices**: Detects the use of unauthorized devices or objects in the video frame.
- **Real-Time Exam Monitoring Dashboard**: Admins and proctors can view live exam logs, including user activity, violations, and exam progress.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI & Machine Learning**: TensorFlow.js
- **Authentication**: JSON Web Tokens (JWT)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/exam-proctoring-app.git
    cd exam-proctoring-app
    ```

2. Install dependencies for both backend and frontend:
    ```bash
    # Install server dependencies
    cd backend
    npm install

    # Install client dependencies
    cd ../frontend
    npm install
    ```

3. Set up environment variables for both frontend and backend:
   - In the `backend` folder, create a `.env` file and add:
     ```env
     MONGO_DB_URL=<your-mongodb-url>
     JWT_SECRET=<your-jwt-secret>
     ```
   - In the `frontend` folder, create a `.env` file and add:
     ```env
     REACT_APP_API_URL=http://localhost:5000
     ```

4. Start the backend server:
    ```bash
    cd backend
    npm start
    ```

5. Start the frontend React app:
    ```bash
    cd ../frontend
    npm start
    ```

## Usage

- **Admin Login**: Admins can log in and monitor the exams in real-time from the dashboard.
- **Exam Logs**: Proctors can view detailed logs of user activities, including any violations during the exam.
- **Student Interface**: Students can log in, start the exam, and their activity will be tracked by the proctoring system.
