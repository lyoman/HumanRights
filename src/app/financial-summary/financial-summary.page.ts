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
  loading1: any;

  searchText;
  page = 1;
  pageSize = 15;

  userResults = [];

  totalStockOrdered: any;
  totalStockSold: any;

  profitloss: any;
  numberOfOrders: any;
  numberOfQuantity: any;

  totalAmountSold: any;
  totalQuantitySold: any;

  totalAmountBought: any;
  totalQuantityBought: any;

  bought = [];
  sold: any = [];

  plt: string;
  localhost:string = '';

  boughtStock = [];

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
    this.get();
  }


  get() {
    this.loading = true;
    this.apiService.getUsers1("new_stock/new_stock/?user="+JSON.parse(localStorage.getItem('user_id'))).subscribe (data => {
      console.log("data", data["results"]);
      this.bought = data["results"];
      // data = data["results"];
      this.totalStockOrdered = this.bought.length;


      const sumall = this.bought.map(item => parseInt(item.amount)).reduce((prev, curr) => prev + curr, 0);
      console.log('amount bought',sumall);

      this.totalAmountBought = sumall;


      const sumall1 = this.bought.map(item => parseInt(item.quantity)).reduce((prev, curr) => prev + curr, 0);
      console.log('quantity bought', sumall1);

      this.totalQuantityBought = sumall1;
      console.log(this.boughtStock);
      this.get3();

      this.loading = false;
      console.log(this.bought);
    }, (err) => {
      console.log(err);
      this.loading = false;
      this.presentAlert(err.message);
    });
  }


  get3() {
    this.apiService.getUsers1("new_stock/sold_stock_user/?user="+JSON.parse(localStorage.getItem('user_id'))).subscribe (data => {
      console.log('res', data);
      console.log('all added stock', data);

      this.loading1 = false;
      console.log('user sold stock', data);
      this.sold = data;

      this.totalStockSold = this.sold.length;

      const sumall = this.sold.map(item => parseInt(item.amount)).reduce((prev, curr) => prev + curr, 0);
      console.log(sumall);

      this.totalAmountSold = sumall;


      const sumall1 = this.sold.map(item => parseInt(item.quantity)).reduce((prev, curr) => prev + curr, 0);
      console.log(sumall1);

      this.totalQuantitySold = sumall1;

      this.profitloss = (this.totalAmountSold - this.totalAmountBought);
      console.log("this.profitloss", this.profitloss);
    }, (err) => {
      console.log(err);
      this.loading = false;
      // this.presentAlert(err.message);
    })
  }


  presentAlert(err) {
    const alert = this.alertController.create({
    header: 'Unable to retrive data!',
    message: err,
    subHeader: 'Network error, pliz try again',
    buttons: ['Dismiss']}).then(alert=> alert.present());
  }

}
