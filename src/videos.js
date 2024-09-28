import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from './sequelize.js';

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
        sequelize: sequelize,
        modelName: 'videos'
    }
);

export default Videos;
