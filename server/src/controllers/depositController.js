import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const MAX_DEPOSIT = 2000000

// Update deposit 
export const deposit = catchAsync(async (req, res, next) => {
    const { depositAmount } = req.body;

    const amount = Number(depositAmount)

    if (!depositAmount || amount < 0 || isNaN(amount)) {
        return next(new AppError('Please provide a valid deposit amount', 400));
    }

    if (!req.user || !req.user.id) {
        return next(new AppError('User authorization failed'))
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    const limit = user.wallet + amount

    if (limit > MAX_DEPOSIT) {
        return next(new AppError('Account balance will exceed maximum deposit with current deposit', 400))
    }
    
    // Update wallet
    user.wallet += amount;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        status: 'success',
        message: 'Deposit successful',
        data: {
            newBalance: user.wallet,
            depositAmount: amount
        }
    });
});