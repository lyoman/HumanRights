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
  
  
  boughtStock = [];

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
    console.log("localStorage.getItem('is_superuser')", localStorage.getItem('is_superuser'));
    if(localStorage.getItem('is_superuser') == "true") {
      this.get();
    } else {
      this.get1();
    }
    
  }

  
  get1() {
    this.loading = true;
    this.apiService.getUsers1("reportcase/report_case?user="+JSON.parse(localStorage.getItem('user_id'))).subscribe (data => {
      console.log("data", data["results"]);
      this.boughtStock = data["results"];
      this.loading = false;
      if(this.boughtStock.length == 0) {
        this.presentAlert4("There are no saved cases yet!");
      }
      console.log(this.boughtStock);
    }, (err) => {
      console.log(err);
      this.loading = false;
      this.presentAlert(err.message);
    });
  }

  get() {
    this.loading = true;
    this.apiService.getUsers1("reportcase/report_case").subscribe (data => {
      console.log("admin", data["results"]);
      this.boughtStock = data["results"];
      this.loading = false;
      if(this.boughtStock.length == 0) {
        this.presentAlert4("There are no saved cases yet!");
      }
      console.log(this.boughtStock);
    }, (err) => {
      console.log(err);
      this.loading = false;
      this.presentAlert(err.message);
    });
  }

  boughtDetail(news){
    this.navData.setParamData(news);
    this.router.navigateByUrl('/addstock/addstock-view/'+news.id);
  }

  presentAlert(err) {
    const alert = this.alertController.create({
    header: 'Unable to retrive data!',
    message: err,
    subHeader: 'Network error, pliz try again',
    buttons: ['Dismiss']}).then(alert=> alert.present());
  }

  presentAlert3(err) {
    const alert = this.alertController.create({
    header: 'Unable to retrive data!',
    message: err,
    subHeader: 'Network error, pliz try again',
    buttons: ['Dismiss']}).then(alert=> alert.present());
  }

  presentAlert4(err) {
    const alert = this.alertController.create({
    header: 'No saved data!',
    message: err,
    subHeader: 'Add a case and try again',
    buttons: ['Dismiss']}).then(alert=> alert.present());
  }

}
