import Post from "../models/postsModel.js";
import User from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuthUser = async (req, res) => {
  try {
    const userID = req.userID;
    console.log("🚀 ~ getAuthUser ~ userID:", userID);
    const foundUser = await User.findById(userID);
    const user = foundUser.toObject();
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = {
      userName,
      password: hashedPassword,
      // avatarImg: {
      //   url: "https://ionicframework.com/docs/img/demos/avatar.svg",
      //   id: "",
      // },
    };
    const userExists = await User.findOne({ userName });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    await User.create(newUser);
    delete newUser.password;
    res.status(200).json({
      message: "New User added! 🐒",
      newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const foundUser = await User.findOne({ userName });
    if (!foundUser) {
      // nevere tell the user if the username exists or not or if the password is wrong!!!
      return res
        .status(404)
        .json({ message: "user name or password are falase!" });
    }
    const passwordsMatched = await bcrypt.compare(password, foundUser.password);
    if (!passwordsMatched) {
      // nevere tell the user if the username exists or not or if the password is wrong!!!
      return res
        .status(401)
        .json({ message: "user name or password are falase!" });
    }
    // convert the foundUser document to a plain js object
    // we need to delete de password field, because we don't want to send it to the client
    const user = foundUser.toObject();
    delete user.password;

    const payload = { userID: user._id };
    const token = jwt.sign(payload, process.env.SECRETKEY, {
      expiresIn: "1h",
    });
    console.log("token", token);
    // send the token to the client as a cookie, and the user to have the user data in the client side
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "login successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token").status(200).json({ message: "logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPostsOfOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Post.find({ author: id });
    if (!posts.length) {
      return res.status(404).json({ message: "Posts not found" });
    }
    res.status(200).json({ message: "Posts found", posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllUsers = async (req, res) => {};

const updateUser = async (req, res) => {};

const updatePartialUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.body:", req.body);
    const userExists = await User.findOne({ userName: req.body.userName });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const userToUpdate = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );
    console.log("🚀 ~ updatePartialUser ~ userToUpdate:", userToUpdate);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found!" });
    }
    const updatedUser = userToUpdate.toObject();
    delete updatedUser.password;
    res.json({ message: "User updated", updatedUser });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllUsers,
  register,
  login,
  logout,
  deleteAllUsers,
  getOneUser,
  getAuthUser,
  deleteUser,
  updateUser,
  updatePartialUser,
  getAllPostsOfOneUser,
};
