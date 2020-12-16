const router = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');
const { celebrate } = require('celebrate');
const {createCardCheck, deleteCardCheck} = require('../middlewares/validation.js');

router.get('/cards', getCards);
router.post('/cards', celebrate(createCardCheck), createCard);
router.delete('/cards/:_id', celebrate(deleteCardCheck), deleteCard);

module.exports = {
  cardRouter: router,
};
