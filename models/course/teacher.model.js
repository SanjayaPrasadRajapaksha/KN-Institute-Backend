import sequelize from "../../config/db.config.js";
import { DataTypes } from "sequelize";


export const Teacher = sequelize.define(
    "Teacher",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        qualification: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        experience: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,

        }
    },
    {
        tableName: "teachers",
    }
);

export default Teacher;