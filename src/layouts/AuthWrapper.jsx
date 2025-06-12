import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase.js'

export default function AuthWrapper({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);

            if (!user) {
                navigate("/login", { replace: true });
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    if (loading) return <p>Autenticant...</p>;

    return user ? children : null;

}
