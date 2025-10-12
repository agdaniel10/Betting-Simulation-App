import BetSlip from '../../Components/UI/BetSlip/BetSlip';
import BetHistory from './BetHistory';
import './BetHistoryPage.css';

const BetHistoryPage = () => {

    return (
        <div className='bethistory-page-container'>
            <div className='history-container'>
                <BetHistory />
            </div>
            <BetSlip />
        </div>
    )
}

export default BetHistoryPage;