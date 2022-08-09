import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExInfo } from 'src/app/Models/Ex-Info';

@Component({
  selector: 'app-renew-notexpired',
  templateUrl: './renew-notexpired.component.html',
  styleUrls: ['./renew-notexpired.component.css']
})
export class RenewNotexpiredComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!ExInfo.loggedIn){
      this.router.navigate([''])
    }
  }

  route(){
    this.router.navigate(['dashboard'])
  }

}
