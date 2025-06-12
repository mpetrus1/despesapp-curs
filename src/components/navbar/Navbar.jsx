import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import './Navbar.css'
import { auth, logoutUser, getParticipantAmbUid } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Navbar() {

  const [user, setUser] = useState(null);
  

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
  <li>
    <Link to="/">Inici</Link>
  </li>

  {user ? (
    <li>
      <button onClick={handleLogout}>Logout</button>
    </li>
  ) : (
    <li>
      <Link to="/register">Registrar</Link>
    </li>
  )}
</ul>

    </nav>
  )
}
