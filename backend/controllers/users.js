const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// eslint-disable-next-line no-undef
const { NODE_ENV, JWT_SECRET } = process.env;
const InvalidDataError = require('../errors/invalid-data-err.js');
// const UnAuthorizedErro = require('../errors/unauthorized-err.js');
const NotFoundError = require('../errors/not-found-err.js');

const getUsers = (req, res) => {
  User.find()
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ message: 'Ошибка!' }));
};
const getUser = (req, res, next) => {
  const { _id } = req.params;
  User.findOne({ _id })
    .orFail(() => {throw new NotFoundError ('Пользователь не найден')})
    .then((user) => res.status(200).send(user))
    // .catch((err) => {
    //   if (err.name === 'CastError') {
    //     res.status(400).send({ message: 'Некорректные данные' });
    //   } else if (err.message === 'NotValidId') {
    //     res.status(404).send({ message: 'Пользователь не найден' });
    //   } else res.status(500).send({ message: 'Ошибка!' });
    // });
    .catch(next);
};

const getUserMe = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .orFail(() => {throw new NotFoundError ('Пользователь не найден')})
    .then((user) => res.status(200).send(user))
    // .catch((err) => {
    //   if (err.name === 'CastError') {
    //     res.status(400).send({ message: 'Некорректные данные' });
    //   } else if (err.message === 'NotValidId') {
    //     res.status(404).send({ message: 'Пользователь не найден' });
    //   } else res.status(500).send({ message: 'Ошибка!' });
    // });
    .catch(next);
};

const createUser = (req, res, next) => {
  if (req.body.password.length < 8) {
    throw new InvalidDataError('Длина пароля меньше 8 символов!');
  }
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
    email: req.body.email,
    password: hash,
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  }))
  .then((user) => {
    res.status(200).send({
      email: user.email
    })
  })
  .catch(next);
  // .catch((err) => {
  //   if (err.name === 'ValidationError') {
  //     res.status(400).send({ message: 'Некорректный запрос' });
  //   } else {
  //     res.status(500).send({ message: 'Ошибка!' });
  //   }
  // });
}
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    // .catch((err) => {
    //   res
    //     .status(401)
    //     .send({ message: err.message });
    // });
    .catch(next);
};
module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
  getUserMe
};
