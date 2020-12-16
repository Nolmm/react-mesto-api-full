import React from 'react';
import FormAuthLog from './FormAuthLog.js'

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    props.setLink({title: 'Регистация', link: false});
}, []);

  function onSubmit() {
    props.onSubmit({
      password: password,
      email: email
    })
  }

  return (
    <FormAuthLog title="Вход" buttonTitle="Войти" linkTitle = "Ещё не зарегистрированы? Регистрация" 
    route="/signup" onSubmit = { onSubmit }
    setEmail = { setEmail }
    setPassword = { setPassword } />
  )
}

export default Login;