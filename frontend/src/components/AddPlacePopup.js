import React from 'react';
import PopupWithForm from './PopupWithForm.js';


function AddPlacePopup(props) {
  const [newCard, setNewCard] = React.useState({ name: '', link: '' });

  function handleNameinput(evt) {
    setNewCard({ ...newCard, name: evt.target.value })
  }

  function handleLinkInput(evt) {
    setNewCard({ ...newCard, link: evt.target.value })
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace(newCard);
  }



  return (
    <PopupWithForm name="add-card" title="Новое место" formName="add-form" children={
      <>
        <input onChange={handleNameinput} type="text" name="placename" id="place-name-input" placeholder="Название" 
        className="popup__item popupadd__item_place-name" required minLength="1" maxLength="30" 
        value={newCard.name}
        />
        <span id="place-name-input-error" className="popup__input-error">Вы пропустили это поле</span>
        <input onChange={handleLinkInput} type="url" name="placeimg" id="place-img-input" placeholder="Ссылка на картинку" 
        className="popup__item popupadd__item_place-img" required value={newCard.link}/>
        <span id="place-img-input-error" className="popup__input-error">Введите адрес сайта</span>
      </>
    }
      buttonTitle="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
    />
  )
}

export default AddPlacePopup