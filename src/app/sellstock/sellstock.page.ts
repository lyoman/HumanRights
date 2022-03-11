import { NavigateDataService } from './../services/navigate-data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { Http, HttpResponse } from '@capacitor-community/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sellstock',
  templateUrl: './sellstock.page.html',
  styleUrls: ['./sellstock.page.scss'],
})
export class SellstockPage implements OnInit {

  plt: string;
  localhost:string = '';
  loading: any;

  soldStock: any = [];

  constructor(
    private platform: Platform,
    public router: Router, 
    private apiService: ApiService,
    private alertController: AlertController,
    private navData: NavigateDataService
    ) {

  }

  ngOnInit() {
    this.get2();
  }


  get2() {
    this.loading = true;
    this.apiService.getUsers1("new_stock/sold_stock_user/?user="+JSON.parse(localStorage.getItem('user_id'))).subscribe (data => {
      console.log("data", data);
      this.soldStock = data;
      this.loading = false;
      if(this.soldStock.length == 0) {
        this.presentAlert3();
      }
      console.log(this.soldStock);
    }, (err) => {
      console.log(err);
      this.loading = false;
      this.presentAlert(err.message);
    });
  }

  boughtDetail(news){
    this.navData.setParamData(news);
    this.router.navigateByUrl('/sellstock/sellstock-view');
  }


  presentAlert(err) {
    const alert = this.alertController.create({
    header: 'Unable to retrive data!',
    message: err,
    subHeader: 'Network error, pliz try again',
    buttons: ['Dismiss']}).then(alert=> alert.present());
  }

  presentAlert3() {
    const alert = this.alertController.create({
    header: 'No saved data!',
    message: 'You currently have no sold stock in the system',
    subHeader: 'Sell stock and try again',
    buttons: ['Dismiss']}).then(alert=> alert.present());
  }


}
