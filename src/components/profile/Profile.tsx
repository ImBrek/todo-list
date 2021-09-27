import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Account } from '../../store/account-store/account-store-type';

import './profile.css';
import avatar from './img/avatar.png';

type ProfileProps = {
  user: Account;
  logout: () => Promise<void>;
};

const Profile: FC<ProfileProps> = ({ user, logout }) => {
  return (
    <div className="profile">
      <img src={avatar} alt="avatar" className="profile__avatar" />
      <div className="profile__info">
        <div className="profile__name">{user.name}</div>
        <Link to="/" className="profile__button" onClick={logout}>
          logout
        </Link>
      </div>
    </div>
  );
};

export default Profile;
