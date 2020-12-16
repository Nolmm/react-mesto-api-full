import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
// import api from '../utils/Api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main>
      <section className="profile">
        <div className="profile__group" onClick={props.onEditAvatar}>
          <img src={currentUser.avatar} className="profile__avatar" alt="фото" />
          <div className="profile__avatar_pencil"></div>
        </div>

        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p></div>
          <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((card, _id) => (
            <Card key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete} />
          ))}
        </ul>
      </section>
      <ImagePopup
        card={props.card}
        onClose={props.onClose} />
      <PopupWithForm name="question" title="Вы уверены?" buttonTitle="Да" />
    </main>
  )
}

export default Main;