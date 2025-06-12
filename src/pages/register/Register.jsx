import React from 'react'
import './Register.css'
import { useState } from 'react'
import { saveCollection, registerUser } from '../../firebase/firebase'
import { useNavigate } from 'react-router-dom'


export default function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [missatge, setMissatge] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError("");

    if (password !== confirmPassword){
      return;
    }

    const res = await registerUser(email, password);
    console.log(res);

    if (res.code == undefined){
      //saveParticipant
      saveCollection("participants", {uid: res.user.uid, email, name})
      .then((user)=>{
        setMissatge("Registre complet!")
        setError("")
        setTimeout(()=>{
          navigate('/projectes');
        }, 1500);
      });
    } else{
      console.log("hi ha error res.message")
      setError(res.message);
      setMissatge("")
    }

  }

  return (
    <div className="register-container">
      <h2>Registrar-se</h2>
      {missatge && <p className="ok-message">{missatge}</p>} {/* Missatge d'èxit */}
      {error && <p className="error-message">{error}</p>} {/* Missatge d'error */}
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Usuari</label>
        <input type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required/>

        <label htmlFor="mail">Correu electrònic</label>
        <input type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required/>

        <label htmlFor="password">Contrasenya</label>
        <input type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required/>

        <label htmlFor="confirmPassword">Confirma la contrasenya</label>
        <input type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              required/>

        <button type ="submit">Registrar-se</button>


      </form>
    </div>
  )
}
