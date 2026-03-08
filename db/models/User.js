import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";
import { verify } from "node:crypto";

const User = sequelize.define(
    "user",
    {
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        subscription: {
            type: DataTypes.ENUM,
            values: ["starter", "pro", "business"],
            defaultValue: "starter"
        },
        token: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        avatarURL: {
            type: DataTypes.STRING,
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        verificationToken: {
            type: DataTypes.STRING,
        }
    }
);
User.sync({ force: true });

export default User;