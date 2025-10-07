import BookedBet from "../models/bookBetModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

// Save booked bet
export const saveBookedBet = catchAsync(async (req, res, next) => {
    const { code, bets, totalOdds, stake, potentialWinning } = req.body;

    if (!code || !bets || bets.length === 0) {
        return next(new AppError('Code and bets are required', 400));
    }

    // Check if code already exists
    const existingBet = await BookedBet.findOne({ code });
    if (existingBet) {
        return next(new AppError('Booking code already exists', 409));
    }

    const bookedBet = new BookedBet({
        code,
        bets, 
        totalOdds, 
        stake, 
        potentialWinning,
        userId: req.user?._id
    });

    await bookedBet.save();

    res.status(201).json({
        status: 'success',
        message: 'Bet booked successfully',
        data: {
            bookedBet
        }
    });
});

// Load booked bet 
export const loadBookedBet = catchAsync(async (req, res, next) => {
    const { code } = req.params;

    if (!code) {
        return next(new AppError('Provide booking code', 400));
    }

    const bookedBet = await BookedBet.findOne({ code });

    if (!bookedBet) {
        return next(new AppError('Booking code invalid or expired', 404));
    }

    res.status(200).json({
        status: 'success', 
        data: {
            bookedBet
        }
    });
});

