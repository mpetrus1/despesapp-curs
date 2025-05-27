import './login.css'

export default function Login() {
  return (
    
    // Feina pendent:
    // Fer aquest formulari
    // Duplicar el formulari per també fer el register
    //Comprovar que el modal funciona bé

    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" action="/login" method="POST">
        <label htmlFor="username">Usuari</label>
        <input type="text" id="username" name="username" required></input>
        
        <label htmlFor="password">Contrassenya</label>
        <input type="password" id="password" name="password" required></input>
        
        <button type ="submit">Login</button>  
      </form>
      
      
      

    </div>
  )
}
