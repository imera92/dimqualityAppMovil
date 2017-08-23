import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

import { Cita } from '../models/cita';

import { LocalUser } from './localUser'

@Injectable()
export class Citas {
  apiKey: string;

  constructor(public http: Http, public api: Api, public localUser: LocalUser) {
    
  }

  query(params?: any) {
    console.log("QUERYING");
    this.localUser.load().then((user)=>{
      if(user){
        this.apiKey=user.key;
      }
    });
    console.log(this.apiKey);
    let options = new RequestOptions();
    options.headers= this.getHeaders();
    let seq = this.api.get('cita', options);
    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        if (res) {
          //this._loggedIn(res);
          console.log("RESponse");
          console.log(res);
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });
    console.log(seq);
    return seq;
  }

  add(cita: Cita) {
    return this.api.post('/cita', cita)
      .map(resp => resp.json());
  }

  delete(cita: Cita) {
    return this.api.delete('/cita')
      .map(resp => resp.json());
  }

  getHeaders(){
    let h = new Headers();
    h.set('Content-type', 'application/json');
    if(this.apiKey){
      h.append("x-api-key", this.apiKey);
    }    
    return h;
  }

}
