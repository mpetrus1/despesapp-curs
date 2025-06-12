import React from 'react'
import { Link } from 'react-router-dom'
import './DespesesLlista.css'
import { getItem } from '../../firebase/firebase';
import { getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';



export default function DespesesLlista({ idsDespeses, handleEliminar, idProjecte }) {

  const [despeses, setDespeses] = useState([]);
  const [participants, setParticipants] = useState([])


  useEffect(() => {
    const obtenirDespeses = async () => {
      const resultats = [];

      for (let id of idsDespeses) {
        const docRef = getItem("despeses", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          resultats.push({ id: docSnap.id, ...docSnap.data() });
        }
      }

      setDespeses(resultats);

      //Carregar participants
      const docRef = getItem("projectes", idProjecte);
      const docSnap = await getDoc(docRef);
      const participantsIds = docSnap.data().participants;

      const participantsCarregats = [];
      for (let id of participantsIds) {
        const pRef = getItem("participants", id);
        const pSnap = await getDoc(pRef);
        if (pSnap.exists()) {
          participantsCarregats.push({ id: pSnap.id, ...pSnap.data() });
        }
      }

      setParticipants(participantsCarregats);
    };



    if (idsDespeses?.length > 0) {
      obtenirDespeses();
    }
  }, [idsDespeses, idProjecte]);



  return (
    <div className="despeses-container">
      <h3 className="despeses-title">Llista de despeses</h3>
      <ul className="despeses-list">
        {despeses.map((despesa) => (

          <li key={despesa.id} className="despesa-item">
            <div><strong>Concepte:</strong> {despesa.concepte}</div>
            <div><strong>Pagat per:</strong> {participants.find(p => p.id === despesa.pagatPer)?.name || "Desconegut"}</div>
            <div><strong>Quantia:</strong> {despesa.quantia} €</div>
            <button
              className="despesa-eliminar"
              onClick={() => {
                handleEliminar(idProjecte, despesa.id)
                setDespeses((prev) => prev.filter((d) => d.id !== despesa.id));
              }}
            >

              Eliminar
            </button>
            <Link to={`/despesa/${despesa.id}`}>
              <button className="despesa-veure">Veure detall</button>

            </Link>
          </li>

        ))}
      </ul>
    </div>
  )
}

