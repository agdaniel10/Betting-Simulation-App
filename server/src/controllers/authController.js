import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import tokenBlacklist from "../utils/tokenBlacklist.js";
import nodemailer from "nodemailer";

import fs from 'fs';
import path from 'path'

const createToken = (id) => {
    return jwt.sign({ 
        id, 
        jti: crypto.randomUUID() 
    }, process.env.JWT_SECRET, {
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

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedVerificationCode = crypto.createHash("sha256").update(verificationCode).digest("hex"); // Added .digest("hex")

    const newUser = await User.create({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        isEmailVerified: false,
        emailVerificationToken: hashedVerificationCode,
        emailVerificationExpires: Date.now() + 5 * 60 * 1000
    });

    const templatePath = path.join(process.cwd(), 'src', 'templates', 'verifyEmail.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    htmlTemplate = htmlTemplate
        .replace(/\$\{firstName\}/g, newUser.firstName)  
        .replace(/\$\{verificationCode\}/g, verificationCode);    

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Send email
    await transporter.sendMail({
        from: process.env.EMAIL_FROM || "support@betperfect.com",
        to: newUser.email,                                       
        subject: "Email Verification Code - betperfect.com",  
        html: htmlTemplate
    });

    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        message: 'Registration successful. Please check your email to verify your account.',
        data: { 
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                isEmailVerified: false
            }
        }
    });
});


// Verify email 
const verifyEmail = catchAsync(async (req, res, next) => {
    const { email, verificationCode } = req.body;

    if(!email || !verificationCode) {
        return next(new AppError("Email and verification code are required", 400))
    }

    const hashedToken = crypto.createHash("sha256").update(verificationCode).digest("hex");

    const user = await User.findOne({
        email,
        emailVerificationToken: hashedToken,
        emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
        return next(new AppError("Invalid or expired verification code", 400))
    }

    user.isEmailVerified = true
    user.emailVerificationToken = undefined
    user.emailVerificationExpires = undefined
    await user.save({ validateBeforeSave: false })

    const token = createToken(user._id)

    res.status(200).json({
        status: 'success',
        message: 'Email verified successfully',
        token,
        data: {
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isEmailVerified: true
            }
        }
    });
})

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


// User forgot password
const forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError("Invalid credentials", 400))
    }

    const resetCode = Math.floor(10000 + Math.random() * 90000).toString();

    user.passwordResetToken = crypto.createHash("sha256").update(resetCode).digest("hex");
    user.passwordResetExpires = Date.now() + 5 * 60 * 1000;
    await user.save({ validateBeforeSave: false});

    // Read and customize template
    const templatePath = path.join(process.cwd(), 'src', 'templates', 'resetPasswordEmail.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    htmlTemplate = htmlTemplate
        .replace(/\$\{firstName\}/g, user.firstName)
        .replace(/\$\{resetCode\}/g, resetCode);


    // Create transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Send email
    await transporter.sendMail({
        from: process.env.EMAIL_FROM || "support@betperfect.com",
        to: user.email,
        subject: "Password Reset Code - betperfect.com",
        html: htmlTemplate
    });

    res.status(200).json({
        status: "success",
        message: "Reset code sent to email",
    });
})

// User Resetpassword
const resetPassword = catchAsync(async (req, res, next) => {
    const { email, resetCode, newPassword } = req.body;

    if (!email || !resetCode || !newPassword) {
        return next(new AppError("All fields required", 400));
    }

    const hashedToken = crypto.createHash("sha256").update(resetCode).digest("hex");

    const user = await User.findOne({
        email,
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    }).select("+passwordResetToken, +passwordResetExpires");


    if (!user) {
        return next(new AppError("Invalid or expired reset code", 400))
    }

    user.password = newPassword;


    // Clear reset fields
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    const token = createToken(user._id)

    res.status(200).json({
        status: 'success', 
        message: 'Password updated successfully',
        token,
        data: {
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        }
    })
})

// Logout User
const logoutUser = catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.cookies?.jwt;
    let token;

    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
        token = authHeader.split(/\s+/)[1]?.trim();
    }

    if (!token) {
        return next(new AppError('No token provided', 400))
    }

    const decoded = jwt.decode(token);
    if (decoded?.jti) {
        tokenBlacklist.addToken(decoded.jti);
    }

    res.status(200).json({
        status: 'success',
        message: 'Logged out successfully',
    })
})

// Protect Middleware
const protect = catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.cookies?.jwt;
    let token;

    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
        token = authHeader.split(/\s+/)[1]?.trim();
    }

    if (!token) return next(new AppError('Please log in to access resource', 401))
    
    const decodeUnsafe = jwt.decode(token)
    if (decodeUnsafe?.jti && await tokenBlacklist.isBlacklisted(decodeUnsafe.jti)) {
        return next(new AppError('Token invalidated. Please log in again', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id).select('+passwordChangedAt')
    if (!user) return next(new AppError('User no longer exists', 401));

    if (!user.isEmailVerified) {
        return next(new AppError('Please verify your email to access this resource', 403));
}

    if (typeof user.changedPasswordAfter === 'function' && user.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed password. Please log in again.', 401));
    }

    req.user = user.toObject ? user.toObject() : user;
    delete req.user.password;
    next();
})

export { registerUser, loginUser, logoutUser, protect, forgotPassword, resetPassword, verifyEmail };