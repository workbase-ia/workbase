import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; 
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import PerfilProfissional from './pages/PerfilProfissional';
import Vagas from './pages/Vagas';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';

/**
 * Componente interno para gerenciar o layout condicional,
 * pois o hook useLocation só funciona dentro do BrowserRouter.
 */
function AppContent() {
  const location = useLocation();
  
  // Verifica se a rota atual é de Login ou Cadastro
  const isAuthPage = location.pathname === '/login' || location.pathname === '/cadastro';

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* 1. Só mostra o Header se NÃO for uma página de autenticação */}
      {!isAuthPage && <Header />}
      
      {/* 2. O 'flex-1' faz o conteúdo crescer e ocupar 100% da altura.
           O 'pt-20' (padding-top) só é aplicado se o Header estiver visível. */}
      <main className={`flex-1 ${!isAuthPage ? 'pt-20' : ''}`}>
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

// O App principal agora só envolve os Provedores e o Router
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* O AppContent está DENTRO do BrowserRouter,
            então o Header (filho dele) pode usar o useNavigate */}
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;