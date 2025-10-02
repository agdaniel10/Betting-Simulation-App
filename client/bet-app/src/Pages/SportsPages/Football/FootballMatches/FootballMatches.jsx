import React from "react";
import './FootballMatches.css'
import { premierLeague } from "../../../../Data/Countries/EnglishFootball";

const FootballMatches = () => {


    return (
        <div className="football-matches-container">
            <h2>{premierLeague.title}</h2>

            <h3>04/10 Friday</h3>
            {premierLeague.matches.map((match, index) => (

                <div key={index} className="main-match-container">
                    <div className="match-id-time">
                        <p>{match.kickOff}</p>
                        <p>{match.id}</p>
                    </div>

                    <div>
                        <p>{match.home}</p>
                        <p>{match.away}</p>
                    </div>

                    <div className="odd-container">
                        <div>
                            {match.odds.homeWin}
                        </div>

                        <div>
                            {match.odds.draw}
                        </div>

                        <div>
                            {match.odds.awayWin}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FootballMatches;