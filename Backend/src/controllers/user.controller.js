import userService from "../services/user.service.js";
import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds (you can adjust the number of rounds)
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const registerUser = async (req, res) => {
  try {
    let { firstname, lastname, email, password } = req.body;
    const users = await userService.registerUser(
      firstname,
      lastname,
      email,
      (password = await hashPassword(password))
    );
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
