import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register/Register';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import VerifyEmail from './Pages/VerifyEmail/VerifyEmail';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='verifyemail' element={<VerifyEmail />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;