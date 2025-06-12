import React from 'react'
import ProjectesLlista from '../../components/projectesLlista/ProjectesLlista';
import { useState, useEffect } from 'react';
import { onGetCollection, afegirProjecte, getParticipantAmbUid, eliminarProjecte } from '../../firebase/firebase';
import Modal from '../../components/modal/Modal'; '..'
import ProjecteForm from '../../components/projecteForm/ProjecteForm';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './Projectes.css'

export default function Projectes() {

  const [mostrarModalAfegir, setMostrarModalAfegir] = useState(false)
  const [projectes, setProjectes] = useState([]);
  const [user, setUser] = useState(null);
  const [participant, setParticipant] = useState(null);

  const handleAfegirProjecte = async (nouProjecte) => {

    console.log("Afegir nou projecte", nouProjecte)
    await afegirProjecte(nouProjecte);

  }

  const handleTancar = () => {
    setMostrarModalAfegir(false);
    console.log(mostrarModalAfegir);
  }

  //Primer carregam usuari i participant

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (user) {
        setUser(user);
        const participantData = await getParticipantAmbUid(user.uid);
        setParticipant(participantData)

      } else {
        setUser(null);
        setParticipant(null);
      }
    });

    return () => unsubscribe();
  }, [])


  //Despres carregam els projectes només on apareix l'usuari com a participant

  useEffect(() => {
    if (!participant) return; //Espera a que el participant estigui disponible

    const unsubscribe = onGetCollection("projectes", (querySnapshot) => {
      let totsElsProjectes = [];

      querySnapshot.forEach((doc) => {
        totsElsProjectes.push({ ...doc.data(), id: doc.id });
      });

      //Filtrar per veure només els projectes on hi ha l'usuari registrat com a participant.
      const projectesUsuari = totsElsProjectes.filter((projecte) => projecte.participants.includes(participant.id));
      setProjectes(projectesUsuari)
    });
    return () => unsubscribe();
  }, [participant])

  const handleMostrarModalAfegir = () => {
    setMostrarModalAfegir(true);

  }

  const handleEliminarProjecte = (idProjecte) => {
    eliminarProjecte(idProjecte);

  }

  return (
    <div className="pagina-projectes">
      <h1>Llista de Projectes</h1>
      <h3>Projectes que has creat i en els que participes</h3>

      {projectes && (
        <ProjectesLlista
          projectes={projectes}
          handleEliminarProjecte={handleEliminarProjecte}
        />
      )}

      {mostrarModalAfegir && (
        <Modal handleTancar={handleTancar}>
          <ProjecteForm
            afegirProjecte={handleAfegirProjecte}
            participant={participant}
          />
        </Modal>
      )}

      <div className="afegir-projecte-container">
        <button
          className="boto-afegir-projecte"
          onClick={handleMostrarModalAfegir}
        >
          Afegir projecte
        </button>
      </div>
    </div>
  )
}
