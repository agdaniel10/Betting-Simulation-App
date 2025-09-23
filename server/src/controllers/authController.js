import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import tokenBlacklist from "../utils/tokenBlacklist.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '5d'
    })
}

// Register User
const registerUser = catchAsync(async (req, res, next) => {
    const { firstName, lastName, phoneNumber, email, password } = req.body;

    if (!firstName || !lastName || !phoneNumber || !email || !password) {
        return next(new AppError("All fields are required", 400));
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
        return next(new AppError("Email already in use", 400));
    }

    const phoneExist = await User.findOne({ phoneNumber });
    if (phoneExist) {
        return next(new AppError("Phone number already in use", 400));
    }

    const newUser = await User.create({
        firstName,
        lastName,
        phoneNumber,
        email,
        password
    });

    const token = createToken(newUser._id);
    
    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        token,
        data: { 
            user: newUser
        }
    });
});

// login User
const loginUser = catchAsync(async (req, res, next) => {
    const { phoneNumber, email, password } = req.body;

    if (!password || (!phoneNumber && !email)) {
        return next(new AppError("Password and either phone number or email are required", 400));
    }

    let user;
    if (email) {
        user = await User.findOne({ email }).select('+password');
    } else if (phoneNumber) {
        user = await User.findOne({ phoneNumber }).select('+password');
    }

    if (!user) {
        return next(new AppError("Invalid credentials", 401));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return next(new AppError("Invalid credentials", 401));
    }

    const token = createToken(user._id);

    user.password = undefined;

    res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        token,
        data: {
            user
        }
    });
});

// Logout User
const logoutUser = catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        return next(new AppError('No token provided', 400))
    }

    tokenBlacklist.addToken(token)

    res.status(200).json({
        status: 'success',
        message: 'Logged out successfully',
    })
})

// Protect Middleware
const protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization?.split(" ")[1];
    }

    if (!token) {
        return next(new AppError("Please log in to access resource", 401))
    }

    if (tokenBlacklist.isBlacklisted(token)) {
        return next(new AppError("Token has been invalidated. Please log in again", 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id) 

    if (!user) {
        return next(new AppError("User no longer exists", 401))
    }

    req.user = user;
    next()
})

export { registerUser, loginUser, logoutUser, protect };