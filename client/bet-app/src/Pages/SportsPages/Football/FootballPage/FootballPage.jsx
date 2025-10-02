import React from "react";
import './FootballPage.css'
import FootballSidebar from "../FootballSidebar/FootballSidebar";
import FootballMatches from "../FootballMatches/FootballMatches";

const FootabllPage = () => {

    return (
        <div className="Football-page">
            <FootballSidebar />
            <div className="footballMatches-container">
                <FootballMatches />
            </div>
        </div>
    )
}

export default FootabllPage;