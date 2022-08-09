import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { PolicyPurchased } from 'src/app/Models/policyPurchased';
import { PolicyToRenew } from 'src/app/Models/policyToRenew';

@Component({
  selector: 'app-payment-successful',
  templateUrl: './payment-successful.component.html',
  styleUrls: ['./payment-successful.component.css']
})
export class PaymentSuccessfulComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!ExInfo.loggedIn){
      this.router.navigate([''])
    }
    PolicyPurchased.insuranceFor = null;
    PolicyToRenew.policyNo = null;
  }
  route(){
    this.router.navigate(['dashboard'])
  }


}
