import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminExInfo } from 'src/app/Models/Admin-ExInfo';
import { ExInfo } from 'src/app/Models/Ex-Info';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string = ExInfo.title
  loggedIn: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loggedIn = ExInfo.loggedIn;
    if(AdminExInfo.loggedIn){
      this.router.navigate(['admin-dashboard'])
    }
  }

}
