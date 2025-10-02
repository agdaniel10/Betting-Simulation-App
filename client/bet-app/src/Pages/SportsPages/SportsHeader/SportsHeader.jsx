import React from "react";
import './SportsHeader.css'
import { NavLink } from "react-router-dom";

const SportsHeader = () => {

    const sports = [
        { id: 'home', label: 'Home', path: '/', end: true },
        { id: 'football', label: 'Football', path: '/footballpage'},
        { id: 'vfootball', label: 'vFootball', path: '/vfootball'},
        { id: 'basketball', label: 'Basketball', path: '/basketballball'},
        { id: 'tennis', label: 'Tennis', path: '/tennis'},
        { id: 'icehockey', label: 'Ice Hockey', path: '/icehockey'},
        { id: 'handball', label: 'Handball', path: '/handball'},
        { id: 'baseball', label: 'Baseball', path: '/baseball'},
        { id: 'americanFootball', label: 'American Football', path: '/americanFootball'},
        
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