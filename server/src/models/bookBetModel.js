import mongoose from "mongoose";

const bookedBetSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    
    bets: [{
        matchId: { type: String, required: true },
        teams: {
            home: String,
            away: String
        },
        betType: {
            type: String,
            enum: ['match_result', 'goals'], 
            required: true // Changed to true since you always send it
        },
        selection: {
            type: String,
            enum: [
                'home', 'draw', 'away',           // Match results
                'over15', 'under15'                // Goals (only 1.5 for now)
            ],
            required: true
        },
        goalLine: {
            type: String,
            enum: ['1.5', '2.5', '3.5', '4.5'],
            required: false // Optional since match_result bets don't have this
        },
        odds: { type: Number, required: true },
        kickOff: String,
        timestamp: Date // Added to match what you're sending
    }],
    
    totalOdds: {
        type: Number,
        required: true
    },
    
    stake: {
        type: Number,
        default: 0,
        min: 0 // Can't have negative stake
    },
    
    potentialWinning: {
        type: Number,
        default: 0,
        min: 0
    },
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Optional for guest bookings
    },
    
    createdAt: { 
        type: Date,
        default: Date.now,
        expires: 86400 // TTL in seconds (24 hours)
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Index for automatic deletion after 24 hours
bookedBetSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const BookedBet = mongoose.model('BookedBet', bookedBetSchema);

export default BookedBet;