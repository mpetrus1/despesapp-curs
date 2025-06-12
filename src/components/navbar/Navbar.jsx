import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import './Navbar.css'
import { auth, logoutUser, getParticipantAmbUid } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Navbar() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser()
  }


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const participant = await getParticipantAmbUid(user.uid);
        if (participant) {
          setUser({
            email: participant.email,
            name: participant.name,
            uid: participant.uid,
          })
        }

      } else {
        setUser(null)
      }
      console.log("Estic dins useEffect i user es", user);
    });

    return () => unsubscribe();

  }, []);


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-titol">Despesapp</div>

        {user && (
          <div className="navbar-usuari">Hola, {user.name}</div>
        )}
      </div>

      <ul className="navbar-menu">
        <li><a href="/">Inici</a></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  )
}
