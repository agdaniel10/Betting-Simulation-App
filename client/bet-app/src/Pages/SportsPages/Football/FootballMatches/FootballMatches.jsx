import React, { useContext } from "react";
import './FootballMatches.css'
import { BetslipContext } from "../../../../Contexts/BetslipContext/BetslipContext";


const FootballMatches = ({league}) => {

    const { betSlip, addToBetSlip } = useContext(BetslipContext);

    const selectedBets = (matchID, selection) => {
        return betSlip.some((bet) => bet.matchId === matchID && bet.selection === selection);
    }

    // handleBetClick for goals
    const handleGoalBetClick = (match, selection, odds) => {
        const bet = {
            matchId: match.id,
            match: match,
            betType: 'goals',
            goalLine: '1.5',
            selection: selection,
            odds: odds,
            teams: {
                home: match.home,
                away: match.away
            },
            kickOff: match.kickOff,
            timestamp: new Date().toISOString()
        };
        
        addToBetSlip(bet);
    };

    // handleBetClick for match results
    const handleMatchResultClick = (match, selection, odds) => {
        const bet = {
            matchId: match.id,
            match: match,
            betType: 'match_result',
            selection: selection,
            odds: odds,
            teams: {
                home: match.home,
                away: match.away
            },
            kickOff: match.kickOff,
            timestamp: new Date().toISOString()
        };
        
        addToBetSlip(bet);
    };


    return (
        <div className="football-matches-container">
            <h2>{league.title}</h2>

            <div className="main-options-div">
                <div className="match-date">
                    <p>04/10 Friday</p>
                </div>

                <div className="options-div">
                    <div className="options-div-1">
                        <p>1</p>
                        <p>X</p>
                        <p>2</p>
                    </div>

                    <div className="options-div-2">
                        <p>Goals</p>
                        <p>Over</p>
                        <p>Under</p>
                    </div>
                </div>
                
            </div>

            {league.matches.map((match, index) => (

                <div key={index} className="main-match-container">
                    <div className="main-match-cont-div">
                        <div className="match-id-time">
                            <p className="match-kick-off">{match.kickOff}</p>
                            <p className="match-id">ID: {match.id}</p>
                        </div>

                        <div className="match-div">
                            <p>{match.home}</p>
                            <p>{match.away}</p>
                        </div>
                    </div>

                    <div className="odd-main-container">
                        <div className="odd-container-wins">
                            <button
                                onClick={() => handleMatchResultClick(match, 'home', match.odds.homeWin)}
                                className={selectedBets(match.id, 'home') ? 'turn-blue' : ''}
                            >
                                {match.odds.homeWin}
                            </button>

                            <button
                                onClick={() => handleMatchResultClick(match, 'draw', match.odds.draw)}
                                className={selectedBets(match.id, 'draw') ? 'turn-blue' : ''}
                            >
                                {match.odds.draw}
                            </button>

                            <button
                                onClick={() => handleMatchResultClick(match, 'away', match.odds.awayWin)}
                                className={selectedBets(match.id, 'away') ? 'turn-blue' : ''}
                            >
                                {match.odds.awayWin}
                            </button>
                        </div>

                        <div className="odd-container-goals">
                            <span className="goal-line-label">1.5</span>
                            
                            <button
                                onClick={() => handleGoalBetClick(match, 'over15', match.odds.over15)}
                                className={selectedBets(match.id, 'over15') ? 'turn-blue' : ''}
                            >
                                {match.odds.over15}
                            </button>

                            <button
                                onClick={() => handleGoalBetClick(match, 'under15', match.odds.under15)}
                                className={selectedBets(match.id, 'under15') ? 'turn-blue' : ''}
                            >
                                {match.odds.under15}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FootballMatches;