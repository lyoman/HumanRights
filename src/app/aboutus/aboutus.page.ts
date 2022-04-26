import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
})
export class AboutusPage implements OnInit {

  users: any = [];
  loading: any;

  constructor(
    private apiService: ApiService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getUsers(localStorage.getItem('user_id'));
  }

  getUsers(id) {
    this.loading = true;
    this.apiService.getUsers1("users/user_detail/"+id).subscribe (data => {
      console.log("data", data);
      this.users = data;
      localStorage.setItem('is_superuser', data['is_superuser']);
      localStorage.setItem('is_staff', data['is_staff']);
      // data = data["results

      this.loading = false;
      console.log(this.users);
    }, (err) => {
      console.log(err);
      this.loading = false;
      this.presentAlert(err.message);
    });
  }

  presentAlert(err) {
    const alert = this.alertController.create({
    header: 'Authentication Error!',
    message: err,
    subHeader: 'Failed to Login',
    buttons: ['Dismiss']}).then(alert=> alert.present());
  }

}
