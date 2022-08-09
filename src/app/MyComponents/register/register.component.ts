import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { Customer } from 'src/app/Models/customer';
import { CustomerService } from 'src/app/Services/customer.service';
import { Router } from '@angular/router';
import { OtpWrapper } from 'src/app/Models/otp-wrapper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = ExInfo.title;

  fullName: string;
  email: string;
  password: string;
  cpassword: string;
  dateOfBirth: Date;
  contactNumber: string;
  address: string;
  otp: number;
  terms: boolean;
  buttonName: string = "Register";
  otpSent: boolean = false;

  now: Date = new Date();
  maxDate: any = { year: this.now.getFullYear(), month: this.now.getMonth(), day: this.now.getDay() };
  minDate: any = { year: this.now.getFullYear() - 10, month: this.now.getMonth(), day: this.now.getDay() };;

  customer: Customer;

  @ViewChild("nameElement") nameElement: ElementRef;
  @ViewChild("emailElement") emailElement: ElementRef;
  @ViewChild("passwordElement") passwordElement: ElementRef;
  @ViewChild("cpasswordElement") cpasswordElement: ElementRef;
  @ViewChild("dateOfBirthElement") dateObBirthElement: ElementRef;
  @ViewChild("contactNumberElement") contactNumberElement: ElementRef;
  @ViewChild("addressElement") addressElement: ElementRef;
  @ViewChild("otpElement") otpElement: ElementRef;
  @ViewChild("termsElement") termsElement: ElementRef;

  @Output() customerLogged = new EventEmitter();


  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    if (ExInfo.loggedIn) {
      this.router.navigate(['dashboard'])
    }
  }

  nameCheck(e): boolean {
    let v = e.lastChild.value
    if (!v) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - This field is required!";
      return false
    }
    else if (v.length > 25) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Maximum 25 characters is allowed!";
      return false
    }
    else {
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
    }
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

  cpasswordCheck(e): boolean {
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
    else if (this.password != this.cpassword) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Password donot match!";
      return false;
    }
    else {
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
    }
  }

  dateOfBirthCheck(e): boolean {
    let v = e.lastChild.value
    console.log()
    if (!v) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - This field is required!";
      return false;
    }

    else if (((new Date()).getTime()) < (new Date(this.dateOfBirth).getTime())) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Enter correct date!";
      return false;
    }
    else {
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
    }
  }

  phoneCheck(e): boolean {
    let v = e.lastChild.value
    if (!v) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - This field is required!";
      return false;
    }
    else if (!(/^\d/.test(v))) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Enter proper number!";
      return false;
    }
    else if (v.length!=10) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Enter 10 digits!";
      return false;
    }
    else {
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
    }
  }

  addressCheck(e): boolean {
    let v = e.lastChild.value
    if (!v) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - This field is required!";
      return false
    }
    else if (v.length < 10) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Minimum 10 characters is required!";
      return false
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
    else {
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
    }
  }

  termsCheck(e): boolean {
    if (!e.lastChild.firstChild.checked) {
      e.firstChild.textContent = "Please tick the check box!";
      return false;
    }
    else {
      e.firstChild.textContent = "";
      return true;
    }
  }

  showError(element, message) {
    element.lastChild.classList.add('input-alert')
    element.children[1].textContent = message;
  }

  onSubmit(element) {
    if (this.otpSent) {
      this.buttonName = "Please Wait..."
      if (this.fullName &&
        this.email &&
        this.password &&
        this.cpassword &&
        this.dateOfBirth &&
        this.contactNumber &&
        this.address &&
        this.otp &&
        this.terms) {
        this.customer = new Customer(this.fullName, this.email, this.password, this.dateOfBirth, this.contactNumber, this.address);
        this.customerService.registerNewCustomer(this.customer, this.otp).subscribe(
          res => {
            if (res.Response == "ALREADY REGISTERED") {
              this.showError(this.emailElement.nativeElement, " - Email ID Already Registered!");
              this.buttonName = "Register"
            }
            else if (res.Response == "OK") {
              this.router.navigate(['login'])
            }
            else if(res.Response == "INCORRECT"){
              this.termsElement.nativeElement.firstChild.textContent = "Incorrect OTP!";
              this.buttonName = "Register"
            }
            else {
              this.termsElement.nativeElement.firstChild.textContent = "Internal Server Error!";
              this.buttonName = "Register"
            }
          }
        );
      }
      else {
        this.nameCheck(this.nameElement.nativeElement)
        this.emailCheck(this.emailElement.nativeElement)
        this.passwordCheck(this.passwordElement.nativeElement)
        this.cpasswordCheck(this.cpasswordElement.nativeElement)
        this.dateOfBirthCheck(this.dateObBirthElement.nativeElement)
        this.phoneCheck(this.contactNumberElement.nativeElement)
        this.addressCheck(this.addressElement.nativeElement)
        this.otpCheck(this.otpElement.nativeElement)
        this.termsCheck(this.termsElement.nativeElement)
        this.buttonName = "Register"
      }
    }
    else{
      alert("Enter Email Again!")
    }
  }

  login() {
    this.router.navigate(['login'])
  }

   tnc(){
     this.router.navigate(['terms-conditions'])
  }
  sendOtp() {
    if(this.emailCheck(this.emailElement.nativeElement)){
      this.customerService.sendOtp(this.email).subscribe(res => {
        if (res.Response == "FAILED") {
          alert("Enter Email Again!")
          this.otpSent = false;
        }
        else if (res.Response == "OK") {
          this.otpSent = true;
        }
      })
    }
    
  }



}
