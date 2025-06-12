import { useState } from 'react';
import './DespesaForm.css'


export default function DespesaForm({ idProjecte, participants, afegirDespesa }) {

  const [concepte, setConcepte] = useState("");
  const [quantia, setQuantia] = useState("");
  const [pagatPer, setPagatPer] = useState("");

  const resetForm = () => {
    setConcepte("");
    setQuantia("");
    setPagatPer("");
  }

  const handleSubmit = (e) => {
    e.preventDefault(); //evita que es tanqui la pantalla que és el comportament per defecte

    const despesa = {
      concepte: concepte,
      quantia: quantia,
      pagatPer: pagatPer,
      idProjecte: idProjecte
    }

    console.log(despesa);
    afegirDespesa(idProjecte, despesa);
    resetForm();
  }

  return (
    <form className='despesa-form' onSubmit={handleSubmit}>
      <label>
        <span>Concepte</span>
        <input type="text" onChange={(e) => setConcepte(e.target.value)} value={concepte} />
      </label>
      <label>
        <span>Quantia</span>
        <input type="text" onChange={(e) => setQuantia(e.target.value)} value={quantia} />
      </label>
      <label>
        <span>Pagat per</span>
        <select value={pagatPer} onChange={(e) => { setPagatPer(e.target.value) }} required>
          <option value="">Selecciona un participant</option>
          {participants && participants.map((participant) => (
            <option key={participant.id} value={participant.id}>
              {participant.nom || participant.name || participant.email}
            </option>
          ))}
        </select>
      </label>
      <button>Afegir</button>
    </form>
  )
}
