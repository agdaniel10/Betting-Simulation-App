import React, { useState } from "react";
import './FootballPage.css'
import FootballSidebar from "../FootballSidebar/FootballSidebar";
import FootballMatches from "../FootballMatches/FootballMatches";

import { premierLeague, laLiga, serieA, bundesliga, ligue1 } from "../../../../Data/Countries/EnglishFootball";

const FootballPage = () => {

    const [selectedLeagueName, setSelectedLeagueName] = useState(null);

    const defaultLeagues = [premierLeague, laLiga, serieA, bundesliga, ligue1];

    const leagueDataMap = {
        'International': null,
        'International clubs': null,
        'England': premierLeague,
        'Spain': laLiga,
        'Germany': bundesliga,
        'Italy': serieA,
        'France': ligue1
    };

    const handleLeagueSelect = (leagueName) => {
        setSelectedLeagueName(leagueName);
    };

    const handleBackToAll = () => {
        setSelectedLeagueName(null);
    };

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

                    <div className="no-data-message">
                        <p>Data for {selectedLeagueName} is not available yet.</p>
                        <button onClick={handleBackToAll} className="back-to-all-btn">
                            ← Back to All Leagues
                        </button>
                    </div>
                ) : (

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