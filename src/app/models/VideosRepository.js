import { Op } from 'sequelize';
import Videos from './entities/Videos.js';

export class VideosRepository {

    async list(search = {}) {

        let where = {};

        if (search.id) {
            where.id = search.id;
        }

        if (search.title) {
            // Check all titles passed with OR
            if (search.title instanceof Array) {
                let titles = search.title.map(v => {
                    return { [Op.like]: '%' + v };
                });
                where.title = { [Op.or]: titles }
            }
            // Check just one title
            else {
                where.title = { [Op.iLike]: '%' + search.title };
            }
        }

        const videos = await Videos.findAll({
            where: where
        });

        return videos;
    }

    async create(params) {
        const video = await Videos.create(params);
        console.log(video.toJSON());
    }

    async update(id, params) {
        const video = await Videos.update(params, { where: { id: id }});
        // const video = await Videos.findByPk(id);
        // await video.update(params);
    }

    async delete(id) {
        const video = await Videos.destroy({ where: { id: id }});
    }
}
