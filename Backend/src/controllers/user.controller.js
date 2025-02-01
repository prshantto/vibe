import userService from "../services/user.service.js";
import UserModel from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    let {
      firstname,
      lastname,
      email,
      photoURL,
      uid,
      creationTime,
      lastSignInTime,
      emailVerified,
    } = req.body;
    const users = await userService.registerUser(
      firstname,
      lastname,
      email,
      photoURL,
      uid,
      creationTime,
      lastSignInTime,
      emailVerified
    );
    res.status(201).json(users);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .send("User not found. Please sign up to continue.");
    }
    return res.status(200).send(user);
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send("An error occurred while logging in");
  }
};

export const check = async (req, res) => {
  res.json({ message: "working" });
};
