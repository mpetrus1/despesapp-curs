import './App.css';

import {Routes, Route, Navigate} from 'react-router-dom';


import Login from './pages/login/Login';
import Navbar from './components/navbar/Navbar';
import DespesesDetall from './components/despesesDetall/DespesesDetall';
import Inici from './pages/inici/inici';
import Register from './pages/register/Register';




function App() {
  

  return (
    <div>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Inici/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/despesa/:id' element={<DespesesDetall/>}/>
          <Route path='*' element={<Navigate to ="/" replace/>}/>
        </Routes>
    </div>
  )
}

export default App
