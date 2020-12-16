import React from 'react';
import PopupWithForm from './PopupWithForm.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль" formName="edit-form" children={
      <>
        <input type="text" name="name" id="name-input" className="popup__item popup__item_name" required minLength="2" maxLength="40" placeholder="Имя"
          onChange={handleChangeName} value={name || ''}
        />
        <span id="name-input-error" className="popup__input-error">Вы пропустили это поле</span>
        <input type="text" name="job" id="job-input" className="popup__item popup__item_job" required minLength="2" maxLength="200" placeholder="Занятие"
          onChange={handleChangeDescription} value={description || ''}/>
        <span id="job-input-error" className="popup__input-error">Вы пропустили это поле</span>
      </>
    }
      buttonTitle="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
    />
  )
}

export default EditProfilePopup;