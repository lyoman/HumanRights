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
  }


  presentAlert(err) {
    const alert = this.alertController.create({
    header: 'Unable to retrive data!',
    message: err,
    subHeader: 'Network error, pliz try again',
    buttons: ['Dismiss']}).then(alert=> alert.present());
  }

}
