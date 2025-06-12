import React from 'react'
import './ProjecteForm.css'
import { useState } from 'react';
import './ProjecteForm.css';

export default function ProjecteForm({ afegirProjecte, participant }) {
  const [descripcio, setDescripcio] = useState("");

  const resetForm = () => {
    setDescripcio("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    const projecte = {
      descripcio: descripcio,
      despeses: [],
      participants: [participant.id],
    }

    console.log(projecte);
    afegirProjecte(projecte);
    resetForm();
  }

  return (
    <form className="projecte-form" onSubmit={handleSubmit}>
      <label className="projecte-form-label">
        <span className="projecte-form-label-span">Descripció</span>
        <input className="projecte-form-input" type="text" onChange={(e) => setDescripcio(e.target.value)} value={descripcio} />
      </label>

      <button className="projecte-form-button">Afegir</button>
    </form>

  )
}
