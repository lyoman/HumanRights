import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {
    password: '',
    cpassword: '',
    email: '',
    phone_number: 0,
    business: '',
    username: '',
    first_name: '',
    last_name: '',
    user: JSON.parse(localStorage.getItem('user_id')),
    date: new Date()
  };

  loading: any;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  guest() {
    this.router.navigateByUrl('/guardian');
  }

  login() {
    this.router.navigateByUrl('/home');
  }

  // register() {
  //   this.router.navigateByUrl('/register');
  // }

  presentAlert2() {
    const alert = this.alertController.create({
      header: 'Notice',
      message: 'To register, visit the website',
      subHeader: 'website link http://blindstick.herokuapp.com/register',
      buttons: ['Dismiss']
    }).then(alert => alert.present());
  }


  register() {
    if(this.user.password != this.user.cpassword) {
      this.presentAlert5();
    } else {
      if (this.user.first_name == '' || this.user.username == '' || this.user.last_name == '' || this.user.business == '') {
        this.presentAlert1();
      }
      else {
        this.loading = true;
        this.authService.register('users/register/', this.user).subscribe((res) => {
  
          console.log(res);
          this.loading = false;
          
          this.navCtrl.navigateRoot('login');
          this.presentAlert7();
  
        }, (err) => {
          console.log(err);
          this.loading = false;
          this.presentAlert(err.message);
        });
      }
    }
  }

  presentAlert(err) {
    const alert = this.alertController.create({
      header: 'Authentication Error!',
      message: err,
      subHeader: 'Failed to Register',
      buttons: ['Dismiss']
    }).then(alert => alert.present());
  }

  presentAlert1() {
    const alert = this.alertController.create({
      header: 'Error!',
      message: 'Please fill in all fields in order to login',
      subHeader: 'Fill in all fields',
      buttons: ['Dismiss']
    }).then(alert => alert.present());
  }

  presentAlert5() {
    const alert = this.alertController.create({
      header: 'Passwords Error!',
      message: 'Verify your passwords and try again',
      subHeader: 'Passwords did not match',
      buttons: ['Dismiss']
    }).then(alert => alert.present());
  }

  
  presentAlert7() {
    const alert = this.alertController.create({
      header: 'Success!',
      message: 'Your account has been created, enter your Username and Password to login',
      subHeader: 'Account Created successfully',
      buttons: ['Dismiss']
    }).then(alert => alert.present());
  }

}
