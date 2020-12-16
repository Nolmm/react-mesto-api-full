import React from 'react';
import FormAuthLog from './FormAuthLog.js'

function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    React.useEffect(() => {
        props.setLink({ title: 'Войти', link: true });
    }, [])

    function onSubmit() {
        props.onSubmit({
            password: password,
            email: email
        })
    }

    return ( <
        FormAuthLog title = "Регистрация"
        buttonTitle = "Зарегестрироваться"
        linkTitle = "Уже зарегистрированы? Войти"
        route = "/signin"  //нужна ли точка
        onSubmit = { onSubmit }
        setEmail = { setEmail }
        setPassword = { setPassword }
        />
    )
}

export default Register;