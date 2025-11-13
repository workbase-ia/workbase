
import express from 'express';
import cors from 'cors';
import ambienteRoutes from './routes/ambienteRoutes.js'; 

const historicoRoutes = require('./routes/historicoRoutes');
const privacidadeRoutes = require('./routes/privacidadeRoutes');
const softskillsRoutes = require('./routes/softskillsRoutes');

const app = express();
const port = 3001; 


app.use(cors()); 

app.use(express.json()); 
app.use('/api', ambienteRoutes);
app.use('/api/historico', historicoRoutes); 
app.use('/api/privacidade', privacidadeRoutes);
app.use('/api/softskills', softskillsRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});