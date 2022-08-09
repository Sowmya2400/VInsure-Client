import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { Login } from 'src/app/Models/login';
import { Policy } from 'src/app/Models/policy';
import { policyLogin } from 'src/app/Models/policy-login';
import { PolicyPurchased } from 'src/app/Models/policyPurchased';
import { PolicyToRenew } from 'src/app/Models/policyToRenew';
import { CustomerService } from 'src/app/Services/customer.service';


@Component({
  selector: 'app-renew-payment',
  templateUrl: './renew-payment.component.html',
  styleUrls: ['./renew-payment.component.css']
})
export class RenewPaymentComponent implements OnInit {

  price: number;
  policyNo
  vehicleCompany
  vehicleModel
  registrationNumber
  licenseNo
  buttonName: string;
  cardNo:string
  cvv:string
  expiry:string


  @ViewChild("cardNoelement") cardNoelement: ElementRef;
  @ViewChild("cvvelement") cvvelement: ElementRef;
  @ViewChild("expiryelement") expiryelement: ElementRef;

  constructor(private customerService: CustomerService, private router: Router) {
    this.price = PolicyToRenew.price
    this.policyNo = PolicyToRenew.policyNo
    this.vehicleCompany = PolicyToRenew.vehicleCompany
    this.vehicleModel = PolicyToRenew.vehicleModel
    this.registrationNumber = PolicyToRenew.registrationNumber
    this.licenseNo = PolicyToRenew.licenseNo
    this.buttonName = "Pay ₹" + this.price;

  }

  ngOnInit(): void {
    if(!ExInfo.loggedIn || !PolicyToRenew.policyNo){
      this.router.navigate([''])
    }

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

  onPay() {
    this.buttonName = "Please Wait...";
    let login = new Login(ExInfo.customerEmail, ExInfo.password)
    this.customerService.renewPolicy(login, String(PolicyToRenew.policyNo)).subscribe(
      result => {
        if (result.Response == "Success") {
          this.price = result.Premium_Price
          console.log("Renewed")
          this.router.navigate(['payment-successful'])
        }
        else {
          alert("Some Error")
          this.buttonName = "Pay ₹" + this.price;
        }
      }
    )

  }
}
