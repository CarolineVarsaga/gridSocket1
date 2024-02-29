const express = require('express');
const {
  getAllUsers,
  getUserById,
  registerUser,
  userLogin,
  //   logoutUser,
} = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getAllUsers);
router.post('/add', registerUser);
router.post('/login', userLogin);
router.post('/:id', getUserById);
// router.post('/logout', logoutUser);

module.exports = router;
