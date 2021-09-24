import React, { FC } from 'react';
import './account.css';
import avatar from './img/avatar.png';

type AccountProps = {
  name: string;
  surname: string;
};

const Account: FC<AccountProps> = ({ name, surname }) => {
  return (
    <div className="account">
      <img src={avatar} alt="avatar" className="account__avatar" />
      <div className="account__info">
        <div className="account__name">
          {name} {surname}
        </div>
        <a href="http://" className="account__button">
          {' '}
          logout
        </a>
      </div>
    </div>
  );
};

export default Account;
