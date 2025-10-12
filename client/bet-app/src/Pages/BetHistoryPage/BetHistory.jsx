import './BetHistory.css'

const BetHistory = () => {

    return (
        <div className='sports-bets-container'>
            <div className='sports-bet-header'>
                <h1>Sport Bets</h1>

                <div className='category-buttons'>
                    <button>All</button>
                    <button>Settled</button>
                    <button>Unsettled</button>
                </div>

                
            </div>

        </div>
    )
}

export default BetHistory;