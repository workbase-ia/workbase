import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; 
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import PerfilProfissional from './pages/PerfilProfissional';
import Vagas from './pages/Vagas';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';

function AppContent() { 
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/perfil/:id" element={<PerfilProfissional />} />
          <Route path="/vagas" element={<Vagas />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;