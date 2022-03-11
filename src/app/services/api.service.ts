import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';

import { Platform } from '@ionic/angular';
import { Http, HttpResponse } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // constructor() { }

  // AUTH_SERVER_ADDRESS:  string  =  'https://smartaccounting.pythonanywhere.com/api/';
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8000/api/';

  plt: string;
  localhost:string = '';

  web_get_unrestricted = 0;
  web_post_unrestricted = 0;
  web_put_unrestricted = 0;
  web_delete_unrestricted = 0;

  android_get_unrestricted = 0;
  android_post_unrestricted = 0;
  android_put_unrestricted = 0;
  android_delete_unrestricted = 0;
  
  ios_get_unrestricted = 0;
  ios_post_unrestricted = 0;
  ios_put_unrestricted = 0;
  ios_delete_unrestricted = 0;
  // More variables for restricted API calls

  constructor(
    private httpClient: HttpClient,
    private platform: Platform,
    ) {
      this.plt = this.platform.is('mobileweb') ? 'web' :
      this.platform.is('ios') ? 'ios' : 'android'
      // this.localhost ="smartaccounting.pythonanywhere.com/api/";
      this.localhost ="localhost:8000/api/";
     }

  login(url, userData) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}${url}`, userData, { headers: { 'Content-Type': 'application/json' } });
  }


  get(endpoint) {
    return Http.request({ url: `https://${this.localhost}${endpoint}`, method: 'GET', headers: { 'Content-Type': 'application/json' } })
      .then(async response => {
        if (response.status === 200) {
          const data = await response.data;
          console.log(data)
          this.changeStatus('get', 'unrestricted', 1);
        }
      })
      .catch(e => {
        console.log(e)
        this.changeStatus('get', 'unrestricted', 2);
      })
  }

  changeStatus(type, restriction, status) {
    this[`${this.plt}_${type}_${restriction}`] = status
  }

  getUsers1(endpoint) {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}${endpoint}`, { headers: { 'Content-Type': 'application/json' } });
  }


  getUsers(endpoint): Observable<any> {
    if (this.platform.is('mobileweb') || this.platform.is('desktop')) {

      return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}${endpoint}`, { headers: { 'Content-Type': 'application/json' } });
      // return this.httpClient
      //   .get<Observable<any>>(this.AUTH_SERVER_ADDRESS + endpoint)
      //   .pipe(
      //     res => {
      //       console.log(res);
      //     }
      //   );
    } else {
      return from(
        Http.get({ url: `https://${this.localhost}${endpoint}`, method: 'GET', headers: { 'Content-Type': 'application/json' } }
      ).then(async res => {
        if (res.status === 200) {
          const data = await res.data;
          console.log(data)
          this.changeStatus('get', 'unrestricted', 1);
        }
      })
        // tap(data => console.log(data.data, Array.isArray(data.data))),
        // // map((data: any) => JSON.parse(data.data)),
        // tap(data => console.log(data.data, Array.isArray(data.data))),
        // map((data: any) => {
        //   const users = JSON.parse(data.data);
        //   return users.filter((user: any) => {
        //     user.name = 'Mobile ' + user.name;
        //     return user;
        //   });
        // }),
      );
    }
  }


}
