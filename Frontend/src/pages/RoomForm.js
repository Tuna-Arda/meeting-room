import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createRoom, getRoomById, updateRoom } from "../services/apiService";

export default function RoomForm() {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [equipment, setEquipment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Raum laden, wenn wir im "Edit"-Modus sind
      getRoomById(id)
        .then(room => {
          setName(room.name);
          setCapacity(room.capacity);
          setEquipment((room.equipment || []).join(", "));
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      alert("Raumname darf nicht leer sein!");
      return;
    }

    const newRoom = {
      name: name.trim(),
      capacity: Number(capacity),
      equipment: equipment.split(",").map(e => e.trim())
    };

    if (id) {
      // Update
      updateRoom(id, newRoom)
        .then(() => navigate("/rooms"))
        .catch(err => console.error(err));
    } else {
      // Create
      createRoom(newRoom)
        .then(() => navigate("/rooms"))
        .catch(err => console.error(err));
    }
  }

  return (
    <div>
      <h2>{id ? "Raum bearbeiten" : "Neuen Raum anlegen"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Raumname:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Kapazität:</label>
          <input
            type="number"
            value={capacity}
            onChange={e => setCapacity(e.target.value)}
          />
        </div>

        <div>
          <label>Ausstattung (Komma-getrennt):</label>
          <input
            type="text"
            value={equipment}
            onChange={e => setEquipment(e.target.value)}
          />
        </div>

        <button type="submit">Speichern</button>
      </form>
    </div>
  );
}
