import { observable, action, makeObservable, runInAction } from 'mobx';

import { Account } from './accountStoreTypes';
import service from './accountStoreService';

class AccountStore {
  user?: Account = undefined;

  isAuth = false;

  constructor() {
    makeObservable(this, {
      user: observable,
      signIn: action.bound,
      logout: action.bound,
    });
  }

  async signIn(username: string, password: string): Promise<void> {
    const newUser = await service.signIn(username, password);
    runInAction(() => {
      this.user = { id: newUser.id, username: newUser.username, name: newUser.name };
      this.isAuth = true;
    });
  }

  async logout(): Promise<void> {
    await service.logout();
    runInAction(() => {
      this.isAuth = false;
    });
  }
}

export default new AccountStore();
