import sequelize from "../../config/db.config.js";
import { DataTypes } from "sequelize";


export const Course = sequelize.define(
    "Course",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        first_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        second_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        schedule: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

    },
    {
        tableName: "courses",
    }
);

export default Course;