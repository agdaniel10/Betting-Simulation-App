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
            required: true
        },
        selection: {
            type: String,
            enum: [
                'home', 'draw', 'away',         
                'over15', 'under15',               
                'over25', 'under25',               
                'over35', 'under35',              
                'over45', 'under45'              
            ],
            required: true
        },
        goalLine: {
            type: String,
            enum: ['1.5', '2.5', '3.5', '4.5'],
            required: false
        },
        odds: { type: Number, required: true },
        kickOff: String
    }],
    
    totalOdds: {
        type: Number,
        required: true
    },
    
    stake: {
        type: Number,
        default: 0
    },
    
    potentialWinning: {
        type: Number,
        default: 0
    },
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    
    createdAt: { 
        type: Date,
        default: Date.now,
        expires: 86400
    }
}, {
    timestamps: true
});

// Index for automatic deletion after 24 hours
bookedBetSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const BookedBet = mongoose.model('BookedBet', bookedBetSchema);

export default BookedBet