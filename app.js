const express = require('express');
const app = express();
// const { v4: uuidv4 } = require('uuid');
const pool = require('./connection.js');
app.use(express.json());

// Rota para criar uma nova missão
app.post('/missao', async (req, res) => {
    try {
        const { titulo, descricao } = req.body;
        const dataAtual = new Date().toISOString();
        const [rows] = await pool.execute(
            'INSERT INTO missoes (titulo, descricao, data) VALUES (?, ?, ?)',
            [titulo, descricao, dataAtual]
        );

        const novaMissao = {
            titulo,
            descricao,
            data: dataAtual,
        };

        res.status(201).json(novaMissao);
    } catch (error) {
        console.error('Erro ao inserir no banco de dados:', error);
        res.status(500).send('Erro interno do servidor');
    }
    });

// Rota para listar todas as missões
app.get('/listaMissao', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM missoes');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao recuperar dados do banco de dados:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Rota para obter uma missão pelo ID
app.get('/missao/:id', async (req, res) => {
    try {
        const missionId = parseInt(req.params.id);
        const [rows] = await pool.execute('SELECT * FROM missoes WHERE id=?',[missionId]);
        res.json(rows)
    } catch (error) {
        console.error('Erro ao recuperar dados do banco de dados:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Rota para atualizar uma missão pelo ID
app.put('/missao/:id', async (req, res) => {
    try {
        const missaoId = parseInt(req.params.id);
        const { titulo, descricao } = req.body;
        const dataAtual = new Date().toISOString();

        const [rows] = await pool.execute(
            'UPDATE missoes SET titulo=?, descricao=?, data=? WHERE id=?',
            [titulo, descricao, dataAtual, missaoId]
        );
        res.status(200).send('Atualizado');
    } catch (error) {
        console.error('Erro ao atualizar no banco de dados:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Rota para excluir uma missão pelo ID
app.delete('/missao/:id', async (req, res) => {
    try {
        const missaoId = parseInt(req.params.id);
        const [rows] = await pool.execute(
            'DELETE FROM missoes WHERE id = ?', [missaoId]
        );
        
        res.status(200).send('Missao Deletada')
    } catch (error) {
        console.error('Erro ao atualizar no banco de dados:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor em execução na porta ${port}`);
});
