import sequelize from "../config/db.config.js";
import { DataTypes } from "sequelize";

export const Contact = sequelize.define(
    "contact",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "Invalid email format",
                }
            },
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

    },
    {
        tableName: "contact",
    }
);