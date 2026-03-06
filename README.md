# BetPawa - Betting Simulation Platform

A full-stack web application that simulates a sports betting platform. BetSim allows users to register, log in, browse betting markets, place bets, and track their betting history — all within a controlled simulation environment. No real money is involved.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

BetSim is a simulation-only betting platform built for educational and demonstrative purposes. It replicates the core mechanics of a real betting website — user accounts, odds, wager placement, and bet tracking — without involving any financial transactions. The project was built to explore full-stack development with the MERN stack (MongoDB, Express, React, Node.js).

---

## Tech Stack

**Frontend**
- React.js
- React Router (client-side routing)
- Axios (HTTP requests)

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose

**Other Tools**
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- dotenv for environment configuration

---

## Features

- User registration and login with secure authentication
- Browse available betting markets and view current odds
- Place simulated bets with a virtual wallet balance
- View full bet history and transaction log per user
- Protected routes that require authentication to access

---

## Project Structure

```
betting-simulation-app/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Route-level page components
│       ├── services/        # API call functions
│       └── App.jsx
│
├── server/                  # Express backend
│   ├── controllers/         # Route handler logic
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API route definitions
│   ├── middleware/          # Auth and error middleware
│   └── server.js
│
├── .env.example
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local instance or a MongoDB Atlas URI)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/betsim.git
cd betsim
```

2. Install backend dependencies:

```bash
cd server
npm install
```

3. Install frontend dependencies:

```bash
cd ../client
npm install
```

### Environment Variables

Create a `.env` file inside the `server/` directory. You can use `.env.example` as a reference:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Running the Application

Start the backend server:

```bash
cd server
npm run dev
```

Start the frontend development server:

```bash
cd client
npm start
```

The frontend will be available at `http://localhost:3000` and the backend API at `http://localhost:5000`.


Contributions are welcome. To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a pull request

Please make sure your code is clean, well-commented, and tested before submitting.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Disclaimer

BetSim is a simulation project built strictly for educational purposes. It does not facilitate real money gambling of any kind. All bets, balances, and transactions within the platform are entirely virtual.
