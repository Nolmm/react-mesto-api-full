import React from 'react';
import PopupWithForm from './PopupWithForm.js';


function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm name="editavatar" title="Обновить аватар" formName="edit-avatar" children={
      <>
        <input ref={avatarRef} type="url" id="avatar-input" name="link" placeholder="Ссылка" className="popup__item popup__item_avatar" required minLength="1" />
        <span id="avatar-input-error" className="popup__input-error">Вы пропустили это поле</span>
      </>
    }
      buttonTitle="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
    />
  )
}

export default EditAvatarPopup