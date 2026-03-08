import * as authServices from "../services/authServices.js";

export const registerController = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);
  res.status(201).json({
    email: newUser.email,
    subscription: "starter"
  });
};

export const loginController = async(req, res)=> {
  const result = await authServices.loginUser(req.body);
  res.json(result)
}

export const getCurrentController = async(req, res)=> {
  const {email, subscription} = req.user;
  res.json({
    email,
    subscription
  })
}

export const logoutController = async(req, res)=> {
  await authServices.logoutUser(req.user);
  res.status(204).send();
}

export const updateAvatarController = async(req, res) => {
    const {id: userId} = req.user;
    const result = await authServices.updateAvatar(userId, req.file);
    console.log(result);
    res.json(result);
}