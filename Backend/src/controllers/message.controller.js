import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../../config/cloudinary.js";

cloudinary.config({
  cloud_name: "your_cloud_name",
  api_key: "your_api_key",
  api_secret: "your_api_secret",
});

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select(
      "-password"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const senderID = req.user._id;
    const { id: receiversID } = req.params;
    const messages = await Message.find({
      $or: [
        { from: senderID, to: receiversID },
        { from: receiversID, to: senderID },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderID = req.user._id;
    const { id: receiversID } = req.params;

    let imageurl;

    if (image) {
      //upload base64  image to cloudinary
      const uploadImage = await cloudinary.uploader.upload(image);
      imageurl = uploadImage.secure_url;
    }

    const message = new Message({
      from: senderID,
      to: receiversID,
      text,
      image: imageurl,
    });
    await message.save();

    //realtime functionality goes here => socket.io

    res.status(200).json(message);
  } catch (error) {}
};
