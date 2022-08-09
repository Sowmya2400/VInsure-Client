import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { PolicyPurchased } from 'src/app/Models/policyPurchased';

@Component({
  selector: 'app-view-plans',
  templateUrl: './view-plans.component.html',
  styleUrls: ['./view-plans.component.css']
})
export class ViewPlansComponent implements OnInit {

  type: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!ExInfo.loggedIn){
      this.router.navigate([''])
    }
  }

  route(plan){
    PolicyPurchased.policyPlan = plan;
    if(plan=="PLATINUM"){
      PolicyPurchased.priceOfPremium = 1000+(2*PolicyPurchased.vehiclePrice)/100;
    }
    else if(plan=="GOLD"){
      PolicyPurchased.priceOfPremium = 600+(2*PolicyPurchased.vehiclePrice)/100;
    }
    else if(plan=="SILVER"){
      PolicyPurchased.priceOfPremium = 350+(2*PolicyPurchased.vehiclePrice)/100;
    }
    this.router.navigate(["payment"])
  }

}
