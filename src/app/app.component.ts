import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/tebs',
      icon: 'home'
    },
    {
      title: 'Add Report',
      url: '/addstock/addstock-new',
      icon: 'paper-plane'
    },
    {
      title: 'View Unread reports',
      url: '/sellstock/sellstock-new',
      icon: 'archive'
    },
    {
      title: 'View All Reports',
      url: '/financial-summary',
      icon: 'book'
    },
    {
      title: 'Help',
      url: '/tebs/teb3',
      icon: 'play'
    },
    {
      title: 'Contact',
      url: '/contactus',
      icon: 'call'
    },
    {
      title: 'About',
      url: '/aboutus',
      icon: 'information-circle'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  loggedIn = false;
  dark = false; 

  constructor(
    private platform: Platform,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }


  logout() {
    localStorage.clear();
  }

  navigateP(url){
    this.router.navigateByUrl(url);
  }
}
