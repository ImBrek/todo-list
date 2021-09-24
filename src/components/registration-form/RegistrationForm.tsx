import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../store';
import './registration-form.css';

const RegistrationForm: FC = () => {
  const store = useStore();
  const history = useHistory();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [isLinkActive, setIsLinkActive] = useState(false);

  useEffect(() => {
    const isValid = [name, surname, password].every(value => value.length > 0);
    if (isLinkActive !== isValid) setIsLinkActive(isValid);
  }, [name, surname, password, isLinkActive]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.isAuthorized = true;
    store.addNewUser(name, surname);
    history.push(`/todo-list`);
  };

  return (
    <form
      className="registration-form"
      onSubmit={event =>
        isLinkActive ? handleFormSubmit(event) : event.preventDefault()
      }
    >
      <h1>Регистрация</h1>
      <input
        className="registration-form__input"
        type="text"
        value={name}
        placeholder="Имя"
        onChange={event => setName(event.target.value)}
      />
      <input
        className="registration-form__input"
        type="text"
        value={surname}
        placeholder="Фамилия"
        onChange={event => setSurname(event.target.value)}
      />
      <input
        className="registration-form__input"
        type="password"
        value={password}
        placeholder="Пароль"
        onChange={event => setPassword(event.target.value)}
      />
      <button type="submit" disabled={!isLinkActive}>
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegistrationForm;
