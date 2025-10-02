import React from "react";
import './FootballSidebar.css'
import { NavLink } from "react-router-dom";
import { topSoccerLeagueCountries, remainingLeagues } from "../../../../Data/Countries/FootballCountries";

const FootballSidebar = () => {

    return (
        <div className="football-sidebar-container">
            <h3>Top Leagues</h3>

            <div className="top-league-container">
                {topSoccerLeagueCountries.map((league, index) => (
                    <span key={index} className="top-league-span">
                        <NavLink
                            to={''}
                        >
                            {league}
                        </NavLink>
                    </span>
                ))}
            </div>

            <h3>A-Z</h3>

            <div className="other-league-container">
                {remainingLeagues.map((league, index) => (
                    <span key={index} className="other-league-span">
                        <NavLink
                            to={''}
                        >
                            {league}
                        </NavLink>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default FootballSidebar;