import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { PolicyPurchased } from 'src/app/Models/policyPurchased';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css']
})
export class VehicleTypeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!ExInfo.loggedIn || PolicyPurchased.insuranceType==null){
      this.router.navigate(['login'])
    }
  }

  run(type){
    PolicyPurchased.vehicleType = type;
    this.router.navigate(['vehicle-info-form'])
  }

}
