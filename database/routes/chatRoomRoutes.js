const express = require('express');
const {} = require('../models/chatRoomModel.js');
const { createChatRoom } = require('../controllers/chatRoomController.js');
const router = express.Router();

router.post('/add', createChatRoom);

module.exports = router;
