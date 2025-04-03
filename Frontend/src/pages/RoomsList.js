import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRooms, deleteRoom } from "../services/apiService";

export default function RoomsList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    loadRooms();
  }, []);

  function loadRooms() {
    getAllRooms()
      .then(data => setRooms(data))
      .catch(err => console.error(err));
  }

  function handleDelete(roomId) {
    if (window.confirm("Raum wirklich löschen?")) {
      deleteRoom(roomId)
        .then(() => loadRooms())
        .catch(err => console.error(err));
    }
  }

  return (
    <div>
      <h1>Besprechungsräume</h1>
      <Link to="/rooms/new" className="btn btn-primary">
        + Neuen Raum anlegen
      </Link>
      <table>
        <thead>
          <tr>
            <th>Raumname</th>
            <th>Kapazität</th>
            <th>Ausstattung</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{room.capacity}</td>
              <td>{(room.equipment || []).join(", ")}</td>
              <td>
                <Link to={`/rooms/edit/${room.id}`}>Bearbeiten</Link>{" "}
                |{" "}
                <button onClick={() => handleDelete(room.id)}>
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
