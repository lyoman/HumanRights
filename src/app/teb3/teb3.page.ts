import { NavigateDataService } from './../services/navigate-data.service';
import { Router } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Http, HttpResponse } from '@capacitor-community/http';

@Component({
  selector: 'app-teb3',
  templateUrl: './teb3.page.html',
  styleUrls: ['./teb3.page.scss']
})
export class Teb3Page implements OnInit {
  
  plt: string;
  localhost:string = '';
  loading: any;

  bought: any;
  bought2 = new Date();

  username = JSON.parse(localStorage.getItem("username"));

  constructor(
    private platform: Platform,
    public router: Router, 
    private apiService: ApiService,
    private alertController: AlertController,
    private navData: NavigateDataService
    ) {

  }

  ngOnInit() {
    this.get(JSON.parse(localStorage.getItem("user_id")));
  }

  
  get(id) {
    this.loading = true;
    this.apiService.getUsers1("users/user_detail/"+id).subscribe (data => {
      console.log("data", data);
      this.bought = data;
      this.loading = false;
      console.log(this.bought);
    }, (err) => {
      console.log(err);
      this.loading = false;
      this.presentAlert(err.message);
    });
  }

  presentAlert(err) {
    const alert = this.alertController.create({
    header: 'Unable to retrive data!',
    message: err,
    subHeader: 'Network error, pliz try again',
    buttons: ['Dismiss']}).then(alert=> alert.present());
  }

}
