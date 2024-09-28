import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../../../packages/database/Connection.js';

class Videos extends Model {};

Videos.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        duration: {
            type: DataTypes.INTEGER
        },
    },
    {
        sequelize: db,
        modelName: 'videos'
    }
);

export default Videos;
