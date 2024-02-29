const expressAsyncHandler = require('express-async-handler');
const ChatRoom = require('../models/chatRoomModel.js');
const asyncHandler = require('express-async-handler');

const createChatRoom = expressAsyncHandler(async (req, res) => {
  const { userId } = req.session;
  const { roomName } = req.body;

  try {
    const newRoom = new ChatRoom({ roomId, userId, roomName });
  } catch (error) {}
});

const getAllChatRooms = asyncHandler(async (req, res) => {
  try {
    const getChatRooms = await ChatRoom.find();
    console.log(getChatRooms);
  } catch (error) {}
});
