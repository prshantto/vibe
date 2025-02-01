import UserModel from "../models/user.model.js";

const registerUser = async (
  firstname,
  lastname,
  email,
  photoURL,
  uid,
  creationTime,
  lastSignInTime,
  emailVerified
) => {
  try {
    const user = await UserModel.create({
      firstname,
      lastname,
      email,
      photoURL,
      uid,
      creationTime,
      lastSignInTime,
      emailVerified,
    });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export default { registerUser };
