
import express from 'express';
import cors from 'cors';
import ambienteRoutes from './routes/ambienteRoutes.js'; 

const app = express();
const port = 3001; 


app.use(cors()); 

app.use(express.json()); 
app.use('/api', ambienteRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});