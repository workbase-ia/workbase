import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; 
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import MainPage from './pages/MainPage';
import Header from './components/Header';
import Footer from './components/Footer';



function App() {
  return (
    // Envolva tudo com o AuthProvider
    <AuthProvider>
      <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/cadastro" element={<Cadastro />} />
          </Routes>
        </BrowserRouter>
      <Footer />
    </AuthProvider>
  );
}

export default App;
