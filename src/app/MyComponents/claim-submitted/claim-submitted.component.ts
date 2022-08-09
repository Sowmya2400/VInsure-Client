import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExInfo } from 'src/app/Models/Ex-Info';

@Component({
  selector: 'app-claim-submitted',
  templateUrl: './claim-submitted.component.html',
  styleUrls: ['./claim-submitted.component.css']
})
export class ClaimSubmittedComponent implements OnInit {

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
