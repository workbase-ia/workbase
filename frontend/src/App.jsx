import React from 'react';
<<<<<<< HEAD
import MainPage from './MainPage';
import './index.css';

export default function App() {
  return (
    <div>
      <MainPage />
    </div>
  );
}
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; 
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import PerfilProfissional from './pages/PerfilProfissional';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil/:id" element={<PerfilProfissional />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
>>>>>>> 6724d205b0c30f234662e1584057d8ac5d090721
