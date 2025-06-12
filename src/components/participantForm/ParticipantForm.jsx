import React from 'react'
import { useState } from 'react';
import './ParticipantForm.css'
import ParticipantExternForm from '../participantExternForm/ParticipantExternForm';
import ParticipantRegistratForm from '../participantRegistratForm/ParticipantRegistratForm';

export default function ParticipantForm({ idProjecte, afegirParticipant }) {

  const [tipus, setTipus] = useState('registrat');

  
  return (
    <>
      <div className='participant-form' >
        <h3>Afegir participant</h3>
        <label>
          Tipus de participant:
          <select value={tipus} onChange={(e) => setTipus(e.target.value)}>
            <option value="registrat"> Usuari registrat</option>
            <option value="extern">Participant extern</option>
          </select>
        </label>
        {tipus === 'registrat' ? (<ParticipantRegistratForm idProjecte={idProjecte} afegirParticipant = {afegirParticipant}/>)
          :
          (<ParticipantExternForm idProjecte={idProjecte} afegirParticipant = {afegirParticipant}/>)}
      </div>
    </>
  )
}
