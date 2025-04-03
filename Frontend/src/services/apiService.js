const API_URL = "http://localhost:7000/"; 
// Falls dein Backend anders laeuft (z.B. https://localhost:5000/api), bitte anpassen

// ========== ROOMS ==========
export async function getAllRooms() {
  const res = await fetch(`${API_URL}/rooms`);
  if (!res.ok) throw new Error("Fehler beim Laden der Räume");
  return res.json();
}

export async function getRoomById(id) {
  const res = await fetch(`${API_URL}/rooms/${id}`);
  if (!res.ok) throw new Error("Raum nicht gefunden");
  return res.json();
}

export async function createRoom(roomData) {
  const res = await fetch(`${API_URL}/rooms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(roomData)
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
  return res.json();
}

export async function updateRoom(id, roomData) {
  const res = await fetch(`${API_URL}/rooms/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(roomData)
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
  return res.json();
}

export async function deleteRoom(id) {
  const res = await fetch(`${API_URL}/rooms/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
  return res.json();
}

// ========== RESERVATIONS ==========
export async function getAllReservations() {
  const res = await fetch(`${API_URL}/reservations`);
  if (!res.ok) throw new Error("Fehler beim Laden der Reservierungen");
  return res.json();
}

export async function getReservationById(id) {
  const res = await fetch(`${API_URL}/reservations/${id}`);
  if (!res.ok) throw new Error("Reservierung nicht gefunden");
  return res.json();
}

export async function createReservation(data) {
  const res = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
  return res.json();
}

export async function updateReservation(id, data) {
  const res = await fetch(`${API_URL}/reservations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
  return res.json();
}

export async function deleteReservation(id) {
  const res = await fetch(`${API_URL}/reservations/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
  return res.json();
}
