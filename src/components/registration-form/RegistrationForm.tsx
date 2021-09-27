import React, { FC, useEffect, useState } from 'react';

import './registration-form.css';

type RegistrationFormProps = {
  onSubmitAction: (username: string, password: string) => void;
};

const RegistrationForm: FC<RegistrationFormProps> = ({ onSubmitAction }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLinkActive, setIsLinkActive] = useState(false);

  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLinkActive) onSubmitAction(username, password);
  };

  const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    const isValid = [username, password].every(value => value.length > 0);
    if (isLinkActive !== isValid) setIsLinkActive(isValid);
  }, [username, password]);

  return (
    <form className="registration-form" onSubmit={onSubmitForm}>
      <h1>Авторизация</h1>
      <input
        className="registration-form__input"
        type="text"
        value={username}
        placeholder="Логин"
        onChange={onChangeUsername}
      />
      <input
        className="registration-form__input"
        type="password"
        value={password}
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <button
        className="registration-form__button"
        type="submit"
        disabled={!isLinkActive}
      >
        Войти
      </button>
    </form>
  );
};

export default RegistrationForm;
