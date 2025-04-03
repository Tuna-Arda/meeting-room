import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

import RoomsList from "./pages/RoomsList";
import RoomForm from "./pages/RoomForm";
import ReservationsList from "./pages/ReservationsList";
import ReservationForm from "./pages/ReservationForm";
import CalendarView from "./pages/CalendarView";

import "./styles/styles.css";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="container">
        <Routes>
          <Route path="/" element={<RoomsList />} />
          <Route path="/rooms" element={<RoomsList />} />
          <Route path="/rooms/new" element={<RoomForm />} />
          <Route path="/rooms/edit/:id" element={<RoomForm />} />

          <Route path="/reservations" element={<ReservationsList />} />
          <Route path="/reservations/new" element={<ReservationForm />} />
          <Route path="/reservations/edit/:id" element={<ReservationForm />} />

          <Route path="/calendar" element={<CalendarView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
