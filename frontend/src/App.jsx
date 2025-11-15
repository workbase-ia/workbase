import React from 'react';
import MainPage from './pages/MainPage';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; 
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import PerfilProfissional from './pages/PerfilProfissional';
import Vagas from './pages/Vagas';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/perfil/:id" element={<PerfilProfissional />} />
            <Route path="/vagas" element={<Vagas />} />
          </Routes>
        </BrowserRouter>
      <Footer />
    </AuthProvider>
  );
}

export default App;
