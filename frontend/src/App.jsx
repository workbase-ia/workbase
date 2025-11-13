import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; 
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';


function App() {
  return (
    // Envolva tudo com o AuthProvider
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;