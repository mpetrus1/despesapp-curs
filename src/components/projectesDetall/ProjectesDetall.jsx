import React from 'react'
import './ProjectesDetall.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db, onGetItem, eliminarDespesaDeProjecte, eliminarParticipantDeProjecte, afegirDespesaAProjecte, afegirParticipantAProjecte } from '../../firebase/firebase';
import ParticipantsLlista from '../participantsLlista/ParticipantsLlista';
import DespesesLlista from '../despesesLlista/DespesesLlista';
import Modal from '../modal/Modal';
import DespesaForm from '../despesaForm/DespesaForm';
import ParticipantForm from '../participantForm/ParticipantForm';


export default function ProjectesDetall() {

  const { id } = useParams();
  const [projecte, setProjecte] = useState(null);
  const [mostrarModalDespesa, setMostrarModalDespesa] = useState(false);
  const [mostrarModalParticipant, setMostrarModalParticipant] = useState(false);
  const [participantsComplerts, setParticipantsComplerts] = useState([]);

  const handleEliminarDespesa = (idProjecte, idDespesa) => {
    eliminarDespesaDeProjecte(idProjecte, idDespesa)
  }

  const handleEliminarParticipant = (idProjecte, idParticipant) => {
    console.log("Abans deliminar participant de projecte", projecte);
    eliminarParticipantDeProjecte(idProjecte, idParticipant)
    console.log("Despres deliminar participant de projecte", projecte);
  }

  const afegirDespesa = (idProjecte, despesa) => {
    afegirDespesaAProjecte(idProjecte, despesa)
    setMostrarModalDespesa(false);
  }

  const afegirParticipant = async (idProjecte, participant) => {
    await afegirParticipantAProjecte(idProjecte, participant)
    setMostrarModalParticipant(false);
  }




  useEffect(() => {
    const unsubscribe = onGetItem("projectes", id, async (docSnap) => {
      if (docSnap.exists()) {
        const dadesProjecte = { ...docSnap.data(), id: docSnap.id };
        setProjecte(dadesProjecte);

        const participantDocs = await Promise.all(
          dadesProjecte.participants.map(async (participantId) => {
            const docRef = doc(db, "participants", participantId);
            const docSnap = await getDoc(docRef);
            return { id: docSnap.id, ...docSnap.data() };
          })
        );

        setParticipantsComplerts(participantDocs);
      } else {
        setProjecte(null);
      }
    });
    return () => unsubscribe();
  }, [id]);

  if (!projecte) return <p>Projecte no trobat</p>
  console.log("El projecte te aquestes dades pel detall", projecte);

  const handleTancarDespesa = () => {
    setMostrarModalDespesa(false);
  }

  const handleTancarParticipant = () => {
    setMostrarModalParticipant(false);
  }

  const handleMostrarModalDespesa = () => {
    setMostrarModalDespesa(true);
  }

  const handleMostrarModalParticipant = () => {
    setMostrarModalParticipant(true);
  }
  
  return (
    <div>
      <h2>Detall del projecte</h2>
      <h2><strong>Descripcio: </strong>{projecte.descripcio}</h2>
      <div className='participants-container'>
        <ParticipantsLlista idsParticipants={projecte.participants} handleEliminar={handleEliminarParticipant} idProjecte={id} />
        <button className="participants-button" onClick={handleMostrarModalParticipant}>Afegir participant</button>

      </div>
      {mostrarModalParticipant && <Modal handleTancar={handleTancarParticipant}>
        <ParticipantForm afegirParticipant={afegirParticipant} idProjecte={id} />
      </Modal>}

      <div className='despeses-container'>
        <DespesesLlista
          idsDespeses={projecte.despeses} handleEliminar={handleEliminarDespesa} idProjecte={id}
        />
        <button className="despeses-button" onClick={handleMostrarModalDespesa}>Afegir despesa</button>
      </div>
      {mostrarModalDespesa && <Modal handleTancar={handleTancarDespesa}>
        <DespesaForm afegirDespesa={afegirDespesa} idProjecte={id} participants={participantsComplerts}/>
      </Modal>}
    </div>
  )
}
