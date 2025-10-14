import catchAsync from "../utils/catchAsync.js";
import AppError from '../utils/appError.js'
import Bet from '../models/betModel.js'
import User from '../models/userModel.js'
import mongoose from 'mongoose'

export const placeBet = catchAsync( async (req, res, next) => {

    const { bets, totalOdds, stake, potentialWinning} = req.body;

    if (!bets || bets.length === 0) {
        return next(new AppError('Please select valid bets', 400))
    }

    if (!stake || stake <= 0) {
        return next(new AppError('Invalid stake amount', 400))
    }

    // Session for transaction
    const session = await mongoose.startSession()
    session.startTransaction()

    try {

        // Get User
        const user = await User.findById(req.user.id)

        if (!user) {
            session.abortTransaction()
            return next(new AppError('User not found', 404))
        }

        // Check balance
        if (user.wallet < stake) {
            session.abortTransaction()
            return next(new AppError('Insufficient Balance, kindly make a deposit', 400))
        }

        // Deduct stake 
        user.wallet -= stake
        await user.save({ session, validateBeforeSave: false });

        // Create bet
        const newBet = await Bet.create([{
            userId: req.user.id,
            betCode: `BET${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
            bets,
            totalOdds,
            stake,
            potentialWinning
        }], { session });

        // Commit session changes
        await session.commitTransaction();
        

        res.status(201).json({
            status: 'success',
            message: 'Bet placed successfully',
            data: {
                bet: newBet[0],
                newBalance: user.wallet
            }
        })

        session.endSession()


    }catch (error) {
        await session.abortTransaction()
        session.endSession()
        return next(error)
    }
})