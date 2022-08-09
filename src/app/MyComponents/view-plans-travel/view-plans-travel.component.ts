import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { PolicyPurchased } from 'src/app/Models/policyPurchased';

@Component({
  selector: 'app-view-plans-travel',
  templateUrl: './view-plans-travel.component.html',
  styleUrls: ['./view-plans-travel.component.css']
})
export class ViewPlansTravelComponent implements OnInit {

  type: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!ExInfo.loggedIn){
      this.router.navigate([''])
    }
  }
  calculateDiff(d: Date, a: Date) {
    var date1:any = new Date(d);
    var date2:any = new Date(a);
    var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  route(plan){
    PolicyPurchased.policyPlan = plan;
    if(plan=="PLATINUM"){
      PolicyPurchased.priceOfPremium = (1000+(200*this.calculateDiff(PolicyPurchased.departureDate, PolicyPurchased.returnDate)))*PolicyPurchased.numberOfPeople;
    }
    else if(plan=="GOLD"){
      PolicyPurchased.priceOfPremium = (600+(200*this.calculateDiff(PolicyPurchased.departureDate, PolicyPurchased.returnDate)))*PolicyPurchased.numberOfPeople;
    }
    else if(plan=="SILVER"){
      PolicyPurchased.priceOfPremium = (350+(200*this.calculateDiff(PolicyPurchased.departureDate, PolicyPurchased.returnDate)))*PolicyPurchased.numberOfPeople;
    }
    this.router.navigate(["payment"])
  }

}
