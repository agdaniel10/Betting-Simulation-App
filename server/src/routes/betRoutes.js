import express from 'express'
import { placeBet } from '../controllers/betController.js'
import { protect } from "../controllers/authController.js";

const betRoutes = express.Router();

betRoutes.post('/placeBet', protect, placeBet)

export default betRoutes