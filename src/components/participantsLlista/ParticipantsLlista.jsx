import React from 'react'

import { getItem } from '../../firebase/firebase';
import { getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import './ParticipantsLlista.css'

export default function ParticipantsLlista({ idsParticipants, handleEliminar, idProjecte }) {

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const obtenirParticipants = async () => {
      const resultats = [];

      for (let id of idsParticipants) {
        const docRef = getItem("participants", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          resultats.push({ id: docSnap.id, ...docSnap.data() });
        }
      }

      setParticipants(resultats);
    };

    if (idsParticipants?.length > 0) {
      obtenirParticipants();
    }
  }, [idsParticipants]);

  return (
    // <div>

    //     <ul>{participants.map((p) => (

    //         <li key = {p.id}>{p.name} ({p.email})</li>
    //     ))}</ul>
    // </div>

    <div className="participants-container">
      <h3 className="participants-title">Participants del projecte</h3>

      <ul className="participants-list">
        {participants.map((participant) => (
          <li key={participant.id} className="participant-item">
            <span className="participant-nom">{participant.name}</span>
            <span className="participant-email">{participant.email}</span>
            <div><button
              className="participant-eliminar"
              onClick={() => {
                handleEliminar(idProjecte, participant.id)
                setParticipants((prev) => prev.filter((p) => p.id !== participant.id));
              }}
            >

              Eliminar
            </button></div>
          </li>
        ))}
      </ul>

      <div className="participants-actions">
        {/* <button className="participants-button"> 
          Afegir participant
        </button> */}
      </div>
    </div>
  )
}
