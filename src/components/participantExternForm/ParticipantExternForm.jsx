import React from 'react'
import { useState } from 'react'


export default function ParticipantExternForm({ idProjecte, afegirParticipant }) {

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");


  const resetForm = () => {
    setNom("");
    setEmail("");

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const participant = {
      name: nom,
      email: email
    }

    afegirParticipant(idProjecte, participant);
    resetForm();
  };


  return (
    <form onSubmit={handleSubmit} className="formulari-blau">
      <label>
        Nom del participant:
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
      </label>
      <label>
        Correu electrònic:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <button type="submit">Afegir participant extern</button>
    </form>
  );
}
