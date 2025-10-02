import React from "react";
import './Sports.css'
import SportsHeader from "../SportsPages/SportsHeader/SportsHeader";
import FootabllPage from "../SportsPages/Football/FootballPage/FootballPage";
import BetSlip from "../../Components/UI/BetSlip/BetSlip";

const Sports = () => {

    return (
        <>
        <div>
            <div className="sports-header-stick">
                <SportsHeader />
            </div>

            <div className="sports-container">
                <div>
                    < FootabllPage />
                </div>

                <div className="betslip">
                    <BetSlip />
                </div>
            </div>
        </div>
        </>
    )
}

export default Sports;