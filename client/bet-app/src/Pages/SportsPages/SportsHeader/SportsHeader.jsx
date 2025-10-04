import React from "react";
import './SportsHeader.css'
import { NavLink } from "react-router-dom";

const SportsHeader = () => {

    const sports = [
        { id: 'home', label: 'Home', path: '/sports', end: true },
        { id: 'football', label: 'Football', path: '/sports/football'},
        { id: 'vfootball', label: 'vFootball', path: '/sports/vfootball'},
        { id: 'basketball', label: 'Basketball', path: '/sports/basketball'},
        { id: 'tennis', label: 'Tennis', path: '/sports/tennis'},
        { id: 'icehockey', label: 'Ice Hockey', path: '/sports/ice-hockey'},
        { id: 'handball', label: 'Handball', path: '/sports/handball'},
        { id: 'baseball', label: 'Baseball', path: '/sports/baseball'},
        { id: 'americanFootball', label: 'American Football', path: '/sports/american-football'},
    ]

    return (
        <div className="sports-header-container">
            <ul>
                {sports.map((sport) => (
                    <li key={sport.id}>
                        <NavLink
                            to={sport.path}
                            end={sport.end}
                        >
                            {sport.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SportsHeader;