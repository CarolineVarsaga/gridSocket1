const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
// const { generateRefreshToken } = require('../config/refreshToken');
const { generateToken } = require('../config/jwtToken');
const { rawListeners } = require('../models/chatRoomModel.js');

const registerUser = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const getUser = await User.findOne({ email: email });

    if (!getUser) {
      const createUser = await User.create(req.body);
      res.json(createUser);
    } else {
      throw new Error('User with that email allready exists');
    }
    res;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const userLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    res.status(401).json({ message: 'Email does not exist' });
  } else if (await findUser.isPasswordMatched(password)) {
    // const refreshToken = generateToken(findUser.id);

    // const updateUserToken = await User.findByIdAndUpdate(
    //   findUser.id,
    //   {
    //     refreshToken: refreshToken,
    //   },
    //   { new: true }
    // );

    // res.cookie('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   maxAge: 72 * 60 * 60 * 1000,
    // });

    req.session.userId = findUser.id;

    res.json({
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      token: generateToken(findUser.id),
    });
  } else {
    res.status(401).json({ message: 'Incorrect password' });
  }
});

const getAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find({}, { password: 0 });
    res.json(getUsers);
  } catch (error) {
    throw new Error('Users not found');
  }
});

const editUser = expressAsyncHandler(async (req, res) => {
  const { _id } = req.params;
  try {
    const getUser = await User.find({
      _id,
    });
  } catch (error) {}
});

const getUserById = expressAsyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  userLogin,
};
