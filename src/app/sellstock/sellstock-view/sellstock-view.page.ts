import { Component, OnInit } from '@angular/core';
import { NavigateDataService } from './../../services/navigate-data.service';

@Component({
  selector: 'app-sellstock-view',
  templateUrl: './sellstock-view.page.html',
  styleUrls: ['./sellstock-view.page.scss'],
})
export class SellstockViewPage implements OnInit {

  sold: any;

  constructor(
    private navData: NavigateDataService,
  ) { }

  ngOnInit() {
    this.sold = this.navData.getParamData();
    console.log('sold', this.sold);
  }

}
