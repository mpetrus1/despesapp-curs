import { loginUser } from '../../firebase/firebase';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await loginUser(email, password);

    if (res.code == undefined) {
      console.log(res.uid);
      //Navigate
      navigate("/projectes", { replace: true });


    } else {
      setError(res.message);
    }
  }

  return (



    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">Inicia sessió</h1>
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          required
        />

        <label htmlFor="password">Contrassenya</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
