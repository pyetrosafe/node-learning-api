import express from 'express';
import { DatabasePostgres } from './database-postgres.js';
import sequelize from './sequelize.js';

const app = express();

app.use(express.urlencoded());
app.use(express.json());

const db = new DatabasePostgres();

app.get('/', (req, res) => {
    res.send('Hello World from nodejs-api!');
});

app.get('/videos', async (req, res) => {

    const search = {
        id: req.query.id ?? null,
        title: req.query.title ?? null
    };

    const list = await db.list(search);
    let count = list.length;
    let msg = count ? 'Foram encontrados ' + count + ' vídeo(s)!' : 'Não há vídeos para exibir!';
    let json = {
        message: msg,
        data: list
    };

    return res.status(200).send(json);
});

app.post('/videos', async (req, res) => {

    const { title, description, duration} = req.body;
    let params = { title, description, duration };

    if (!req.body) {
        return res.status(400).send("Parâmetros inválidos!");
    }

    if (!params.title) {
        return res.status(400).send("Parâmetros title não encontrado!");
    }

    if (!params.description) {
        return res.status(400).send("Parâmetros description não encontrado!");
    }

    if (!params.duration) {
        return res.status(400).send("Parâmetros duration não encontrado!");
    }

    db.create(params);

    const list = db.list();

    return res.status(201).send(list);
});

app.put('/videos/:id', async (req, res) => {
    const { id } = req.params;

    if (!id)
        return res.status(400).send('ID não foi passado!')

    const video = db.list({ id: id });
    if (!video)
        return res.status(404).send('O vídeo solicitado não existe!')

    const { title, description, duration} = req.body;
    let params = { title, description, duration };

    if (!req.body) {
        return res.status(400).send("Parâmetros inválidos!");
    }

    if (!params.title) {
        return res.status(400).send("Parâmetros title não encontrado!");
    }

    if (!params.description) {
        return res.status(400).send("Parâmetros description não encontrado!");
    }

    if (!params.duration) {
        return res.status(400).send("Parâmetros duration não encontrado!");
    }

    db.update(id, params);

    const list = db.list({ id: id });
    return res.status(200).send(list);
});

app.delete('/videos/:id', async (req, res) => {
    if (!req.params.id)
        return res.status(400).send('ID não foi passado!')

    const video = db.list(req.params.id);
    if (!video)
        return res.status(404).send('O vídeo solicitado não existe!')

    db.delete(req.params.id);

    return res.status(204).send();
});

sequelize.sync({ force: false}).then(() => {
    app.listen(8001);
});
