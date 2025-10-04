import React, { useState } from "react";
import './FootballPage.css'
import FootballSidebar from "../FootballSidebar/FootballSidebar";
import FootballMatches from "../FootballMatches/FootballMatches";

import { premierLeague, laLiga, serieA, bundesliga, ligue1 } from "../../../../Data/Countries/EnglishFootball";

const FootballPage = () => {
    // State to track selected league name
    const [selectedLeagueName, setSelectedLeagueName] = useState(null);

    // Default leagues to show when nothing is selected
    const defaultLeagues = [premierLeague, laLiga, serieA, bundesliga, ligue1];

    // Map league names to their data
    const leagueDataMap = {
        'International': null,
        'International clubs': null,
        'England': premierLeague,
        'Spain': laLiga,
        'Germany': bundesliga,
        'Italy': serieA,
        'France': ligue1
    };

    // Handle league selection from sidebar
    const handleLeagueSelect = (leagueName) => {
        setSelectedLeagueName(leagueName);
    };

    // Handle going back to default view
    const handleBackToAll = () => {
        setSelectedLeagueName(null);
    };

    // Get the league data based on selected name
    const selectedLeagueData = selectedLeagueName ? leagueDataMap[selectedLeagueName] : null;

    return (
        <div className="Football-page">
            <div>
                <FootballSidebar 
                    onLeagueSelect={handleLeagueSelect}
                    selectedLeague={selectedLeagueName}
                />
            </div>
                     
            <div className="footballMatches-container">
                {selectedLeagueData ? (
                    // Show only the selected league
                    <>
                        <button 
                            onClick={handleBackToAll}
                            className="back-to-all-btn"
                        >
                            ← Back to All Leagues
                        </button>
                        <FootballMatches league={selectedLeagueData} />
                    </>
                ) : selectedLeagueName ? (
                    // League selected but no data available
                    <div className="no-data-message">
                        <p>Data for {selectedLeagueName} is not available yet.</p>
                        <button onClick={handleBackToAll} className="back-to-all-btn">
                            ← Back to All Leagues
                        </button>
                    </div>
                ) : (
                    // Show default leagues
                    <>
                        {defaultLeagues.map((league, index) => (
                            <FootballMatches 
                                key={league.id || index} 
                                league={league} 
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default FootballPage;