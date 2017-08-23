import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import  { ShopUser } from '../models/shopUser'

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class LocalUser {
  private USER_KEY: string = '_localUser';

  shopUser: ShopUser;

  _defaults: any;
  _readyPromise: Promise<any>;

  constructor(public storage: Storage) {
    
  }

  load() {
    return this.storage.get(this.USER_KEY).then((value) => {
      if (value) {
        this.shopUser = value;
        console.log(this.shopUser);
        return this.shopUser;
      } else {
        return null;
      }
    });
  }

  setUser(user: ShopUser) {
    console.log("Storing User");
    return this.storage.set(this.USER_KEY, user);
  }
   
}
