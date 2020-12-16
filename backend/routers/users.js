const router = require('express').Router();
const { getUsers, getUser, getUserMe } = require('../controllers/users.js');
const { celebrate } = require('celebrate');
const {getUserCheck} = require('../middlewares/validation.js')

router.get('/users', getUsers);
router.get('/users/me', getUserMe)
router.get('/users/:_id', celebrate(getUserCheck), getUser);

// router.post('/users', createUser);
module.exports = {
  userRouter: router,
};
