import bcrypt from "bcrypt";
import gravatar from "gravatar";
import * as fs from "node:fs/promises";
import * as path from "node:path";

import User from "../db/models/User.js";

import HttpError from "../helpers/HttpError.js";

import { createToken } from "../helpers/jwtToken.js";

export const findUser = (where) => User.findOne({ where });

export const registerUser = async (payload) => {
    const user = await findUser({ email: payload.email });
    if (user) throw HttpError(409, "Email in use");
    const hashPassword = await bcrypt.hash(payload.password, 10);
    const avatarURL = gravatar.url(payload.email, { s: '200', r: 'pg', d: '404' });

    return User.create({ ...payload, password: hashPassword, avatarURL });
};

export const loginUser = async ({ email, password }) => {
    const user = await findUser({ email });
    if (!user) throw HttpError(401, "Email or password is wrong");

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw HttpError(401, "Email or password is wrong");
    const payload = {
        id: user.id,
    };

    const token = createToken(payload);
    await user.update({ token });
    return { token, user: { email: user.email, subscription: user.subscription } };
};

export const logoutUser = user => {
    return user.update({ token: null });
}

export const updateAvatar = async (userId, file) => {
    const newPath = path.resolve("public", "avatars", file.filename);
    await fs.rename(file.path, newPath);
    const avatarURL = path.join("avatars", file.filename);
    User.update({ avatarURL }, { where: { id: userId } });
    return avatarURL;
}