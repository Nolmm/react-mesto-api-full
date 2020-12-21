const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// eslint-disable-next-line no-undef
const { NODE_ENV, JWT_SECRET } = process.env;
const InvalidDataError = require('../errors/invalid-data-err.js');
const UnAuthorizedError = require('../errors/unauthorized-err.js');
const NotFoundError = require('../errors/not-found-err.js');
const ConflictError = require('../errors/conflict-err.js')

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
  const { name, about, avatar, email, password } = req.body;
  if (req.body.password.length < 8) {
        throw new InvalidDataError('Длина пароля меньше 8 символов!');
      }
  bcrypt.hash(password, 10)
    .then((hash) => {
        User.create({
          email,
          password: hash,
          name,
          about,
          avatar,
        })
        .then((user) => res.status(200).send(user))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next ( new InvalidDataError( 'Некорректный запрос'));
          } else if (err.code === 11000) {
            next (new ConflictError('Пользователь с таким email уже зарегистрирован'));
          } else {
            next(err);
          }
        })
    })
    .catch(() => {

      next ( new InvalidDataError( 'Некорректный запрос'));
    })
  }
//   const { name, about, avatar, email, password } = req.body;
//   if (req.body.password.length < 8) {
//     throw new InvalidDataError('Длина пароля меньше 8 символов!');
//   }
//   bcrypt.hash(password, 10)
//     .then((hash) => User.create({
//     email,
//     password: hash,
//     name,
//     about,
//     avatar,
//   })
//   .then(() => {
//     res.status(200).send({
//       message: 'Вы успешно зарегистрировались!'
//     })
//   })

//   .catch((err) => {
//     if (err.name === 'ValidationError') {
//         next ( new InvalidDataError( 'Некорректный запрос'));
//       }
//       else if (err.code === 11000) {
//       next (new ConflictError('Пользователь с таким email уже зарегистрирован'));
// }

// else {
//       next(err);
// })
// })
//   .catch(() => {
//     next ( new InvalidDataError( 'Некорректный запрос'));
//   });
// .then(() => {
//   res.status(200).send({
//     message: 'Вы успешно зарегистрировались!'
//   })
// })
  // };
  // .catch((err) => {
  //   if (err.name === 'ValidationError') {
  //     res.status(400).send({ message: 'Некорректный запрос' });
  //   } else {
  //     res.status(500).send({ message: 'Ошибка!' });
  //   }
  // });

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new InvalidDataError('Не передан пароль или email'))
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // if (!user) {
      //   throw new UnAuthorizedError('Неправильные почта или пароль');
      // }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      // if (err.name === 'ValidationError') {
        next(new UnAuthorizedError('Неправильные почта или пароль'))
      // }
      // else {
      //   next(err);
      // }
    });
};
module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
  getUserMe
};
