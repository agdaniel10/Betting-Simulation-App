import express from 'express';
import cors from 'cors';
import connectDB from './src/config/database.js';
import dotenv from 'dotenv'
import authRouter from './src/routes/authRoutes.js';
import errorHandler from './src/middlewares/errorHandler.js';
import cleanupUnverifiedUsers from './src/utils/cleanUp.js';
import bookedbetRouter from './src/routes/bookedBetRoutes.js';
import depositRoute from './src/routes/depositRoute.js';
dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',  // your frontend URL
  credentials: true,                // 👈 allow credentials (headers, cookies)
}));
app.use(express.json());

// connect DB 
connectDB()

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/auth', authRouter)
app.use('/api/bookings', bookedbetRouter)
app.use('/api/deposit', depositRoute)

app.use(errorHandler)

// Start clean up
cleanupUnverifiedUsers()

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

