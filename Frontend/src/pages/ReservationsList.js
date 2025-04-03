import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllReservations, deleteReservation } from "../services/apiService";

export default function ReservationsList() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    loadReservations();
  }, []);

  function loadReservations() {
    getAllReservations()
      .then(data => setReservations(data))
      .catch(err => console.error(err));
  }

  function handleDelete(resId) {
    if (window.confirm("Reservierung wirklich löschen?")) {
      deleteReservation(resId)
        .then(() => loadReservations())
        .catch(err => console.error(err));
    }
  }

  return (
    <div>
      <h1>Reservierungen</h1>
      <Link to="/reservations/new">+ Neue Reservierung anlegen</Link>

      <table>
        <thead>
          <tr>
            <th>Raum</th>
            <th>Startzeit</th>
            <th>Endzeit</th>
            <th>Reserviert von</th>
            <th>Zweck</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(r => (
            <tr key={r.id}>
              <td>{r.roomName || r.roomId}</td>
              <td>{r.startTime}</td>
              <td>{r.endTime}</td>
              <td>{r.reservedBy}</td>
              <td>{r.purpose}</td>
              <td>
                <Link to={`/reservations/edit/${r.id}`}>Bearbeiten</Link>{" "}
                |{" "}
                <button onClick={() => handleDelete(r.id)}>
                  Löschen
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
