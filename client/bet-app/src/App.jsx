import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register/Register';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import VerifyEmail from './Pages/VerifyEmail/VerifyEmail';
import Promotions from './Pages/Promotions/Promotions';
import Blog from './Pages/Blog/Blog';
import Results from './Pages/Results/Results';
import Sports from './Pages/Sports/Sports';
import Header from './Components/Layout/Header/Header';
import Application from './Pages/Application/Application';

function App() {
  return (
    <Router>
      <Header />
      <div className="app-container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='sports' element={<Sports />} />
          <Route path='promotions' element={<Promotions />} />
          <Route path='blog' element={<Blog />} />
          <Route path='application' element={<Application />} />
          <Route path='results' element={<Results />} />
          <Route path='register' element={<Register />} />
          <Route path='verifyemail' element={<VerifyEmail />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;