import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { onGetItem, getItem } from '../../firebase/firebase'
import { getDoc } from 'firebase/firestore';

import './DespesesDetall.css'
import RepartimentDespesa from '../repartimentDespesa/RepartimentDespesa';

export default function DespesesDetall() {

  const { id } = useParams();
  const [despesa, setDespesa] = useState(null);
  const [participant, setParticipant] = useState(null);
  const [participants, setParticipants] = useState([]);



  useEffect(() => {
    const unsubscribe = onGetItem("despeses", id, async (docSnap) => {
      if (docSnap.exists()) {
        const dadesDespesa = { id: docSnap.id, ...docSnap.data() };
        setDespesa(dadesDespesa);

        //Carregar dades del participant que ha pagat
        if (dadesDespesa.pagatPer) {
          try {
            const participantRef = getItem("participants", dadesDespesa.pagatPer);
            const participantSnap = await getDoc(participantRef);
            if (participantSnap.exists()) {
              setParticipant({ id: participantSnap.id, ...participantSnap.data() });
            } else {
              setParticipant(null);
            }
          } catch (error) {
            console.error("Error carregant participant:", error);
            setParticipant(null);
          }
        } else {
          setParticipant(null);
        }
        // Carregar participants del projecte
        if (dadesDespesa.idProjecte) {
          try {
            const projecteRef = getItem("projectes", dadesDespesa.idProjecte);
            const projecteSnap = await getDoc(projecteRef);
            if (projecteSnap.exists()) {
              const idsParticipants = projecteSnap.data().participants || [];
              const participantsArray = [];

              for (let pid of idsParticipants) {
                const ref = getItem("participants", pid);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                  participantsArray.push({ id: snap.id, ...snap.data() });
                }
              }

              setParticipants(participantsArray);
            }
          } catch (error) {
            console.error("Error carregant participants del projecte:", error);
            setParticipants([]);
          }
        }

      } else {
        setDespesa(null);
        setParticipant(null);
      }
    });

    return () => unsubscribe();
  }, [id]);



  if (!despesa) return <p>Despesa no trobada</p>

  return (
    <div className="despesa-detall">
      <h2>Detall de la despesa</h2>
      <p><strong>Concepte: </strong>{despesa.concepte}</p>
      <p><strong>Quantia: </strong>{despesa.quantia}€</p>
      <p><strong>Pagat per: </strong>{participant ? `${participant.name} (${participant.email})` : "Participant no trobat"}</p>

      <div className="repartiment-container">
        <RepartimentDespesa importTotal={despesa.quantia} participants={participants} />
      </div>
    </div>

  )
}


