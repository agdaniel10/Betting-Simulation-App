import './Sports.css';
import { Outlet } from 'react-router-dom';
import SportsHeader from "../SportsPages/SportsHeader/SportsHeader";
import BetSlip from "../../Components/UI/BetSlip/BetSlip";

const Sports = () => {
    return (
        <div className="sports-container-div">
            <div className="sports-header-stick">
                <SportsHeader />
            </div>
            
            <div className="sports-container">
                <div>
                    <Outlet />
                </div>
                
                <div className="betslip">
                    <BetSlip />
                </div>
            </div>
        </div>
    );
}

export default Sports;