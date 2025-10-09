import './Logout.css'
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

const Logout = () => {

    const {logout} = useContext(AuthContext);

    <div>
        <button
            className='logout-btn'
            onClick={logout}
        >
            Logout
        </button>
    </div>
}

export default Logout;