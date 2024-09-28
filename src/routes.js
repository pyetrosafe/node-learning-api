import { Router } from "express";
import { VideosController } from "./app/controllers/VideosController.js";

const routes = Router();

const videosController = new VideosController();

routes.get('/', (req, res) => {
    res.send('Hello World from the routes.js!');
});

routes.get('/videos', async (req, res, next) => {
    next();
}, videosController.index.bind(videosController));

routes.post('/videos', async (req, res, next) => {
    next();
}, videosController.save.bind(videosController));

routes.put('/videos/:id', async (req, res, next) => {
    next();
}, videosController.update.bind(videosController));

routes.delete('/videos/:id', async (req, res, next) => {
    next();
}, videosController.delete.bind(videosController));

export { routes };
