import './LoginButton.css'
import { useState } from 'react';
import Login from '../../../Pages/Login/Login';
const LoginButton = () => {

    const [openLogin, setOpenLogin] = useState(false)

    return (
        <div>
            <button 
                className="login-btn"
                onClick={() => setOpenLogin(true)}
            >
                Login
            </button>

            < Login 
                isOpen={openLogin} 
                onClose={() => setOpenLogin(false)} 
            />
        </div>
    )
}

export default LoginButton;