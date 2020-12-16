import React from 'react';

function ImagePopup(props) {
  return (
    <section className={Object.keys(props.card).length > 0 ? `popup popup__increase-img popup_opened` : `popup popup__increase-img`}>
      <div className="popup__container-increase">
        <button type="button" className="popup__close-img popup__close-btn" onClick={props.onClose}></button>
        <figure className="popup__figure">
          <img alt={props.card.name} src={props.card.link} className="popup__img" />
          <figcaption className="popup__figcaption">{props.card.name}</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default ImagePopup;


