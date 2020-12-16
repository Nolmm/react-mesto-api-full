import React from 'react';

function PopupWithForm(props) {
  return (
    <section className={props.isOpen ? `popup popup__${props.name} popup_opened` : `popup popup__${props.name}`}>
      <div className="popup__container">
        <button type="button" className="popup__close popup__close-btn" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form name={props.formName} className="popup__form" noValidate onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__submit-button">{props.buttonTitle}</button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm;