import express from 'express';
import { DatabaseMemory } from './database-memory.js';

const app = express();

const db = new DatabaseMemory();

app.get('/', (req, res) => {
    res.send('Hello World from nodejs-api!');
});

app.get('/videos', (req, res) => {

    const search = {
        id: req.query.id ?? null,
        title: req.query.title ?? null
    };

    const list = db.list(search);

    // Count from Iterator or Array
    let count = list.length;

    // let listString = JSON.stringify(list, (key, value) => value);
    // let msg = count ? 'Aqui estão os vídeos: \n\n' + listString : 'Não há vídeos para exibir!';

    let msg = count ? 'Foram encontrados ' + count + ' vídeo(s)!' : 'Não há vídeos para exibir!';
    let json = {
        message: msg,
        data: list
    };

    return res.status(200).send(json);
});

app.post('/videos', (req, res) => {
    db.create({
        title: "Vídeo 01",
        description: "Esse é o vídeo 01",
        duration: 180
    });

    const list = db.list();

    return res.status(201).send(list);
});

app.put('/videos/:id', (req, res) => {
    if (!req.params.id)
        return res.status(400).send('ID não foi passado!')

    const video = db.list(req.params.id);
    if (!video)
        return res.status(404).send('O vídeo solicitado não existe!')

    db.update(req.params.id , {
        title: "Vídeo 01",
        description: "Esse é o vídeo 01 alterado!",
        duration: 185
    });

    const list = db.list();
    return res.status(200).send(list);
});

app.delete('/videos/:id', (req, res) => {
    if (!req.params.id)
        return res.status(400).send('ID não foi passado!')

    const video = db.list(req.params.id);
    if (!video)
        return res.status(404).send('O vídeo solicitado não existe!')

    db.delete(req.params.id);

    return res.status(204).send();
});

app.listen(8001);
