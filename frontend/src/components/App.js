import React from 'react';
import '../index.css';
import '../components/Header.js'
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import api from '../utils/Api.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import auth from '../utils/Auth.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setcurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([]);
  const [headerLink, setHeaderLink] = React.useState({title: '', link: true});
  const [email, setEmail] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();
  const [tooltip, setTooltip] = React.useState({
    isOpen: false,
    title: '',
    success: true
  });

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    (!isLiked ? api.putLike(`cards/likes/${card._id}`) : api.deleteItems(`cards/likes/${card._id}`)).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err)
    });
  }

  function handleCardDelete(card) {
    api.deleteItems(`cards/${card._id}`)
      .then(() => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.filter((current) => current._id !== card._id);
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err)
      });
  }
  React.useEffect(() => {
    Promise.all([api.getItems('cards'), api.getItems('users/me')])
      .then(([cardsData, userData]) => {
        setCards(cardsData);
        setcurrentUser(userData)
      })
      .catch((err) => {
        console.log(err)
      })
  },
    []
  )



  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getToken()
        .then((res) => {
          res.data ? setLoggedIn(true) : setLoggedIn(false);
          setEmail(res.data.email);
          history.push('/');
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(value) {
    setSelectedCard(value)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setTooltip({
      ...tooltip,
      isOpen: false
    });
  }

  function handleUpdateUser(userData) {
    api.patchUserInfo('users/me', userData).then(newUserInfo => {
      setcurrentUser(newUserInfo);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateAvatar(userAvatar) {
    api.patchAvatar('users/me/avatar', userAvatar).then(newUserAvatar => {
      setcurrentUser(newUserAvatar);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlace(cardData) {
    api.postNewCard('cards', cardData).then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err)
      })
  }

  
  // const tokenCheck = () => {
  //   const jwt = localStorage.getItem('jwt');
  //   if (jwt) {
  //     auth.getToken(jwt)
  //     .then((res) => {
  //       if (res.email) {
  //         res.data ? setLoggedIn(true) : setLoggedIn(false);
  //         setEmail({
  //           email: res.email
  //         });
  //         setLoggedIn(true);
  //         history.push('/');
  //       }
  //     })
  //     .catch(err => console.log(err));
  // } }


  // React.useEffect(() => {
  //   tokenCheck();
  // }, [tokenCheck]);

  function handleRegister (data) {
    auth.register({
      password: data.password,
      email: data.email
    })
    .then((res) => {
        console.log(res);
        setTooltip({
            isOpen: true,
            title: 'Вы успешно зарегистрировались!',
            success: true
        });
        history.push('/signin');
    })
    .catch((err) => {
        console.log(err);
        setTooltip({
            isOpen: true,
            title: 'Что-то пошло не так! Попробуйте ещё раз.',
            success: false
        });
    })
}
function handleLogin (data) {
  auth.login({
      password: data.password,
      email: data.email
  })
  .then((res) => {
      localStorage.setItem('jwt', res.token);
      setLoggedIn(true);
      history.push('/')
  })
  .catch((err) => console.log(err))
}
function handleLogout () {
  localStorage.removeItem('jwt');
  setLoggedIn(false);
  history.push('/signin');
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header setLink={headerLink} email={email} loggedIn={loggedIn} onClick={handleLogout}/>
        <Switch>
        <ProtectedRoute exact path='/'
          loggedIn={loggedIn}
          component={Main}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onClose={closeAllPopups}
          onCardClick={handleCardClick}
          card={selectedCard}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Route path='/signin'>
        <Login 
        onSubmit={handleLogin} 
        setLink={setHeaderLink}/>
        </Route>
        <Route path='/signup'>
        <Register 
        onSubmit={handleRegister} 
        setLink={setHeaderLink}/>
        </Route>
        <Route exact path='/'>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
        <InfoTooltip options={tooltip} onClose={closeAllPopups}/>


      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
