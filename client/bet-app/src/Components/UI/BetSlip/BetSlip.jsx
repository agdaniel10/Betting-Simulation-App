import React, { useContext } from "react";
import './BetSlip.css'
import BetSlipLoad from "./BetSlipLoad/BetSlipLoad";
import BetSlipFilled from "./BetSlipFilled/BetSlipFilled";
import { BetslipContext } from "../../../Contexts/BetslipContext/BetslipContext";

const BetSlip = () => {

    const { betSlip } = useContext(BetslipContext)

    return (
        <div className="betlip-container">
            <div className="betslip-container-header">
                <h2>BetSlip</h2>
            </div>

            <div>
                {betSlip.length > 0 ? 
                    <BetSlipFilled betSlip={betSlip} /> : 
                    <BetSlipLoad />
                }
            </div>
        </div>
    )
}

export default BetSlip;