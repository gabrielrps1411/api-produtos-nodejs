const express = require('express');
const cors = require('cors');
const conectarBanco = require('./config/database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API de Produtos funcionando!'
    });
});

conectarBanco((err, conn) => {
    if (err) {
        console.log('Falha na conexão com o banco de dados.');
        return;
    }

    console.log('Conectado ao SQL Server com sucesso!');
    conn.close();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});