import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OtpWrapper } from 'src/app/Models/otp-wrapper';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: string;
  password: string;
  otp: number;
  buttonName: string = "Send OTP";
  buttonName2: string = "Submit";
  result: boolean=false;

  @ViewChild("EmailElement") emailElement: ElementRef;
  @ViewChild("PasswordElement") passwordElement: ElementRef;
  @ViewChild("OtpElement") otpElement: ElementRef;

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
  }

  emailCheck(e): boolean {
    let v = e.lastChild.value;
    if (!v) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - This field is required!";
      return false;
    }
    else if (v.length < 3) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Enter proper Email ID!";
      return false;
    }
    else if (!(v.includes("@") && v.includes(".") && (v.split("@").length - 1) == 1 && !(v.includes("@.") && v.includes(".@")))) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Enter proper Email ID!";
      return false;
    }
    else {
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
    }
  }

  passwordCheck(e): boolean {
    let v = e.lastChild.value
    function checkNum(s) {
      for (let n of s) {
        if (/^\d/.test(n)) {
          return true;
        }
      }
      return false;
    }
    if (!v) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - This field is required!";
      return false;
    }
    else if (v.length < 8) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Minimum 8 characters is allowed!";
      return false;
    }
    else if (v.length > 20) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Maximum 20 characters is allowed!";
      return false;
    }
    else if (!checkNum(v)) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Atleast one number is required!";
      return false;
    }
    else if(!(v.includes("@") || v.includes(".") || v.includes("*") || v.includes("$"))){
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - One Special character(@.*$) is required!";
      return false;
    }
    else {
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
    }
  }

  otpCheck(e): boolean{
    let v = e.lastChild.value;
    if (!v) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - This field is required!";
      return false;
    }
    return true;
  }

  showError(element, message){
    element.children[1].textContent = message;
  }


  sendOtp(e){
    this.buttonName = "Please Wait..."
    if(!this.email){
      this.showError(this.emailElement.nativeElement, " - This field is required!");
      this.buttonName = "Send OTP"
    }
    if(!this.password){
      this.showError(this.passwordElement.nativeElement, " - This field is required!");
      this.buttonName = "Send OTP"
    }
    else{
      this.result = true;
      this.customerService.sendOtp(this.email).subscribe(res=>{
        if(res.Response=="FAILED"){
          alert("Server Error!")
        }
        else if(res.Response=="OK"){
          this.buttonName = "OTP Sent!"
        }
      })
      
    }
  }

  checkOtp(e){
    this.buttonName2 = "Please Wait..."
    if(!this.otp){
      this.showError(this.otpElement.nativeElement, " - This field is required!");
      
    }
    else{
      let otpWrapper: OtpWrapper = new OtpWrapper(this.email, this.otp, this.password)
      this.customerService.checkOtp(otpWrapper).subscribe(
        res=>{
          if(res.Response=="OK"){
            this.router.navigate(['login'])
          }
          else if(res.Response=="INCORRECT"){
            this.showError(this.otpElement.nativeElement, " - Incorrect OTP!");
          }
          else{
            this.showError(this.otpElement.nativeElement, " - Failed!");
          }
        }
      )
    }
    this.buttonName2 = "Submit"
  }


}
