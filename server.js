const express = require('express');
const cors = require('cors');
const conectarBanco = require('./config/database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


// ======================================================
// ROTA INICIAL
// ======================================================

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API de Produtos funcionando!'
    });
});


// ======================================================
// POST - Cadastrar produto
// ======================================================

app.post('/produtos', (req, res) => {
    const {
        nome,
        codigo,
        preco,
        descricao,
        quantidadeEstoque,
        avaliacao,
        categoria
    } = req.body;

    conectarBanco((err, conn) => {
        if (err) {
            return res.status(500).json({
                erro: 'Erro ao conectar ao banco de dados.'
            });
        }

        const query = `
            INSERT INTO Produtos
            (Nome, Codigo, Preco, Descricao, QuantidadeEstoque, Avaliacao, Categoria)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        conn.query(
            query,
            [
                nome,
                codigo,
                preco,
                descricao,
                quantidadeEstoque,
                avaliacao,
                categoria
            ],
            (err) => {
                conn.close();

                if (err) {
                    return res.status(500).json({
                        erro: 'Erro ao cadastrar produto.',
                        detalhes: err.message
                    });
                }

                res.status(201).json({
                    mensagem: 'Produto cadastrado com sucesso!',
                    produto: {
                        nome,
                        codigo,
                        preco,
                        descricao,
                        quantidadeEstoque,
                        avaliacao,
                        categoria
                    }
                });
            }
        );
    });
});


// ======================================================
// GET - Listar todos os produtos
// ======================================================

app.get('/produtos', (req, res) => {
    conectarBanco((err, conn) => {
        if (err) {
            return res.status(500).json({
                erro: 'Erro ao conectar ao banco de dados.'
            });
        }

        const query = 'SELECT * FROM Produtos';

        conn.query(query, (err, rows) => {
            conn.close();

            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao buscar produtos.',
                    detalhes: err.message
                });
            }

            res.status(200).json(rows);
        });
    });
});


// ======================================================
// GET - Buscar produto pelo código
// ======================================================

app.get('/produtos/codigo/:codigo', (req, res) => {
    const codigo = req.params.codigo;

    conectarBanco((err, conn) => {
        if (err) {
            return res.status(500).json({
                erro: 'Erro ao conectar ao banco de dados.'
            });
        }

        const query = 'SELECT * FROM Produtos WHERE Codigo = ?';

        conn.query(query, [codigo], (err, rows) => {
            conn.close();

            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao buscar produto.',
                    detalhes: err.message
                });
            }

            if (rows.length === 0) {
                return res.status(404).json({
                    mensagem: 'Produto não encontrado.'
                });
            }

            res.status(200).json(rows[0]);
        });
    });
});


// ======================================================
// GET - Buscar produtos pela categoria
// ======================================================

app.get('/produtos/categoria/:categoria', (req, res) => {
    const categoria = req.params.categoria;

    conectarBanco((err, conn) => {
        if (err) {
            return res.status(500).json({
                erro: 'Erro ao conectar ao banco de dados.'
            });
        }

        const query = 'SELECT * FROM Produtos WHERE Categoria = ?';

        conn.query(query, [categoria], (err, rows) => {
            conn.close();

            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao buscar produtos por categoria.',
                    detalhes: err.message
                });
            }

            if (rows.length === 0) {
                return res.status(404).json({
                    mensagem: 'Nenhum produto encontrado nesta categoria.'
                });
            }

            res.status(200).json(rows);
        });
    });
});


// ======================================================
// PUT - Atualizar produto pelo código
// ======================================================

app.put('/produtos/:codigo', (req, res) => {
    const codigo = req.params.codigo;

    const {
        nome,
        preco,
        descricao,
        quantidadeEstoque,
        avaliacao,
        categoria
    } = req.body;

    conectarBanco((err, conn) => {
        if (err) {
            return res.status(500).json({
                erro: 'Erro ao conectar ao banco de dados.'
            });
        }

        const query = `
            UPDATE Produtos
            SET Nome = ?,
                Preco = ?,
                Descricao = ?,
                QuantidadeEstoque = ?,
                Avaliacao = ?,
                Categoria = ?
            WHERE Codigo = ?
        `;

        conn.query(
            query,
            [
                nome,
                preco,
                descricao,
                quantidadeEstoque,
                avaliacao,
                categoria,
                codigo
            ],
            (err) => {
                conn.close();

                if (err) {
                    return res.status(500).json({
                        erro: 'Erro ao atualizar produto.',
                        detalhes: err.message
                    });
                }

                res.status(200).json({
                    mensagem: 'Produto atualizado com sucesso!',
                    codigo: codigo,
                    produto: {
                        nome,
                        preco,
                        descricao,
                        quantidadeEstoque,
                        avaliacao,
                        categoria
                    }
                });
            }
        );
    });
});


// ======================================================
// DELETE - Excluir produto pelo código
// ======================================================

app.delete('/produtos/:codigo', (req, res) => {
    const codigo = req.params.codigo;

    conectarBanco((err, conn) => {
        if (err) {
            return res.status(500).json({
                erro: 'Erro ao conectar ao banco de dados.'
            });
        }

        const query = 'DELETE FROM Produtos WHERE Codigo = ?';

        conn.query(query, [codigo], (err) => {
            conn.close();

            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao excluir produto.',
                    detalhes: err.message
                });
            }

            res.status(200).json({
                mensagem: 'Produto excluído com sucesso!',
                codigo: codigo
            });
        });
    });
});


// ======================================================
// TESTE DA CONEXÃO COM SQL SERVER
// ======================================================

conectarBanco((err, conn) => {
    if (err) {
        console.log('Falha na conexão com o banco de dados.');
        return;
    }

    console.log('Conectado ao SQL Server com sucesso!');
    conn.close();
});


// ======================================================
// INICIAR SERVIDOR
// ======================================================

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});