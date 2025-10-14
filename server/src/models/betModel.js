import mongoose from "mongoose";

const betSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    betCode: {
        type: String,
        unique: true,
        required: true
    },

    // Array of individual bets (for accumulator/multiple bets)
    bets: [{
        matchId: {
            type: String,
            required: true
        },
        teams: {
            home: { type: String, required: true },
            away: { type: String, required: true }
        },
        kickOff: {
            type: Date,
            required: true
        },
        selection: {
            type: String,
            enum: [
                'home', 'draw', 'away',
                'over1.5', 'under1.5',
                'over2.5', 'under2.5',
                'gg', 'ng'
            ],
            required: true
        },
        goalLine: {
            type: String,
            enum: ['1.5', '2.5', '3.5'],
            required: false
        },
        odds: {
            type: Number,
            required: true,
            min: 1.01
        },
        result: {
            type: String,
            enum: ['pending', 'won', 'lost', 'void'],
            default: 'pending'
        }
    }],

    totalOdds: {
        type: Number,
        required: true,
        min: 1.01
    },

    stake: {
        type: Number,
        required: true,
        min: 100
    },

    potentialWinning: {
        type: Number,
        required: true,
        min: 0
    },

    // Overall bet status
    status: {
        type: String,
        enum: ['pending', 'won', 'lost', 'partially_won', 'cancelled'],
        default: 'pending'
    },
    
    paid: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    settledAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Generate unique bet code before saving
betSchema.pre('save', async function(next) {
    if (!this.betCode) {
        this.betCode = `BET${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    }
    next();
});

const Bet = mongoose.model('Bet', betSchema);
export default Bet;