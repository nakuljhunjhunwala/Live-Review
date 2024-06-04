# Live Review

A web application to manage and display reviews. The application allows users to add, edit, delete, and view reviews in real-time using WebSockets.

## Project Structure

- `frontend`: The React-based frontend application.
- `backend`: The Node.js-based backend server.

## Requirements

- Node.js and npm

## Problem Statement 
Create a full-stack application with the following functionalities: 
1. Fetch and display all reviews. 
2. Add a new review. 
3. Edit an existing review.  
4. Delete a review. 
5. Real-time updates using WebSockets.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/nakuljhunjhunwala/Live-Review.git
cd Live-Review
```

### Environment Variables

Create a `.env` file in the main directory and set the necessary environment variables for both frontend and backend.

**Backend**
```
PORT=8000
HOST="your cluster host"
MONGO_USER="your cluster user"
PASSWORD="your cluster password"
CLUSTER="your cluster"
DATABASE="your database name"
```

**Frontend**
```
VITE_API_PORT=8000
```

### Running Locally
You can run the frontend and backend separately on your local machine.

 **Backend**
```bash
cd backend
npm install
npm start 
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

### API Documentation

For API testing and documentation, you can use the following Postman collection:

[Postman Collection Link](https://api.postman.com/collections/11310171-6d693372-e4ad-4c6f-b3e1-243544c5dec8?access_key=PMAT-01HZJ596H5GCJCBZ2FCCDQ9V8F)


## Completed

1.  Fetch and display all reviews.
2.  Add a new review.
3.  Edit an existing review.
4.  Delete a review.
5.  Real-time updates using WebSockets.
