import React, { useEffect, useState } from "react";
import { getAllReservations } from "../services/apiService";

export default function CalendarView() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getAllReservations()
      .then(data => setReservations(data))
      .catch(err => console.error(err));
  }, []);

  // sehr rudimentäre "Kalender"-Liste nach Startzeit sortiert
  const sorted = [...reservations].sort(
    (a, b) => new Date(a.startTime) - new Date(b.startTime)
  );

  return (
    <div>
      <h2>Kalenderansicht (rudimentär)</h2>
      <ul>
        {sorted.map((res) => (
          <li key={res.id}>
            <strong>{res.roomId}:</strong> {res.startTime} - {res.endTime},
            {res.reservedBy} ({res.purpose})
          </li>
        ))}
      </ul>
    </div>
  );
}
