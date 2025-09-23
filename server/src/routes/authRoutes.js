// src/routes/authRoutes.js

import express from 'express';
import { registerUser, loginUser, logoutUser, protect } from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.post('/logout', protect, logoutUser);

export default router;