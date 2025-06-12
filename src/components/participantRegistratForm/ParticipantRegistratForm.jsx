import React, { useEffect, useState } from 'react'
import { getParticipantsRegistrats } from '../../firebase/firebase';


export default function ParticipantRegistratForm({ idProjecte, afegirParticipant }) {
  const [participants, setParticipants] = useState([]);
  const [seleccionat, setSeleccionat] = useState("");

  useEffect(() => {
    const carregarParticipants = async () => {
      const participantsRegistrats = await getParticipantsRegistrats();
      setParticipants(participantsRegistrats);
    };
    carregarParticipants();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (seleccionat) {
      const participant = participants.find(p => p.id === seleccionat);
      afegirParticipant(idProjecte, participant);
    }
  };
  
  return (
    <form className="participant-registrat-form" onSubmit={handleSubmit}>
      <label>
        Selecciona un usuari registrat:
        <select value={seleccionat} onChange={(e) => setSeleccionat(e.target.value)} required>
          <option value=""> Escull un participant</option>
          {participants.map(p => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.email})
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Afegir al projecte</button>
    </form>
  );
}
