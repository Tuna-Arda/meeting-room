import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/rooms">Räume</NavLink>
        </li>
        <li>
          <NavLink to="/reservations">Reservierungen</NavLink>
        </li>
        <li>
          <NavLink to="/calendar">Kalenderansicht</NavLink>
        </li>
      </ul>
    </nav>
  );
}
