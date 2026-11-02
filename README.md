# Ledgerly

Ledgerly is a lightweight personal finance tracker that helps users monitor spending, compare expenses against a monthly budget, and understand where money is going through a simple dashboard.

The project combines a Node.js + Express backend with a static HTML/CSS/JavaScript frontend and stores user and transaction data in MongoDB.

## Features

- User registration and login with password hashing and JWT-based authentication
- Monthly budget management per user
- Add, view, and delete personal expenses
- Categorized expense tracking across Food, Rent, Utilities, Entertainment, Transport, Shopping, Health, and Other
- Expense summary analytics for the current month
- Interactive spending dashboard with charts and a clean financial overview
- Responsive static frontend served from the Express app

## Tech stack

- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Authentication: bcryptjs + JWT
- Frontend: HTML, CSS, JavaScript

## Project structure

```text
Ledgerly/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── expenseController.js
│   ├── middleware/
│   │   └── auth_middleware.js
│   ├── models/
│   │   ├── Expense.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── expenseRoutes.js
│   └── server.js
├── frontend/
│   └── static/
│       ├── auth.html
│       ├── dashboard.html
│       ├── index.html
│       ├── favicon.ico
│       ├── css/
│       │   ├── auth.css
│       │   ├── dashboard.css
│       │   ├── index.css
│       │   └── variables.css
│       └── js/
│           ├── auth.js
│           ├── chart_engine.js
│           ├── dashboard.js
│           └── theme.js
├── .env
├── package.json
├── package-lock.json
├── README.md
```

## Getting started

### Prerequisites

- Node.js
- MongoDB instance running locally or through MongoDB Atlas
- A JWT secret for authentication

### Install dependencies

```bash
npm install
```

### Environment configuration

Create a `.env` file in the project root with the following values:

```env
MONGO_URI=mongodb://localhost:27017/Ledgerly
JWT_SECRET=your_secure_jwt_secret_here
```

If you are using MongoDB Atlas, replace the `MONGO_URI` value with your Atlas connection string.

### Run the app

```bash
npm start
```

This starts the server on:

```text
http://localhost:3000
```

The app serves the frontend pages from the static folder, so you can open:

- http://localhost:3000/
- http://localhost:3000/auth.html
- http://localhost:3000/dashboard.html

## Authentication and API overview

The backend exposes these routes:

### Auth

- `POST /api/auth/register` — Create a new user account
- `POST /api/auth/login` — Log in and receive a JWT token

### Expenses

- `GET /api/expenses` — Get expenses for the current authenticated user
- `POST /api/expenses` — Add a new expense
- `DELETE /api/expenses/:id` — Delete an expense by ID
- `GET /api/analytics/summary` — Retrieve current monthly total, budget, remaining allowance, and category breakdown

Use the JWT as a bearer token for protected routes:

```http
Authorization: Bearer <token>
```

## Overview of the app flow

1. Users register or sign in from the frontend auth page.
2. The backend verifies credentials and returns a JWT.
3. The client stores the token and uses it for future API requests.
4. Users add expenses with category, amount, and date.
5. The dashboard fetches monthly summaries and renders them in a visual chart.
6. The app compares actual spending against the monthly budget to show remaining allowance and budget status.

## Notes

- The frontend is served as static files and is designed for a simple, browser-based workflow.
- This is a full-stack prototype and is ideal for learning or extending with additional finance features such as recurring expenses, savings goals, or reports.

## Contributing

Contributions are welcome. Please open a pull request with a clear description of your changes and any relevant testing details.

### Contributors

- **Bharath Raghuraman** — Frontend (HTML, CSS) — [GitHub](https://github.com/BurgeryJuice)
- **Dhaksh S Kumar** — Frontend JavaScript and backend server, routes, and middleware — [GitHub](https://github.com/Dhaksh-1106)
- **Harshithananda Guddappa** — Database configuration, controllers, and models — [GitHub](https://github.com/HarshithanandaGuddappa)
