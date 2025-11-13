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
>>>>>>> 6724d205b0c30f234662e1584057d8ac5d090721
