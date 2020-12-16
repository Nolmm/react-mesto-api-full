const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const { celebrate, errors } = require('celebrate');
const {authCheck, tokenCheck} = require('./middlewares/validation.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js')

const { PORT = 3000 } = process.env;

const app = express();
const { userRouter } = require('./routers/users.js');
const { cardRouter } = require('./routers/cards.js');
const {login, createUser} = require('./controllers/users.js');
const auth = require('./middlewares/auth.js');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(requestLogger); 

app.use(bodyParser.json());
app.post('/signin', celebrate(authCheck),login);
app.post('/signup', celebrate(authCheck), createUser);

app.use(celebrate(tokenCheck), auth);

app.use(userRouter);
app.use(cardRouter);
// app.use('*', (req, res) => {
//   res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
// });
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
})
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  if (err.name === 'ValidationError') {
    return res.status(401).send({ message: 'Неверные данные' });
  }
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
