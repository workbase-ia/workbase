import express from 'express';
import cors from 'cors';
import ambienteRoutes from './routes/ambienteRoutes.js'; 
import historicoRoutes from './routes/historicoRoutes.js';
import privacidadeRoutes from './routes/privacidadeRoutes.js';
import softskillsRoutes from './routes/softskillsRoutes.js';
import postsRoutes from './routes/postsRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

const app = express();
const port = 3001; 

app.use(cors()); 

app.use(express.json()); 
app.use('/api', ambienteRoutes);
app.use('/api/historico', historicoRoutes); 
app.use('/api/privacidade', privacidadeRoutes);
app.use('/api/softskills', softskillsRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});