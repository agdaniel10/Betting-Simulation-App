import React from "react";
import './Sports.css'
import SportsHeader from "../SportsPages/SportsHeader/SportsHeader";
import FootabllPage from "../SportsPages/Football/FootballPage/FootballPage";

const Sports = () => {

    return (
        <div>
            <SportsHeader />

            <div>
                < FootabllPage />
            </div>
        </div>
    )
}

export default Sports;