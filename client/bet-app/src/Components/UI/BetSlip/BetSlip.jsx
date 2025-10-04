import React, { useContext }from "react";
import './BetSlip.css'
import BetSlipLoad from "./BetSlipLoad/BetSlipLoad";
import BetSlipFilled from "./BetSlipFilled/BetSlipFilled";
import { BetslipContext } from "../../../Contexts/BetslipContext/BetslipContext";

const BetSlip = () => {

    const { betSlipCount } = useContext(BetslipContext)

    return (
        <div className="betlip-container">
            <div className="betslip-container-header">
                <h2>BetSlip</h2>
            </div>

            <div>
                {betSlipCount === 0 ?
                <BetSlipLoad /> : <BetSlipFilled />}
            </div>

            
        </div>
    )
}

export default BetSlip;