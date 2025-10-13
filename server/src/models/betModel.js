import mongoose, { mongo } from "mongoose";

const betModel = new mongoose.Schema({
    code: {
        type: String,
        unique: true, 
        required: true,
    },

    betID: {
        type: Number,
        required: true
    },

    bets: {
        matchId : {type: Number, required: true},
        teams: {
            home: String,
            away: String
        },

        kickOff: String,
        selection: {
            type: String,
            enum: [
                'home', 'draw', 'away',       
                'over15', 'under15'   
            ],
            required: true
        },

        goalLine: {
            type: String,
            enum: ['1.5'],
            required: false 
        },
        odds: { type: Number, required: true },
        timeStamp: Date
    },

    totalOdds: {
        type: Number,
        required: true
    },

    stake: {
        type: Number,
        required: true,
        min: 0
    },

    potentialWinning: {
        type: Number,
        required: true,
        min: 0
    },

    createdAt: {
        type: Date,
        default: Date
    }
})

const Bets = mongoose.model('Bets', betModel)
export default Bets