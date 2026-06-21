import sequelize from "../../config/db.config.js";
import { DataTypes } from "sequelize";


export const Schedule = sequelize.define(
    "Schedule",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        day: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },

        end_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },

    },
    {
        tableName: "schedules",
    }
);

export default Schedule;