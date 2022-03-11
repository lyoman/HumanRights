import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teb2',
  templateUrl: './teb2.page.html',
  styleUrls: ['./teb2.page.scss'],
})
export class Teb2Page implements OnInit {

  username = JSON.parse(localStorage.getItem("username"));

  token: any;
  users :any;
  response: any;
  response1: any;

  constructor(
    public router:Router, 
    ) { 

}

  ngOnInit() {
  }




}
