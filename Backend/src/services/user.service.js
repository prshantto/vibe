import UserModel from "../models/user.model.js";

const registerUser = async (firstname, lastname, email, password) => {
  try {
    const user = await UserModel.create({
      firstname,
      lastname,
      email,
      password,
    });
    return user;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default { registerUser };
