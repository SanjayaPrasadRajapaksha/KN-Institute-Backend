import { DataTypes } from "sequelize";
import sequelize from "../../config/db.config.js";
import Role from "./role.model.js";

export const Admin = sequelize.define(
    "Admin",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Role,
                key: "id",
            },
        },
        verify_Status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        active_status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        suspended_status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: "admin",
    }
);

export default Admin;

Admin.belongsTo(Role, { foreignKey: "role_id" });
Role.hasMany(Admin, { foreignKey: "role_id" });