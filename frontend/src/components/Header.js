import React from 'react';
import Logo from '../images/logo.svg'
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo" src={Logo}></div>
      {props.loggedIn ? '' : <Link className="header__link" to={`/${props.setLink.link ? 'signin' : 'signup'}`} >{props.setLink.title}</Link>}
      <div className={`header__container ${props.loggedIn ? '' : 'header__container_invisible '}`}>
      <h3 className="header__email">{props.email}</h3>
      <button className="header__button" type='button' onClick={props.onClick}>Выйти</button>
      </div>
    </header>
  )
}

export default Header;