import React, { useContext } from "react";
import './FootballMatches.css'
import { BetslipContext } from "../../../../Contexts/BetslipContext/BetslipContext";


const FootballMatches = ({league}) => {

    const { addToBetSlip } = useContext(BetslipContext);

    // handleBetClick for goals
    const handleGoalBetClick = (match, goalLine, selection, odds) => {
        const bet = {
            matchId: match.id,
            match: match,
            betType: 'goals',
            goalLine: goalLine,
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
                            >
                                {match.odds.homeWin}
                            </button>

                            <button
                                onClick={() => handleMatchResultClick(match, 'draw', match.odds.draw)}
                            >
                                {match.odds.draw}
                            </button>

                            <button
                                onClick={() => handleMatchResultClick(match, 'away', match.odds.awayWin)}
                            >
                                {match.odds.awayWin}
                            </button>
                        </div>

                        <div className="odd-container-goals">
                            <select name="" id="">
                                <option value="">1.5</option>
                                <option value="">2.5</option>
                                <option value="">3.5</option>
                                <option value="">4.5</option>
                            </select>
                            <button
                                onClick={() => handleGoalBetClick(match, 'over', match.odds.over15)}
                            >
                                {match.odds.over15}
                            </button>

                            <button
                                onClick={() => handleGoalBetClick(match, 'under', match.odds.under15)}
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