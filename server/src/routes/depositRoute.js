import express from "express";
import { deposit } from "../controllers/depositController.js";
import { protect } from "../controllers/authController.js";

const depositRoute = express.Router();

depositRoute.post('/deposit', protect, deposit)

export default depositRoute;