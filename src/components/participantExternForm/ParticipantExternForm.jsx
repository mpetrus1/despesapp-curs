import React from 'react'
import { useState } from 'react'
import { afegirParticipantAProjecte } from '../../firebase/firebase';

export default function ParticipantExternForm({ idProjecte }) {

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

    afegirParticipantAProjecte(idProjecte, participant);
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
