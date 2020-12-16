import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext)
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    isOwn ? 'elements__trash elements__trash_active' : 'elements__trash'
  );


  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    isLiked ? 'elements__like elements__like_active' : 'elements__like'
  );

  return (
    <li className="elements__list-item">
      <figure className="elements__figure">
        <button type="reset" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        <img className="elements__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
        <figcaption className="elements__figcaption">
          <h3 className="elements__title">{props.card.name}</h3>
          <div className="elements__like_group">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <span className="elements__like_number">{props.card.likes.length}</span>
          </div>
        </figcaption>
      </figure>
    </li>
  )
}

export default Card;