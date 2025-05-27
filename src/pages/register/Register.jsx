import React from 'react'
import './Register.css'

export default function Register() {
  return (
    <div className="register-container">
      <h2>Registrar-se</h2>
      <form className="register-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="username">Usuari</label>
        <input type="text" id="username" name = "username" required/>

        <label htmlFor="mail">Correu electrònic</label>
        <input type="email" id ="email" name ="email" required/>

        <label htmlFor="password">Contrasenya</label>
        <input type="password" id="password" name="password" required/>

        <label htmlFor="confirmPassword">Confirma la contrasenya</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required/>

        <button type ="submit">Registrar-se</button>


      </form>
    </div>
  )
}
