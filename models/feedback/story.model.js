import sequelize from "../../config/db.config.js";
import { DataTypes } from "sequelize";


export const Story = sequelize.define(
    "Story",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },

        message: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },

        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: "stories",
    }
);

export default Story;