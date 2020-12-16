import React from 'react';
import { Link } from 'react-router-dom';


function FormAuthLog(props) {
  function handleEmailInput (evt) {
    props.setEmail(evt.target.value);
}
function handlePasswordInput (evt) {
    props.setPassword(evt.target.value);
}
function submitHandler (evt) {
    evt.preventDefault();
    props.onSubmit();
}
return (
  <form className="formauth" onSubmit={submitHandler}>
    <h2 className="formauth__title">{props.title}</h2>
    <div className="formauth__container">
      <input onChange={handleEmailInput} type="email" className="formauth__input" placeholder="Email" required></input>
      <input onChange={handlePasswordInput} type="password" className="formauth__input" placeholder="Пароль" required></input>
    </div>
    <button type="submit" className="formauth__submit-button">{props.buttonTitle}</button>
    <Link className="formauth__link" to={props.route}>{props.linkTitle}</Link>
  </form>

)
}

export default FormAuthLog;