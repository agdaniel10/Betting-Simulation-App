import React from "react";
import './FootballSidebar.css'
import { topSoccerLeagueCountries, remainingLeagues } from "../../../../Data/Countries/FootballCountries";

const FootballSidebar = ({ onLeagueSelect, selectedLeague }) => {
    
    const handleLeagueClick = (leagueName) => {
        onLeagueSelect(leagueName);
    };

    return (
        <div className="football-sidebar-container">
            <h3>Top Leagues</h3>

            <div className="top-league-container">
                {topSoccerLeagueCountries.map((league, index) => (
                    <span 
                        key={index} 
                        className={`top-league-span ${selectedLeague === league ? 'active' : ''}`}
                    >
                        <button
                            onClick={() => handleLeagueClick(league)}
                            className="league-button"
                        >
                            {league}
                        </button>
                    </span>
                ))}
            </div>

            <h3>A-Z</h3>

            <div className="other-league-container">
                {remainingLeagues.map((league, index) => (
                    <span 
                        key={index} 
                        className={`other-league-span ${selectedLeague === league ? 'active' : ''}`}
                    >
                        <button
                            onClick={() => handleLeagueClick(league)}
                            className="league-button"
                        >
                            {league}
                        </button>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default FootballSidebar;