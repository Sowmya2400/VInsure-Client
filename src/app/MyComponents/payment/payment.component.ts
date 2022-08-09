import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AddPolicyWrapper } from 'src/app/Models/add-policy-wrapper';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { Login } from 'src/app/Models/login';
import { Policy } from 'src/app/Models/policy';
import { PolicyPurchased } from 'src/app/Models/policyPurchased';
import { Travel } from 'src/app/Models/travel';
import { Vehicle } from 'src/app/Models/vehicle';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  price: number = PolicyPurchased.priceOfPremium;
  maxClaim: number;
  insuranceType: string = PolicyPurchased.insuranceType
  insuranceFor: string = PolicyPurchased.insuranceFor
  plan: string = PolicyPurchased.policyPlan
  noOfMembers: number = PolicyPurchased.numberOfPeople
  buttonName: string = "Pay ₹" + this.price;
  cardNo:string
  cvv:string
  expiry:string


  @ViewChild("cardNoelement") cardNoelement: ElementRef;
  @ViewChild("cvvelement") cvvelement: ElementRef;
  @ViewChild("expiryelement") expiryelement: ElementRef;

  constructor(private customerService: CustomerService, private router: Router) {
  }

  onCard(e): boolean {
    let v = e.lastChild.value
    if (!v) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - This field is required!";
      return false
    }
    else {
      if (v.length != 16) {
        e.lastChild.classList.add('input-alert')
        e.children[1].textContent = " - This field requires 16 numbers";
        return false
      }
      else{
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
      }
    }
  }
 
  onCVV(e): boolean {
    let v = e.lastChild.value
    if (!v) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - This field is required!";
      return false
    }
    else {
      if (v.length != 3) {
        e.lastChild.classList.add('input-alert')
        e.children[1].textContent = " - This field requires 3 numbers";
        return false
      }
      else{
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
      }
    }
  }

  onBlur(e){
      let v = e.lastChild.value
      if (!v) {
        e.lastChild.classList.add('input-alert')
        e.children[1].textContent = " - This field is required!";
        return false
      }
      else {
        e.lastChild.classList.remove('input-alert')
        e.children[1].textContent = "";
        return true;
      }
  }
  onInput(e){
    e.lastChild.classList.remove('input-alert')
    e.children[1].textContent = "";
    return true;

      
  }
 

  calculateDiff(d: Date, a: Date) {
    var date1: any = new Date(d);
    var date2: any = new Date(a);
    var diffDays: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  calMaxClaim(p: PolicyPurchased) {
    let maxClaim: number = 0;
    if (PolicyPurchased.insuranceFor == "VEHICLE") {
      let date = PolicyPurchased.purchaseDate
      let age = ((new Date()).getFullYear() - (new Date(date)).getFullYear());
      let price = PolicyPurchased.vehiclePrice
      if (age < 1) {
        maxClaim = price - 15 * price / 100;
      }
      else if (age >= 1 && age < 2) {
        maxClaim = price - 20 * price / 100;
      }
      else if (age >= 2 && age < 3) {
        maxClaim = price - 30 * price / 100;
      }
      else if (age >= 3 && age < 4) {
        maxClaim = price - 40 * price / 100;
      }
      else if (age >= 4) {
        maxClaim = price - 50 * price / 100;
      }
    }
    else if (PolicyPurchased.insuranceFor == "TRAVEL") {
      let days = this.calculateDiff(PolicyPurchased.departureDate, PolicyPurchased.returnDate)
      maxClaim = 500000
    }
    return maxClaim
  }

  ngOnInit(): void {
    if (!ExInfo.loggedIn || !PolicyPurchased.insuranceFor) {
      this.router.navigate([''])
    }
    this.maxClaim = this.calMaxClaim(PolicyPurchased)
    PolicyPurchased.maxClaim = this.maxClaim;
  }

  pay() {
    this.buttonName = "Please Wait..."
    let policy: Policy = new Policy(PolicyPurchased.priceOfPremium, PolicyPurchased.policyPlan, PolicyPurchased.insuranceType, PolicyPurchased.maxClaim, PolicyPurchased.insuranceFor, PolicyPurchased.policyDuration)
    let vehicle: Vehicle;
    let travel: Travel;
    if (PolicyPurchased.insuranceFor == "VEHICLE") {
      vehicle = new Vehicle(PolicyPurchased.vehicleType, PolicyPurchased.manufacturer, PolicyPurchased.vehicleModel, PolicyPurchased.purchaseDate, PolicyPurchased.licenseNo, PolicyPurchased.registrationNo,  PolicyPurchased.registrationFile, PolicyPurchased.engineNo, PolicyPurchased.chassisNo, PolicyPurchased.vehiclePrice)
      travel = new Travel(null, null, null, null, null)
    }
    else if (PolicyPurchased.insuranceFor == "TRAVEL") {
      travel = new Travel(PolicyPurchased.departureDate, PolicyPurchased.returnDate, PolicyPurchased.registrationFile, PolicyPurchased.placeOfVisit, PolicyPurchased.numberOfPeople)
      vehicle = new Vehicle(null, null, null, null, null, null, null, null, null, null)
    }
    let login: Login = new Login(ExInfo.customerEmail, ExInfo.password)
    let addPolicyWrapper: AddPolicyWrapper = new AddPolicyWrapper(login, policy, vehicle, travel)
    this.customerService.addPolicy(addPolicyWrapper).subscribe(
      res => {
        if (res.Response == "OK") {
          this.router.navigate(['payment-successful'])
        }
        else {
          alert("Server Error!")
          this.buttonName = "Pay ₹" + this.price;
        }
      }
    )
  }



}
