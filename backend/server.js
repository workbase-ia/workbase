const express = require('express');
const cors = require('cors');
const path = require('path');

const historicoRoutes = require('./routes/historicoRoutes');
const privacidadeRoutes = require('./routes/privacidadeRoutes');
const softskillsRoutes = require('./routes/softskillsRoutes');

const app = express();
const PORT = 3000;


app.use(cors()); 
app.use(express.json()); 

app.use('/api/historico', historicoRoutes); 
app.use('/api/privacidade', privacidadeRoutes);
app.use('/api/softskills', softskillsRoutes);

app.get('/', (req, res) => {
    res.send('Servidor WorkBalance AI rodando! Acesse /api/historico, /api/privacidade ou /api/softskills.');
});

app.listen(PORT, () => {
    console.log(`Servidor WorkBalance AI rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});
