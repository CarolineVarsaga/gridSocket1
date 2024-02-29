const expressAsyncHandler = require('express-async-handler');
const Message = require('../models/messageModel.js');

const sendMessage = expressAsyncHandler(async (req, res) => {
  const userId = req.session.userId;
  const { content } = req.body;

  try {
    const newMessage = new Message({
      content: content,
      user: userId,
    });

    const savedMessage = await newMessage.save();

    await savedMessage.populate('user');
    console.log(savedMessage);
    console.log('Username:', savedMessage.user.name);

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Error saving message' });
  }
});

const getMessages = expressAsyncHandler(async (req, res) => {
  const messages = await Message.find();
});

module.exports = { sendMessage };
