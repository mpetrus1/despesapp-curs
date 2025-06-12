import './App.css';

import {Routes, Route, Navigate} from 'react-router-dom';

import Login from './pages/login/Login';
import Navbar from './components/navbar/Navbar';
import DespesesDetall from './components/despesesDetall/DespesesDetall';
import Inici from './pages/inici/Inici';
import Register from './pages/register/Register';
import Projectes from './pages/projectes/Projectes';
import ProjectesDetall from './components/projectesDetall/ProjectesDetall';
import AuthWrapper from './layouts/AuthWrapper';

function App() {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path='/' element={<Inici />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/*' element={
            <AuthWrapper>
              <Routes>
                <Route path='/projectes' element={<Projectes />} />
                <Route path='/projecte/:id' element={<ProjectesDetall />} />
                <Route path='/despesa/:id' element={<DespesesDetall />} />
              </Routes>
            </AuthWrapper>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App
