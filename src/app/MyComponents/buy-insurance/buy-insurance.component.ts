
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { PolicyPurchased } from 'src/app/Models/policyPurchased';

@Component({
  selector: 'app-buy-insurance',
  templateUrl: './buy-insurance.component.html',
  styleUrls: ['./buy-insurance.component.css']
})
export class BuyInsuranceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!ExInfo.loggedIn){
      this.router.navigate(['login'])
    }
  }

  routeTo(route){
    PolicyPurchased.insuranceFor=route.toUpperCase()
    this.router.navigate([route])
  }

}
