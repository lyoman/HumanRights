import { NavigateDataService } from './../services/navigate-data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { Http, HttpResponse } from '@capacitor-community/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-financial-summary',
  templateUrl: './financial-summary.page.html',
  styleUrls: ['./financial-summary.page.scss'],
})
export class FinancialSummaryPage implements OnInit {

  loading: any;

  bought = [];
  sold: any = [];

  plt: string;
  localhost:string = '';

  boughtStock = [];
  users:any = [];
  companies: any = [];

  constructor(
    private platform: Platform,
    public router: Router, 
    private apiService: ApiService,
    private alertController: AlertController,
    private navData: NavigateDataService
    ) {

  }

  ngOnInit() {
    // this.get();
    this.getUsers();
    this.getCompanies();
    this.get();
  }


  get() {
    this.loading = true;
    this.apiService.getUsers1("reportcase/report_case/").subscribe (data => {
      console.log("data", data["results"]);
      this.bought = data["results"];
      // data = data["results

      this.loading = false;
      console.log(this.bought);
    }, (err) => {
      console.log(err);
      this.loading = false;
      this.presentAlert(err.message);
    });
  }

  getUsers() {
    // this.loading = true;
    this.apiService.getUsers1("users/").subscribe (data => {
      console.log("data", data);
      this.users = data;
      // data = data["results

      // this.loading = false;
      console.log(this.users);
    }, (err) => {
      console.log(err);
      // this.loading = false;
      this.presentAlert(err.message);
    });
  }


  getCompanies() {
    // this.loading = true;
    this.apiService.getUsers1("reportcase/company/").subscribe (data => {
      console.log("data", data);
      this.companies = data;
      // data = data["results

      // this.loading = false;
      console.log(this.companies);
    }, (err) => {
      console.log(err);
      // this.loading = false;
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
