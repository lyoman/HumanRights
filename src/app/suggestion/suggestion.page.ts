import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.page.html',
  styleUrls: ['./suggestion.page.scss'],
})
export class SuggestionPage implements OnInit {

  suggestion = {
    fullname: '',
    email: '',
    phonenumber: '',
    description: ''
  }

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertController: AlertController,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  register() {
    this.presentAlert("Thank you!!!");
  }


  presentAlert(err) {
    const alert = this.alertController.create({
        header: 'Success!',
        message: err,
        subHeader: 'Your suggestions have been added successfully',
        buttons: ['Dismiss']
    }).then(alert => alert.present());
}



}
