import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Inici() {
  const [user, setUser] = useState(null);
  const [carregant, setCarregant] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuari) => {
      setUser(usuari);
      setCarregant(false);
    });
    return () => unsubscribe();
  }, []);

  if (carregant) return <div>Carregant...</div>;

  return user ? <Navigate to="/projectes" replace /> : <Navigate to="/login" replace />;
}
