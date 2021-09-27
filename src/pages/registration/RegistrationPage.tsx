import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import RegistrationForm from '../../components/registration-form';
import accountStore from '../../store/account-store/AccountStore';

const RegistrationPage: FC = () => {
  const { signIn } = accountStore;
  const history = useHistory();

  const onSubmit = async (username: string, password: string) => {
    await signIn(username, password);
    history.push(`/todo-list`);
  };
  return <RegistrationForm onSubmitAction={onSubmit}></RegistrationForm>;
};

export default RegistrationPage;
