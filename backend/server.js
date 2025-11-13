import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import ambienteRoutes from './routes/ambienteRoutes.js';
import authRoutes from './routes/authRoutes.js'; 

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;


app.use(cors()); 
app.use(express.json()); 

app.use('/api/ambiente', ambienteRoutes); 
app.use('/api/auth', authRoutes); 


app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});