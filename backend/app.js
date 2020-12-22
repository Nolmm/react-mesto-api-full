const cors = require('cors')
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const {NotFoundError} = require('./errors/not-found-err.js')
const bodyParser = require('body-parser');
const { celebrate, errors } = require('celebrate');
const {authCheck, tokenCheck, signupCheck} = require('./middlewares/validation.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js')

// eslint-disable-next-line no-undef
const { PORT = 3001 } = process.env;

const app = express();
const { userRouter } = require('./routers/users.js');
const { cardRouter } = require('./routers/cards.js');
const {login, createUser} = require('./controllers/users.js');
const auth = require('./middlewares/auth.js');
app.use(cors())
mongoose.connect('mongodb://localhost:27017/mestodb2', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(bodyParser.json());
app.post('/signin', celebrate(authCheck),login);
app.post('/signup', celebrate(signupCheck), createUser);

app.use(celebrate(tokenCheck), auth);

app.use(userRouter);
app.use(cardRouter);
app.use('*', (req, res) => {
res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
})
app.use(errorLogger);
app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
    next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
