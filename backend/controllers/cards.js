const Card = require('../models/card');
const ForbiddenError = require('../errors/forbidden-err.js')
const NotFoundError = require('../errors/not-found-err.js');
const InvalidDataError = require('../errors/invalid-data-err.js');
const getCards = (req, res) => {
  Card.find()
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ message: 'Ошибка!' }));
};
const createCard = (req, res, next) => {
  Card.create({ owner: req.user._id, ...req.body })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new InvalidDataError( 'Некорректный запрос') }
        else {
          next(err);
    }
      })

};
const deleteCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findOne(req.params._id)
    .orFail(()  => {throw new NotFoundError('Карточка не найдена')})
    .then((card) => {
      if (String(card.owner) !== owner) {
        throw new ForbiddenError('Недостаточно прав для удаления карточки');
      }
      return Card.findByIdAndDelete(card._id);
    })
    .then((success) => res.send(success))
    // .then((card) => res.status(200).send(card))
    // .catch((err) => {
    //   if (err.name === 'CastError') {
    //     res.status(400).send({ message: 'Некорректные данные' });
    //   } else if (err.message === 'NotValidId') {
    //     res.status(404).send({ message: 'Карточка не найдена' });
    //   } else res.status(500).send({ message: 'Ошибка!' });
    // });
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
