const expressAsyncHandler = require('express-async-handler');
const ChatRoom = require('../models/chatRoomModel.js');
const asyncHandler = require('express-async-handler');
const { aggregate } = require('../models/userModel.js');

const createChatRoom = expressAsyncHandler(async (req, res) => {
  const { userId } = req.session;
  const { roomName } = req.body;

  try {
    const newRoom = new ChatRoom({ user: userId, roomName: roomName });

    const savedRoom = await newRoom.save();

    await savedRoom.populate('user');
    console.log(savedRoom);

    res.status(201).json(newRoom);
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Error saving message' });
  }
});

const getAllChatRooms = asyncHandler(async (req, res) => {
  try {
    const getChatRooms = await ChatRoom.find();
    console.log(getChatRooms);
  } catch (error) {}
});

module.exports = {
  createChatRoom,
  getAllChatRooms,
};
