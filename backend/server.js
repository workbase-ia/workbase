import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ambienteRoutes from './routes/ambienteRoutes.js'; 
import privacidadeRoutes from './routes/privacidadeRoutes.js';
import softskillsRoutes from './routes/softskillsRoutes.js'; 
import postsRoutes from './routes/postsRoutes.js'; 
import usuariosRoutes from './routes/usuariosRoutes.js'; 
import authRoutes from './routes/authRoutes.js'; 
import perfilRoutes from './routes/perfilRoutes.js';
import historicoRoutes from'./routes/historicoRoutes.js';
import vagasRoutes from './routes/vagasRoutes.js'; 
import conexoesRoutes from './routes/conexoesRoutes.js';

dotenv.config();

const port = process.env.PORT || 3001;

const app = express();
app.use(cors()); 
app.use(express.json()); 

app.use('/api/ambiente', ambienteRoutes); 
app.use('/api/auth', authRoutes); 
app.use('/api/perfil', perfilRoutes);
app.use('/api/historico', historicoRoutes); 
app.use('/api/privacidade', privacidadeRoutes);
app.use('/api/softskills', softskillsRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/vagas', vagasRoutes);
app.use('/api/conexoes', conexoesRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});

