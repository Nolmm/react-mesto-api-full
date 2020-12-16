import React from 'react';

function InfoTooltip(props) {
  return (
    <section className={`popup ${props.options.isOpen ? "popup_opened" : ''}`}>
      <div className="popup__container popup__container_info">
      <button type="button" className="popup__close popup__close-btn" onClick={props.onClose}></button>
      <div className={`popup__info ${props.options.success ? "popup__info-success" : 'popup__info-fail'}`}></div>
      <h2 className="popup__info-title">{props.options.title}</h2>
      </div>
      </section>
  )
}

export default  InfoTooltip;