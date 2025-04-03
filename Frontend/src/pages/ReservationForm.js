import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getReservationById,
  createReservation,
  updateReservation,
  getAllRooms
} from "../services/apiService";

export default function ReservationForm() {
  const [roomId, setRoomId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reservedBy, setReservedBy] = useState("");
  const [purpose, setPurpose] = useState("");
  const [rooms, setRooms] = useState([]);

  const { id } = useParams(); // Reservation ID
  const navigate = useNavigate();

  useEffect(() => {
    // Räume laden
    getAllRooms()
      .then(data => setRooms(data))
      .catch(err => console.error(err));

    if (id) {
      // Reservierung laden (zum Editieren)
      getReservationById(id)
        .then(res => {
          setRoomId(res.roomId);
          setStartTime(res.startTime);
          setEndTime(res.endTime);
          setReservedBy(res.reservedBy);
          setPurpose(res.purpose);
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    // Kurze Plausibilitätsprüfung
    if (!roomId) {
      alert("Bitte einen Raum auswählen!");
      return;
    }
    if (!startTime || !endTime) {
      alert("Bitte Start- und Endzeit angeben!");
      return;
    }
    if (new Date(startTime) >= new Date(endTime)) {
      alert("Endzeit muss nach Startzeit liegen!");
      return;
    }

    const reservation = {
      roomId,
      startTime,
      endTime,
      reservedBy,
      purpose
    };

    if (id) {
      updateReservation(id, reservation)
        .then(() => navigate("/reservations"))
        .catch(err => alert(err.message));
    } else {
      createReservation(reservation)
        .then(() => navigate("/reservations"))
        .catch(err => alert(err.message));
    }
  }

  return (
    <div>
      <h2>
        {id ? "Reservierung bearbeiten" : "Neue Reservierung anlegen"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Raum:</label>
          <select
            value={roomId}
            onChange={e => setRoomId(e.target.value)}
          >
            <option value="">-- Raum auswählen --</option>
            {rooms.map(r => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Startzeit:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
          />
        </div>

        <div>
          <label>Endzeit:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
          />
        </div>

        <div>
          <label>Reserviert von:</label>
          <input
            type="text"
            value={reservedBy}
            onChange={e => setReservedBy(e.target.value)}
          />
        </div>

        <div>
          <label>Zweck:</label>
          <input
            type="text"
            value={purpose}
            onChange={e => setPurpose(e.target.value)}
          />
        </div>

        <button type="submit">Speichern</button>
      </form>
    </div>
  );
}
