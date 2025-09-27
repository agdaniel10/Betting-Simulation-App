import express from 'express';
import cors from 'cors';
import connectDB from './src/config/database.js';
import dotenv from 'dotenv'
import authRouter from './src/routes/authRoutes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// connect DB 
connectDB()

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
