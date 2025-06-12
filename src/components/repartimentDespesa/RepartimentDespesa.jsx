import React, { useState, useEffect } from 'react';
import './RepartimentDespesa.css'

export default function RepartimentDespesa({ importTotal, participants }) {
    const [seleccionats, setSeleccionats] = useState([]);

    useEffect(() => {
        // Inicialment, tots seleccionats
        const inicial = participants.map((p) => p.id);
        setSeleccionats(inicial);
    }, [participants]);

    const toggleSeleccionat = (id) => {
        setSeleccionats((prev) => prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        );
    };

    const importPerPersona = seleccionats.length > 0 ? (importTotal / seleccionats.length).toFixed(2) : 0;

    return (
        <div className="repartiment-container">
            <h3>Repartiment de la despesa</h3>
            <ul className="repartiment-llista">
                {participants.map((p) => (
                    <li key={p.id} className="repartiment-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={seleccionats.includes(p.id)}
                                onChange={() => toggleSeleccionat(p.id)}
                            />
                            {p.name}
                        </label>
                        <span className="import-assignat"> {seleccionats.includes(p.id) ? `${importPerPersona} €` : '--'}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

