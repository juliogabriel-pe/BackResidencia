const express = require('express');
const Usuario = require('../../models/usuario');

const app = express();

app.post('/login', async (req, res) => {
    try {
        // Valide os dados de login

        // Encontre o usuário no banco de dados
        const usuario = await Usuario.findOne({
            where: { email: req.body.email, senha: req.body.senha },
        });

        if (!usuario) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Retorne o usuário, incluindo o tipo de usuário
        res.status(200).json({
            id: usuario.id,
            nome: usuario.nome,
            tipoUsuario: usuario.tipoUsuario,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para criar um novo usuário
app.post('/usuarios', async (req, res) => {
    try {
        console.log('Criando um novo usuário...');
        const novoUsuario = await Usuario.create(req.body);
        console.log('Novo usuário criado:', novoUsuario);
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao criar um novo usuário:', error);
        res.status(400).json({ error: error.message });
    }
});

// Rota para obter todos os usuários
app.get('/usuarios', async (req, res) => {
    try {
        console.log('Obtendo todos os usuários...');
        const usuarios = await Usuario.findAll();
        console.log('Usuários encontrados:', usuarios);
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao obter todos os usuários:', error);
        res.status(500).json({ error: error.message });
    }
});

// Rota para obter um usuário específico por ID
app.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            console.log('Usuário não encontrado.');
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        console.log('Usuário encontrado:', usuario);
        res.status(200).json(usuario);
    } catch (error) {
        console.error('Erro ao obter usuário por ID:', error);
        res.status(500).json({ error: error.message });
    }
});

// Rota para atualizar um usuário por ID
app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [linhasAtualizadas, [usuarioAtualizado]] = await Usuario.update(req.body, {
            where: { usuarioId: id },
            returning: true,
        });
        if (linhasAtualizadas === 0) {
            console.log('Usuário não encontrado para atualização.');
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        console.log('Usuário atualizado:', usuarioAtualizado);
        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar usuário por ID:', error);
        res.status(500).json({ error: error.message });
    }
});

// Rota para excluir um usuário por ID
app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const linhasExcluidas = await Usuario.destroy({
            where: { usuarioId: id },
        });
        if (linhasExcluidas === 0) {
            console.log('Usuário não encontrado para exclusão.');
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        console.log('Usuário excluído.');
        res.status(204).end();
    } catch (error) {
        console.error('Erro ao excluir usuário por ID:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;