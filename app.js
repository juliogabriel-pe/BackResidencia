const express = require('express');
const app = express();
// const { v4: uuidv4 } = require('uuid');
const controller = require("./Controller/Missao/missaoController.js")
app.use(express.json());

app.use("/", controller);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor em execução na porta http://localhost:${port}/`);
});
