import bcrypt from "bcrypt";
import gravatar from "gravatar";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { nanoid } from "nanoid";


import User from "../db/models/User.js";

import HttpError from "../helpers/HttpError.js";

import { createToken } from "../helpers/jwtToken.js";

export const findUser = (where) => User.findOne({ where });

const createVerifyEmail = ({ to, verificationToken }) => ({
    to,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Click verify email</a>`,
})

export const registerUser = async (payload) => {
    const user = await findUser({ email: payload.email });
    if (user) throw HttpError(409, "Email in use");
    const hashPassword = await bcrypt.hash(payload.password, 10);
    const avatarURL = gravatar.url(payload.email, { s: '200', r: 'pg', d: '404' });
    const verificationToken = nanoid();

    const newUser = await User.create({ ...payload, password: hashPassword, avatarURL, verificationToken });

    const verifyEmail = createVerifyEmail({ to: newUser.email, verificationToken: newUser.verificationToken });
    await sendEmail(verifyEmail);
    return newUser;
};

export const verifyUser = async ({ verificationToken }) => {
    const user = await findUser({ verificationToken });
    if (!user) throw HttpError(404, "User not found");
    return await user.update({ verify: true, verificationToken: "" });
}

export const resendVerify = async ({ email }) => {
    const user = await findUser({ email });
    if (!user) throw HttpError(404, "User not found");
    if (user.verify) throw HttpError(400, "Verification has already been passed");
    const verifyEmail = createVerifyEmail({ to: user.email, verificationToken: user.verificationToken });
    await sendEmail(verifyEmail);
}

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