import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store';
import './account.css';
import avatar from './img/avatar.png';

type AccountProps = {
  name: string;
  surname: string;
};

const Account: FC<AccountProps> = ({ name, surname }) => {
  const store = useStore();

  return (
    <div className="account">
      <img src={avatar} alt="avatar" className="account__avatar" />
      <div className="account__info">
        <div className="account__name">
          {name} {surname}
        </div>
        <Link
          to="/"
          className="account__button"
          onClick={() => {
            store.isAuthorized = false;
          }}
        >
          logout
        </Link>
      </div>
    </div>
  );
};

export default Account;
