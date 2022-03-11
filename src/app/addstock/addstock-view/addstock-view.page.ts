import { Platform, AlertController } from '@ionic/angular';
import { NavigateDataService } from './../../services/navigate-data.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Http, HttpResponse } from '@capacitor-community/http';

@Component({
  selector: 'app-addstock-view',
  templateUrl: './addstock-view.page.html',
  styleUrls: ['./addstock-view.page.scss'],
})
export class AddstockViewPage implements OnInit {

  bought: any;

  race: any;
  sold: any = [];
  loading = false;
  loading2 = false;

  profitloss: any;

  totalAmount = 0;
  totalQuantitySold = 0;


  plt: string;
  localhost: string = '';

  boughtStock = [];

  constructor(
    private navData: NavigateDataService,
    private apiService: ApiService,
    private platform: Platform,
    private alertController: AlertController,
  ) {

  }

  ngOnInit() {
    this.bought = this.navData.getParamData();
    console.log('bought', this.bought);
    this.getOneSold(this.bought.id);
  }

  getOneSold(id) {
    this.loading2 = true;
    this.apiService.getUsers1("new_stock/sold_stock/?stockname="+id).subscribe (data => {
      console.log("data", data);
      this.sold = data;

      const sumall = this.sold.map(item => parseInt(item.amount)).reduce((prev, curr) => prev + curr, 0);
      console.log(sumall);

      this.totalAmount = sumall;


      const sumall1 = this.sold.map(item => parseInt(item.quantity)).reduce((prev, curr) => prev + curr, 0);
      console.log(sumall1);

      this.totalQuantitySold = sumall1;

      this.profitloss = (this.totalAmount - this.bought.amount);

      this.loading2 = false;
      console.log(this.sold);
    }, (err) => {
      console.log(err);
      this.loading2 = false;
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
