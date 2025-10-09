import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Pages/Register/Register";
import "./App.css";
import Login from "./Pages/Login/Login";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import Promotions from "./Pages/Promotions/Promotions";
import Blog from "./Pages/Blog/Blog";
import Results from "./Pages/Results/Results";
import Sports from "./Pages/Sports/Sports";
import Header from "./Components/Layout/Header/Header";
import Application from "./Pages/Application/Application";
import ForgotPassword from "./Pages/ForgetPassword/ForgotPassword";
import FootballPage from "./Pages/SportsPages/Football/FootballPage/FootballPage";
import BasketballPage from "./Pages/SportsPages/BasketBall/BasketBallPage/BasketBallPage";
import SportsHome from "./Pages/SportsPages/SportsHome/SportsHome";
// import BasketballPage from "./Pages/SportsPages/Basketball/BasketballPage";
// import TennisPage from "./Pages/SportsPages/Tennis/TennisPage";
// import SportsHome from "./Pages/SportsPages/Home/SportsHome";

function App() {
  return (
    <Router>
      <Header />
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Navigate to="/sports" replace />} />
          
          {/* Sports Routes - Nested */}
          <Route path="/sports/*" element={<Sports />}>
            <Route index element={<SportsHome />} />
            <Route path="football" element={<FootballPage />} />
            <Route path="basketball" element={<BasketballPage />} />
            {/* <Route path="tennis" element={<TennisPage />} />
            <Route path="vfootball" element={<VFootballPage />} />
            <Route path="ice-hockey" element={<IceHockeyPage />} />
            <Route path="handball" element={<HandballPage />} />
            <Route path="baseball" element={<BaseballPage />} />
            <Route path="american-football" element={<AmericanFootballPage />} /> */}
          </Route>

          <Route path="/promotions" element={<Promotions />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/results" element={<Results />} />

          {/* Auth Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          {/* Application */}
          <Route path="/application" element={<Application />} />

          {/* Catch-all Not Found */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;