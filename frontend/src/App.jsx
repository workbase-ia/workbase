import React, { useState, useEffect } from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import PerfilProfissional from './pages/PerfilProfissional';
import Vagas from './pages/Vagas';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import MinhaRede from './pages/MinhaRede';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <Header />
          <Routes>            
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/perfil/:id" element={<PerfilProfissional />} />
            <Route path="/vagas" element={<Vagas />} />
            <Route path="/minha-rede" element={<MinhaRede />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
