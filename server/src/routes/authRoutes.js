// src/routes/authRoutes.js

import express from 'express';
import { registerUser, loginUser, logoutUser, protect, forgotPassword } from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword)

// Protected routes
router.post('/logout', protect, logoutUser);

export default router;