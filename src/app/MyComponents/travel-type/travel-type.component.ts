import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { PolicyPurchased } from 'src/app/Models/policyPurchased';

@Component({
  selector: 'app-travel-type',
  templateUrl: './travel-type.component.html',
  styleUrls: ['./travel-type.component.css']
})
export class TravelTypeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!ExInfo.loggedIn){
      this.router.navigate([''])
    }
  }

  run(type){
    if(type=="INDIVIDUAL"){
      PolicyPurchased.numberOfPeople = 1;
    }
    this.router.navigate(['travel-form'])
  }

}
