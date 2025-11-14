import React from 'react';
import MainPage from './pages/MainPage';
import './index.css';
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
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil/:id" element={<PerfilProfissional />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
