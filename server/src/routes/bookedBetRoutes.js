import express from 'express'
import { saveBookedBet, loadBookedBet } from '../controllers/bookBetController';

const bookedbetRouter = express.Router();

bookedbetRouter.post('/', saveBookedBet)
bookedbetRouter.get('/:code', loadBookedBet)

export default bookedbetRouter;



