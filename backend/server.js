import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import ambienteRoutes from './routes/ambienteRoutes.js';

const historicoRoutes = require('./routes/historicoRoutes');
const privacidadeRoutes = require('./routes/privacidadeRoutes');
const softskillsRoutes = require('./routes/softskillsRoutes');
import authRoutes from './routes/authRoutes.js'; 
import perfilRoutes from './routes/perfilRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;


app.use(cors()); 
app.use(express.json()); 

app.use('/api/ambiente', ambienteRoutes); 
app.use('/api/auth', authRoutes); 
app.use('/api/perfil', perfilRoutes);


app.use('/api', ambienteRoutes);
app.use('/api/historico', historicoRoutes); 
app.use('/api/privacidade', privacidadeRoutes);
app.use('/api/softskills', softskillsRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});