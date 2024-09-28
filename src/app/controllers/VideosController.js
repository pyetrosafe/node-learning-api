import { VideosRepository } from "../models/VideosRepository.js";
export class VideosController {

    videosRepository = null;

    constructor () {
        this.videosRepository = new VideosRepository();
    }

    async index(req, res) {
        try {
            const search = {
                id: req.query.id ?? null,
                title: req.query.title ?? null
            };

            const list = await this.videosRepository.list(search);
            let count = list.length;
            let msg = count ? 'Foram encontrados ' + count + ' vídeo(s)!' : 'Não há vídeos para exibir!';
            let json = {
                message: msg,
                data: list
            };

            return res.status(200).send(json);

        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    };

    async save(req, res) {
        try {
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

            this.videosRepository.create(params);

            const list = this.videosRepository.list();

            return res.status(201).send(list);
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    };

    async update(req, res) {
        try {
            const { id } = req.params;

            if (!id)
                return res.status(400).send('ID não foi passado!')

            const video = this.videosRepository.list({ id: id });
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

            this.videosRepository.update(id, params);

            const list = this.videosRepository.list({ id: id });
            return res.status(200).send(list);
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    };

    async delete(req, res) {
        try {
            if (!req.params.id)
                return res.status(400).send('ID não foi passado!')

            const video = this.videosRepository.list(req.params.id);
            if (!video)
                return res.status(404).send('O vídeo solicitado não existe!')

            this.videosRepository.delete(req.params.id);

            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    };
}
