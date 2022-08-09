import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { PolicyPurchased } from 'src/app/Models/policyPurchased';

@Component({
  selector: 'app-vehicle-insurance-type',
  templateUrl: './vehicle-insurance-type.component.html',
  styleUrls: ['./vehicle-insurance-type.component.css']
})
export class VehicleInsuranceTypeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!ExInfo.loggedIn){
      this.router.navigate(['login'])
    }
  }

  run(type){
    PolicyPurchased.insuranceType = type;
    this.router.navigate(['vehicle-type'])
  }

}
