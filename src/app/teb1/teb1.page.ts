import { Platform, IonSlides, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

// import { Platform } from '@ionic/angular';
import { Http, HttpResponse } from '@capacitor-community/http';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-teb1',
  templateUrl: './teb1.page.html',
  styleUrls: ['./teb1.page.scss'],
})
export class Teb1Page implements OnInit {

  username = JSON.parse(localStorage.getItem("username"));

  plt: string;
  localhost:string = '';
  loading: any;

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
    private platform: Platform,
    public router: Router, 
    private apiService: ApiService,
    private alertController: AlertController,
    ) {
    this.plt = this.platform.is('mobileweb') ? 'web' :
      this.platform.is('ios') ? 'ios' : 'android'
      this.localhost ="smartaccounting.pythonanywhere.com/api/"
  }

  ngOnInit() {
    // this.getDate();
  }


  get() {
    Http.request({ url: `https://${this.localhost}new_stock/new_stock/`, method: 'GET' })
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


  post() {
    const data = { data: 'postData' }
    const options = {
      url: `http://${this.localhost}:5000/ionic4fullapp/us-central1/postData`,
      data: data,
      headers: { 'Content-Type': 'application/json' }
    };
    Http.request({ ...options, method: 'POST' })
      .then(async response => {
        if (response.status === 200) {
          const data = await response.data;
          console.log(data)
          this.changeStatus('post', 'unrestricted', 1);
        }
      })
      .catch(e => {
        console.log(e)
        this.changeStatus('post', 'unrestricted', 2);
      })
  }

  put() {
    const data = { data: 'putData' }
    const options = {
      url: `http://${this.localhost}:5000/ionic4fullapp/us-central1/putData`,
      data: data,
      headers: { 'Content-Type': 'application/json' }
    };
    Http.request({ ...options, method: 'PUT' })
      .then(async response => {
        if (response.status === 200) {
          const data = await response.data;
          console.log(data)
          this.changeStatus('put', 'unrestricted', 1);
        }
      })
      .catch(e => {
        console.log(e)
        this.changeStatus('put', 'unrestricted', 2);
      })
  }

  delete() {
    const data = { data: 'deleteData' }
    const options = {
      url: `http://${this.localhost}:5000/ionic4fullapp/us-central1/deleteData`,
      data: data,
      headers: { 'Content-Type': 'application/json' }
    };
    Http.request({ ...options, method: 'DELETE' })
      .then(async response => {
        if (response.status === 200) {
          const data = await response.data;
          console.log(data)
          this.changeStatus('delete', 'unrestricted', 1);
        }
      })
      .catch(e => {
        console.log(e)
        this.changeStatus('delete', 'unrestricted', 2);
      })
  }


  tutoring () {
    this.router.navigateByUrl('/tebs/teb4')
  }

  remediation () {
    this.router.navigateByUrl('/tebs/teb3')
  }

  training () {
    this.router.navigateByUrl('/tebs/teb2')
  }

  financial() {
    this.router.navigateByUrl('/financial-summary');
  }

  presentAlert(err) {
    const alert = this.alertController.create({
    header: 'Authentication Error!',
    message: err,
    subHeader: 'Failed to Login',
    buttons: ['Dismiss']}).then(alert=> alert.present());
  }


}

