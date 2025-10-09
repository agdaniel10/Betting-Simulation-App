// src/routes/authRoutes.js

import express from 'express';
import { registerUser, loginUser, logoutUser, protect, forgotPassword, resetPassword, verifyEmail, getMe } from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword)
router.post('/resetpassword', resetPassword)
router.post('/verifyemail', verifyEmail)

// Protected routes
router.post('/logout', protect, logoutUser);
router.get('/getMe', protect, getMe)

export default router;