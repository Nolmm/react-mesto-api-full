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
  const { _id } = req.params;
  Card.findById(_id)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена')
    }
    if (req.user._id !== card.owner.toString()) {
      throw new ForbiddenError('Недостаточно прав для удаления карточки');
    }
    Card.findByIdAndRemove(_id)
    .then((card) => {
      res.send({data: card})
    })
    .catch(next);
  })
  .catch(err => {
    if (err.kind === 'ObjectId') {
      next(new NotFoundError('Карточка не найдена'))
    }
    else {
      next(err)
    }
  })
}
  // const deleteCard = (req, res, next) => {
  // // const owner = req.user._id;
  // Card.findByIdAndRemove(req.params._id)
  //   .orFail(()  => {throw new NotFoundError('Карточка не найдена')})
  // // Card.findOne(req.params._id)
  // //   .orFail(()  => {throw new NotFoundError('Карточка не найдена')})
  //   .then((card) => {
  //     // if (toString(card.owner) !== owner) {
  //       console.log(req.user._id, card.owner.toString())
  //       if (req.user._id.toString() === card.owner.toString()) {
  //       throw new ForbiddenError('Недостаточно прав для удаления карточки');
  //     }
  //     else {
  //       res.status(200).send(card);
  //     }
  //   })
    // .then((success) => res.send(success))
    // .then((card) => res.status(200).send(card))
    // .catch((err) => {
    //   if (err.name === 'CastError') {
    //     res.status(400).send({ message: 'Некорректные данные' });
    //   } else if (err.message === 'NotValidId') {
    //     res.status(404).send({ message: 'Карточка не найдена' });
    //   } else res.status(500).send({ message: 'Ошибка!' });
    // });
    // .catch(next);
// };
  // }
module.exports = {
  getCards,
  createCard,
  deleteCard,
};
