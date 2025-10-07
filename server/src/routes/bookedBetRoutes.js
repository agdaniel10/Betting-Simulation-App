import express from 'express'
import { loadBookedBet, saveBookedBet } from '../controllers/bookBetController.js';

const bookedbetRouter = express.Router();

bookedbetRouter.post('/', saveBookedBet)
bookedbetRouter.get('/:code', loadBookedBet)

export default bookedbetRouter;