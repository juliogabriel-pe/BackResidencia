const express = require("express");
const app = express();
// const pool = require('../../dataBase/connection');
const Missoes = require('../../models/missoes');

app.post('/missao', async (req, res) => {
    try {
        const dadosCadastroMissoes = req.body;
        const dataAtual = new Date().toISOString();
        const dataFormatada = dataAtual.split('T')[0];
        dadosCadastroMissoes.data_criacao = dataFormatada;

        await Missoes.create(dadosCadastroMissoes);

        res.status(201).send('Cadastrado');
    } catch (error) {
        console.error('Erro ao inserir no banco de dados:', error);
        res.status(500).send('Erro interno do servidor');
    }
    });

// Rota para listar todas as missões
app.get('/listaMissao', async (req, res) => {
    try {
        const rows = await Missoes.findAll();

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
        const rows = await Missoes.findByPk(missionId)

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
        const dadosAtualizarMissoes = req.body;
        const dataAtual = new Date().toISOString();
        const dataFormatada = dataAtual.split('T')[0];
        dadosAtualizarMissoes.data = dataFormatada;

        await Missoes.update(dadosAtualizarMissoes, {
            where: {
                id: missaoId
            }
        });

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

        await Missoes.destroy({
            where: {
                id: missaoId
            }
        });
        
        res.status(200).send('Missao Deletada')
    } catch (error) {
        console.error('Erro ao atualizar no banco de dados:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

module.exports = app;