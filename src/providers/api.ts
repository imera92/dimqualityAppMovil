import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


import { LocalUser } from './localUser'

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://localhost/DimqualityWebShop/index.php/api';
  apiKey: string =null;

  constructor(public http: Http, public localUser: LocalUser) {
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    options.headers= this.getHeaders();
    console.log(options);
    return this.http.get(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }
    options.headers= this.getHeaders();
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }
    options.headers= this.getHeaders();
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }
    options.headers= this.getHeaders();
    return this.http.delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }
    options.headers= this.getHeaders();
    return this.http.put(this.url + '/' + endpoint, body, options);
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
